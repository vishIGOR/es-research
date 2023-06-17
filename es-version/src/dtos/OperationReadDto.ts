import { ApiProperty } from "@nestjs/swagger";

export class OperationReadDto {
	@ApiProperty()
	id: string;
	@ApiProperty()
	type: string;
	@ApiProperty()
	date: Date;
	@ApiProperty()
	status: string;
	@ApiProperty()
	callerId: string;
	@ApiProperty()
	payload: object;
}