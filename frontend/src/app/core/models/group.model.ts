import { BaseModel } from './base.model';
import { Permission } from './permission.model';

export class Group extends BaseModel {
  permissions: Permission[];

  constructor(data: any) {
    super(data);
    this.permissions = data.permissions;
  }
}
