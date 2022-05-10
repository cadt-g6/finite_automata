import FaModel from '../../../models/FaModel';
import db, { FirestoreDataConverter } from 'firebase/firestore';

export const faModelConverter: FirestoreDataConverter<FaModel> = {
  toFirestore(faModel: FaModel): db.DocumentData {
    return {
      states: faModel.states,
      symbols: faModel.symbols,
      startState: faModel.startState,
      endStates: faModel.endStates,
      transitions: faModel.transitions,
    };
  },
  fromFirestore(
    snapshot: db.QueryDocumentSnapshot,
    options: db.SnapshotOptions,
  ): FaModel {
    const data = snapshot.data(options);
    let faModel = new FaModel(
      data.states,
      data.symbols,
      data.startState,
      data.endStates,
      data.transitions,
    );
    faModel.title = data.title;
    return faModel;
  },
};
