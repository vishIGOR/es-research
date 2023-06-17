import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MoneyOperationWriteDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	@IsPositive()
	amountOfMoney: number;
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	userId: string;
}