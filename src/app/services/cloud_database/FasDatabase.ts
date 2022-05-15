import FaModel from 'app/models/FaModel';
import ListModel from 'app/models/ListModel';
import * as db from 'firebase/firestore';
import BaseDatabase, { OrderByFields } from './BaseDatabase';
import { faModelConverter } from './converters/faModelConverter';

class FaDatabase extends BaseDatabase<FaModel> {
  collectionName(): string {
    return 'fas';
  }

  objectConverter(): db.FirestoreDataConverter<FaModel> {
    return faModelConverter;
  }

  async fetchAllFa(
    nextPageKey?: string,
    titleStartWith?: string,
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): Promise<ListModel<FaModel>> {
    const queryOptions = new Array<db.QueryConstraint>();

    // https://stackoverflow.com/a/63460539/13989964
    if (titleStartWith) {
      queryOptions.push(db.where('title', '>=', titleStartWith));
      queryOptions.push(db.where('title', '<=', titleStartWith + '\uf8ff'));
    }

    return super.fetchAll(nextPageKey, queryOptions, orderBy, orderByDirection);
  }

  buildNextPageKey(
    lastItem: FaModel,
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): string {
    switch (orderBy) {
      case 'title':
        return lastItem.title!;
      case 'created_at':
      default:
        return lastItem.createdAt;
    }
  }
}

export default FaDatabase;
