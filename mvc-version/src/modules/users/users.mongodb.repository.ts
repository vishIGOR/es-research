import { UsersRepositoryInterface } from "./users.repository.interface";
import { Model } from "mongoose";
import { User, UserDocument } from "../databases/mongodb/schemas/UsersSchema";
import { InjectModel } from "@nestjs/mongoose";

export class UsersMongodbRepository implements UsersRepositoryInterface {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }

  async create(name: string): Promise<User> {
    const userModel = new this.userModel({
      name: name
    });

    return await this.userModel.create(userModel);
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async getList(): Promise<User[]> {
    return this.userModel.find();
  }

  getByName(name: string): Promise<User> {
    return this.userModel.findOne({ name });
  }
}