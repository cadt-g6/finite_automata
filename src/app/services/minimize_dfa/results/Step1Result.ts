import FaModel from 'app/models/FaModel';

class Step1Result {
  removedStates: string[];
  accessibleStates: string[];
  newFA: FaModel;

  constructor(
    removedStates: string[],
    accessibleStates: string[],
    newFA: FaModel,
  ) {
    this.removedStates = removedStates;
    this.accessibleStates = accessibleStates;
    this.newFA = newFA;
  }
}

export default Step1Result;
