import FaModel from 'app/models/FaModel';

class FaHelper {
  static sortStates(set: Set<string>): Set<string> {
    return new Set<string>(Array.from(set).sort());
  }

  static removeWhereSet(items: Set<string>, condition): Set<string> {
    return new Set<string>(FaHelper.removeWhere(Array.from(items), condition));
  }

  static removeWhere(items: string[], condition): string[] {
    return items.filter(e => condition(e));
  }

  static constructStates(states: Set<string>): string {
    return Array.from(FaHelper.sortStates(states)).join(',');
  }

  static findNextStateFromSingleState(state: string, fa: FaModel): Set<string> {
    let states: string[] = [];

    let transitions = fa.transitions![state]!;
    for (let symbol in transitions!) {
      let nextStates = transitions![symbol];
      states.push(...nextStates);
    }

    return new Set<string>(states);
  }

  static findNextStates(states: Set<string>, fa: FaModel): Set<string> {
    let nextStates = new Set<string>();

    for (const state of Array.from(states)) {
      let _next = FaHelper.findNextStateFromSingleState(state, fa);
      for (const states of Array.from(_next)) {
        nextStates.add(states);
      }
    }

    return nextStates;
  }
}

export default FaHelper;
