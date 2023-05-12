import { ApiProperty } from "@nestjs/swagger";
import { Entity } from "../../../entities/Entity";

export class UserReadModel extends Entity{
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}