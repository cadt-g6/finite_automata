abstract class BaseModel {
  id?: string;
  createdAt: string;
  updatedAt: string;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    let now = new Date().toUTCString();
    this.createdAt = createdAt ? createdAt.toUTCString() : now;
    this.updatedAt = updatedAt ? updatedAt.toUTCString() : now;
  }
}

export default BaseModel;
