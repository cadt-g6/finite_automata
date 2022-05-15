import FirebaseConfig from './FirebaseConfig';
import * as db from 'firebase/firestore';
import ListModel from 'app/models/ListModel';
import BaseModel from 'app/models/BaseModel';

export declare type OrderByFields = 'title' | 'created_at' | 'updated_at';

abstract class BaseDatabase<T extends BaseModel> {
  static instance: db.Firestore;
  pageSize: number = 5;

  constructor() {
    BaseDatabase.instance ??= db.getFirestore(FirebaseConfig.instance);
  }

  abstract collectionName(): string;
  abstract objectConverter(): db.FirestoreDataConverter<T>;

  // Load more:
  // - Use nextPageKey to load more
  // - If nextPageKey is null => not more page to load
  async fetchAll(
    nextPageKey?: string,
    queries?: db.QueryConstraint[],
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): Promise<ListModel<T>> {
    const queryOptions = this.constructQueryOptions(
      nextPageKey,
      queries,
      orderBy,
      orderByDirection,
    );

    const reference = this.collectionReference();
    const result = await db.getDocs(db.query(reference, ...queryOptions));

    let items = new Array<T>();
    for (const document of result.docs) {
      let element = document.data();
      items.push(element);
    }

    if (items.length >= this.pageSize) {
      nextPageKey = this.buildNextPageKey(items[items.length - 1], orderBy);
    } else {
      nextPageKey = undefined;
    }

    return new ListModel(items, nextPageKey);
  }

  abstract buildNextPageKey(
    lastItem: T,
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): string;

  async fetchOne(id: string): Promise<T | undefined> {
    const result = await db.getDoc(this.documentReference(id));
    return result.data();
  }

  async create(data: T): Promise<T | undefined> {
    const reference = this.collectionReference();
    const result = await db.addDoc(reference, data);
    return this.fetchOne(result.id);
  }

  async update(id: string, data: T): Promise<T | undefined> {
    const reference = this.documentReference(id);
    await db.setDoc(reference, data);
    return this.fetchOne(id);
  }

  async delete(id: string): Promise<void> {
    const reference = this.documentReference(id);
    return await db.deleteDoc(reference);
  }

  documentPath(documentId: string): string {
    return this.collectionName() + '/' + documentId;
  }

  documentReference(documentId: string): db.DocumentReference<T> {
    const reference = db
      .doc(BaseDatabase.instance, this.documentPath(documentId))
      .withConverter<T>(this.objectConverter());
    return reference;
  }

  collectionReference(): db.CollectionReference<T> {
    const reference = db
      .collection(BaseDatabase.instance, this.collectionName())
      .withConverter<T>(this.objectConverter());
    return reference;
  }

  constructQueryOptions(
    nextPageKey?: string,
    queries?: db.QueryConstraint[],
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): db.QueryConstraint[] {
    const queryOptions = new Array<db.QueryConstraint>();

    const fieldPath = orderBy || 'created_at';
    const directionStr = orderByDirection || 'asc';

    queryOptions.push(db.orderBy(fieldPath, directionStr));
    queryOptions.push(db.limit(this.pageSize));

    if (nextPageKey) {
      queryOptions.push(db.startAfter(nextPageKey));
    }

    if (queries) {
      for (const query of queries) {
        queryOptions.push(query);
      }
    }

    return queryOptions;
  }
}

export default BaseDatabase;
