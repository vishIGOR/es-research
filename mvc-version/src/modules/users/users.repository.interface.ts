import { User } from "../databases/mongodb/schemas/UsersSchema";

export interface UsersRepositoryInterface {
  create(name: string): Promise<User>;

  getById(id: string): Promise<User>;

  getByName(name: string): Promise<User>;

  getList(): Promise<User[]>;
}

export const UsersRepositoryInterface = Symbol("UsersRepositoryInterface");