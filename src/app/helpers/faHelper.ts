import FaModel from 'app/models/FaModel';

class FaHelper {
  static sortStates(set: Set<string>): Set<string> {
    return new Set<string>(Array.from(set).sort());
  }

  static constructStates(states: Set<string>): String {
    return Array.from(FaHelper.sortStates(states)).join(',');
  }

  static findNextStateFromSingleState(state: String, fa: FaModel): Set<string> {
    let states: string[] = [];

    for (let key in fa.transitions!) {
      let transitions = fa.transitions[key];
      for (let nextStates in transitions!) {
        states.push(...nextStates.split(','));
      }
    }

    return new Set<string>(states);
  }

  static findNextStates(states: Set<string>, fa: FaModel): Set<string> {
    let nextStates = new Set<string>();
    for (let state in states) {
      let _next = FaHelper.findNextStateFromSingleState(state, fa);
      _next.forEach(nextStates.add, nextStates);
    }
    return nextStates;
  }
}

export default FaHelper;
