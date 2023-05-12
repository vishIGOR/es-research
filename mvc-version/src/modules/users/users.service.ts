import { UsersServiceInterface } from "./users.service.interface";
import { UserReadModel } from "./models/UserReadModel";
import { UsersRepositoryInterface } from "./users.repository.interface";
import { Inject } from "@nestjs/common";
import { UserAlreadyExists } from "../../errors/errors";

export class UsersService implements UsersServiceInterface {
  constructor(@Inject(UsersRepositoryInterface) private readonly usersRepository: UsersRepositoryInterface) {
  }

  async create(name: string): Promise<UserReadModel> {
    if (await this.usersRepository.getByName(name))
      throw new UserAlreadyExists();

    const user = await this.usersRepository.create(name);

    return UserReadModel.fromObject(user) as UserReadModel;
  }

  async getList(): Promise<UserReadModel[]> {
    const users = [];
    for (const user of (await this.usersRepository.getList())) {
      users.push(UserReadModel.fromObject(user));
    }
    return users;
  }

}