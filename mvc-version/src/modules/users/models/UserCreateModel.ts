import { ApiProperty } from "@nestjs/swagger";

export class UserCreateModel {
  @ApiProperty()
  name: string;
}