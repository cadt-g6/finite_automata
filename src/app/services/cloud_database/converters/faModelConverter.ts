import FaModel from '../../../models/FaModel';
import db, { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export const faModelConverter: FirestoreDataConverter<FaModel> = {
  toFirestore(faModel: FaModel): db.DocumentData {
    return {
      states: faModel.states,
      symbols: faModel.symbols,
      startState: faModel.startState,
      finalStates: faModel.endStates,
      transitions: faModel.transitions,
      created_at: faModel.createdAt,
      updated_at: faModel.updatedAt,
      title: faModel.title,
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
      data.start_state,
      data.final_states,
      data.transitions,
      undefined,
      undefined,
      data.title,
    );

    faModel.createdAt = data.created_at;
    faModel.updatedAt = data.updated_at;
    faModel.title = data.title;

    return faModel;
  },
};
