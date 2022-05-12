import FaModel from 'app/models/FaModel';
import BaseCacheService from './BaseCacheService';

class FaCacheService extends BaseCacheService<FaModel> {
  jsonDecode(json: string): FaModel {
    let result = JSON.parse(json);

    let faModel = new FaModel(
      result.states,
      result.symbols,
      result.start_state,
      result.final_states,
      result.transitions,
      undefined,
      undefined,
      result.title,
      result.id,
    );

    faModel.createdAt = result.created_at;
    faModel.updatedAt = result.updated_at;
    faModel.title = result.title;

    return faModel;
  }

  jsonEncode(item: FaModel): string {
    return JSON.stringify({
      id: item.id,
      states: item.states,
      symbols: item.symbols,
      start_state: item.startState,
      final_states: item.endStates,
      transitions: item.transitions,
      created_at: item.createdAt,
      updated_at: item.updatedAt,
      title: item.title,
    });
  }
}

export default FaCacheService;
