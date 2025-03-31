import { BaseModel } from './base.model';
import { Group } from './group.model';
import { Permission } from './permission.model';

export class User extends BaseModel {
  date_joined: string;
  email: string;
  first_name: string;
  groups: Group[];
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  last_name: string;
  user_permissions: Permission[];
  username: string;

  constructor(data: any) {
    super(data);
    this.created_at = data.created_at;
    this.date_joined = data.date_joined;
    this.email = data.email;
    this.first_name = data.first_name;
    this.groups = data.groups;
    this.is_active = data.is_active;
    this.is_staff = data.is_staff;
    this.is_superuser = data.is_superuser;
    this.last_login = data.last_login;
    this.last_name = data.last_name;
    this.updated_at = data.updated_at;
    this.user_permissions = data.user_permissions;
    this.username = data.username;
  }
}
