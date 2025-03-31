export class BaseModel {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  constructor(data: BaseModel) {
    this.id = data.id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.deleted_at = data.deleted_at;
  }
}
