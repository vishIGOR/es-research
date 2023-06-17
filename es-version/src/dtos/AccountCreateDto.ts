import {ApiProperty} from "@nestjs/swagger";

export class AccountCreateDto {
    @ApiProperty()
    ownerId: string
}