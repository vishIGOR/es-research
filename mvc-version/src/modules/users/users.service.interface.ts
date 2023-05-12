import { UserReadModel } from "./models/UserReadModel";

export interface UsersServiceInterface {
  create(name: string): Promise<UserReadModel>;

  getList(): Promise<UserReadModel[]>
}

export const UsersServiceInterface = Symbol("UsersServiceInterface");