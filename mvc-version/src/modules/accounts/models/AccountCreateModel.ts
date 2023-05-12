import {ApiProperty} from "@nestjs/swagger";

export class AccountCreateModel {
    @ApiProperty()
    ownerId: string
}