import { AccountsRepositoryInterface } from "./accounts.repository.interface";
import { Account, AccountDocument } from "../databases/mongodb/schemas/AccountSchema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class AccountsMongodbRepository implements AccountsRepositoryInterface {
	constructor(@InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>) {
	}

	async block(id: string): Promise<void> {
		await this.accountModel.findByIdAndUpdate(id, { isBlocked: true });
	}

	async create(account: Account): Promise<Account> {
		return await this.accountModel.create(account);
	}

	async getById(id: string): Promise<Account> {
		return this.accountModel.findById(id);
	}

	async getList(ownerId?: string): Promise<Account[]> {
		if (ownerId) {
			return this.accountModel.find({ ownerId });
		}
		return this.accountModel.find();
	}

	async unblock(id: string): Promise<void> {
		await this.accountModel.findByIdAndUpdate(id, { isBlocked: false });
	}

	async update(account: Account): Promise<void> {
		await this.accountModel.findByIdAndUpdate(account._id, account);
	}

}