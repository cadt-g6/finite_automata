class FaViewHelper {
  static constructStates(title: string, states: Array<string>): string {
    return title + ': {' + states.join(',') + '}';
  }
}
export default FaViewHelper;
