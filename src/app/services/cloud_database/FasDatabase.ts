import FaModel from 'app/models/FaModel';
import ListModel from 'app/models/ListModel';
import * as db from 'firebase/firestore';
import BaseDatabase from './BaseDatabase';
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
    orderBy?: string | db.FieldPath,
  ): Promise<ListModel<FaModel>> {
    const queryOptions = new Array<db.QueryConstraint>();

    // https://stackoverflow.com/a/63460539/13989964
    if (titleStartWith) {
      queryOptions.push(db.where('title', '>=', titleStartWith));
      queryOptions.push(db.where('title', '<=', titleStartWith + '\uf8ff'));
    }

    return super.fetchAll(nextPageKey, orderBy, queryOptions);
  }
}

export default FaDatabase;
