import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersServiceInterface} from "./users.service.interface";
import {UsersService} from "./users.service";
import {UsersRepositoryInterface} from "./users.repository.interface";
import {UsersMongodbRepository} from "./users.mongodb.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../databases/mongodb/schemas/UsersSchema";

@Module({
  providers: [
    {
      provide: UsersServiceInterface,
      useClass: UsersService
    },
    {
      provide: UsersRepositoryInterface,
      useClass: UsersMongodbRepository
    }
  ],
  controllers: [UsersController],
  exports: [
    {
      provide: UsersRepositoryInterface,
      useClass: UsersMongodbRepository
    }
  ],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ]
})
export class UsersModule {
}