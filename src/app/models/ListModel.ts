class ListModel<T> {
  items: T[];
  nextPageKey?: string;
  constructor(items: T[], nextPageKey?: string) {
    this.items = items;
    this.nextPageKey = nextPageKey;
  }
}

export default ListModel;
