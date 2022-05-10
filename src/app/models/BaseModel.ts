abstract class BaseModel {
  createdAt: string;
  updatedAt: string;

  constructor(createdAt?: Date, updatedAt?: Date) {
    let now = new Date().toUTCString();
    this.createdAt = createdAt ? createdAt.toUTCString() : now;
    this.updatedAt = updatedAt ? updatedAt.toUTCString() : now;
  }
}

export default BaseModel;
