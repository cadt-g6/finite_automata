import FirebaseConfig from './FirebaseConfig';
import * as db from 'firebase/firestore';
import ListModel from 'app/models/ListModel';
import BaseModel from 'app/models/BaseModel';

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
    orderBys?: Array<string | db.FieldPath>,
    queries?: db.QueryConstraint[],
  ): Promise<ListModel<T>> {
    const queryOptions = this.constructQueryOptions(
      nextPageKey,
      orderBys,
      queries,
    );

    const reference = this.collectionReference();
    const result = await db.getDocs(db.query(reference, ...queryOptions));

    let items = new Array<T>();
    for (const document of result.docs) {
      let element = document.data();
      items.push(element);
    }

    if (items.length > 0) {
      nextPageKey = items[items.length - 1].createdAt;
    } else {
      nextPageKey = undefined;
    }

    return new ListModel(items, nextPageKey);
  }

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
    orderBys?: Array<string | db.FieldPath>,
    queries?: db.QueryConstraint[],
  ): db.QueryConstraint[] {
    const queryOptions = new Array<db.QueryConstraint>(db.limit(this.pageSize));

    queryOptions.push(db.limit(this.pageSize));
    queryOptions.push(db.orderBy('created_at'));

    if (orderBys) {
      for (const orderBy of orderBys) {
        queryOptions.push(db.orderBy(orderBy));
      }
    }

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
