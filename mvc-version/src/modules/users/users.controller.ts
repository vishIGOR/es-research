import {Body, Controller, Get, Inject, Logger, Post} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserReadModel} from "./models/UserReadModel";
import {UsersServiceInterface} from "./users.service.interface";
import {UserCreateModel} from "./models/UserCreateModel";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(@Inject(UsersServiceInterface) private readonly usersService: UsersServiceInterface) {
  }
  private readonly logger = new Logger(UsersController.name);

  @Post("/")
  @ApiOperation({
    summary: "Create new user"
  })
  @ApiResponse({
    status: 201,
    description: "success",
    type: UserReadModel
  })
  async create(@Body() userCreateModel: UserCreateModel): Promise<UserReadModel> {
    return this.usersService.create(UserCreateModel.name);
  }

  @Get("/")
  @ApiOperation({
    summary: "Get list of users"
  })
  @ApiResponse({
    status: 200,
    description: "success",
    type: [UserReadModel]
  })
  async getList(@Body() userCreateModel: UserCreateModel): Promise<UserReadModel[]> {
    return this.usersService.getList();
  }
}