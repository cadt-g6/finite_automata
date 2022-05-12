import BaseModel from 'app/models/BaseModel';

abstract class BaseCacheService<T extends BaseModel> {
  abstract jsonDecode(json: string): T;
  abstract jsonEncode(item: T): string;

  get(id: string): T | undefined {
    let result = localStorage.getItem(id);
    if (result) {
      return this.jsonDecode(result);
    }
  }

  set(item: T): T | undefined {
    localStorage.setItem(item.id ?? item.createdAt, this.jsonEncode(item));
    return this.get(item.id ?? item.createdAt);
  }

  setAll(datas: T[]) {
    for (const item of datas) {
      this.set(item);
    }
  }
}

export default BaseCacheService;
