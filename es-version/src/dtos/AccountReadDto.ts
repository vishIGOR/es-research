import { ApiProperty } from "@nestjs/swagger";

export class AccountReadDto {
	@ApiProperty()
	id: string;
	@ApiProperty()
	ownerId: string;
	@ApiProperty()
	balance: number;
	@ApiProperty()
	isBlocked: boolean;
	@ApiProperty()
	createdAt: Date;

}