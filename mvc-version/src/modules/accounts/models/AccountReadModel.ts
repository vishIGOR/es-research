import { ApiProperty } from "@nestjs/swagger";
import { Account } from "../../databases/mongodb/schemas/AccountSchema";

export class AccountReadModel {
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

	static fromAccountSchema(account: Account): AccountReadModel {
		const newModel = new this();
		newModel.id = account._id.toString();
		newModel.ownerId = account.ownerId;
		newModel.balance = account.balance;
		newModel.isBlocked = account.isBlocked;
		newModel.createdAt = account.createdAt;
		return newModel;
	}
}