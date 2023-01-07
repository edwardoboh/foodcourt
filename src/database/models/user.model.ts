import BaseModel from "./base.model";

export default class UserModel extends BaseModel {
    static tableName = 'users';

    first_name: string
    last_name?: string
    email: string
    password: string
}