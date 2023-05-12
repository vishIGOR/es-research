import { IsOptional, IsString } from "class-validator";

export class OwnerIdReadModel {
	@IsOptional()
	@IsString()
	ownerId?: string;
}