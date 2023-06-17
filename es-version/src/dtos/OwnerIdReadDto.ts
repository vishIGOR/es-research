import { IsOptional, IsString } from "class-validator";

export class OwnerIdReadDto {
	@IsOptional()
	@IsString()
	ownerId?: string;
}