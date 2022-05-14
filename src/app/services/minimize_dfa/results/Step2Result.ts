class Step2Result {
  markedSets1stItr: string[];
  markedSets2ndItr: string[];
  mergedEqualStates: string[];

  constructor(
    markedSets1stItr: string[],
    markedSets2ndItr: string[],
    mergedEqualStates: string[],
  ) {
    this.markedSets1stItr = markedSets1stItr;
    this.markedSets2ndItr = markedSets2ndItr;
    this.mergedEqualStates = mergedEqualStates;
  }
}

export default Step2Result;
