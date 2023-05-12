import { Connection } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";
import { AccountsServiceBaseDecorator } from "./accounts.service.base.decorator";
import { AccountsServiceInterface } from "./accounts.service.interface";
import { AccountCreateModel } from "../models/AccountCreateModel";
import { AccountReadModel } from "../models/AccountReadModel";

export class AccountsServiceTransactionsDecorator extends AccountsServiceBaseDecorator {
	public constructor(
		accountsService: AccountsServiceInterface,
		@InjectConnection() private readonly mongoConnection: Connection) {
		super(accountsService);
	}

	async create(accountCreateModel: AccountCreateModel): Promise<AccountReadModel> {
		let result;
		await this.mongoConnection.startSession()
			.then(async (clientSession) => {
				await clientSession.withTransaction(async () => {
					result = await this.wrapped.create(accountCreateModel);
				});
				await clientSession.endSession();
			});

		return result;
	}

	async topUp(amountOfMoney: number, id: string, callerId: string): Promise<void> {
		await this.mongoConnection.startSession()
			.then(async (clientSession) => {
				await clientSession.withTransaction(async () => {
					await this.wrapped.topUp(amountOfMoney, id, callerId);
				});
				await clientSession.endSession();
			});
	}

	async transfer(amountOfMoney: number, id: string, receiverId: string, callerId: string): Promise<void> {
		await this.mongoConnection.startSession()
			.then(async (clientSession) => {
				await clientSession.withTransaction(async () => {
					await this.wrapped.transfer(amountOfMoney, id, receiverId, callerId);
				});
				await clientSession.endSession();
			});
	}

	async withdraw(amountOfMoney: number, id: string, callerId: string): Promise<void> {
		await this.mongoConnection.startSession()
			.then(async (clientSession) => {
				await clientSession.withTransaction(async () => {
					await this.wrapped.withdraw(amountOfMoney, id, callerId);
				});
				await clientSession.endSession();
			});
	}
}