import { BaseModel } from './base.model';

export class Permission extends BaseModel {
  codename: string;
  name: string;

  constructor(data: any) {
    super(data);
    this.codename = data.codename;
    this.name = data.name;
  }
}
