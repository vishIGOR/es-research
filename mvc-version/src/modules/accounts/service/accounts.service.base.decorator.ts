import { AccountsServiceInterface } from "./accounts.service.interface";
import { AccountCreateModel } from "../models/AccountCreateModel";
import { AccountReadModel } from "../models/AccountReadModel";
import { OperationsHistoryModel } from "../../operations/models/OperationsHistoryModel";

export abstract class AccountsServiceBaseDecorator implements AccountsServiceInterface {
	protected readonly wrapped: AccountsServiceInterface;

	protected constructor(accountsService: AccountsServiceInterface) {
		this.wrapped = accountsService;
	}

	async create(accountCreateModel: AccountCreateModel): Promise<AccountReadModel> {
		return this.wrapped.create(accountCreateModel);
	}

	async get(accountId: string): Promise<AccountReadModel> {
		return this.wrapped.get(accountId);
	}

	async getHistory(accountId): Promise<OperationsHistoryModel> {
		return this.wrapped.getHistory(accountId);
	}

	async getList(ownerId?: string): Promise<AccountReadModel[]> {
		return this.wrapped.getList(ownerId);
	}

	async topUp(amountOfMoney: number, id: string, callerId: string): Promise<void> {
		return this.wrapped.topUp(amountOfMoney, id, callerId);
	}

	async transfer(amountOfMoney: number, id: string, receiverId: string, callerId: string): Promise<void> {
		return this.wrapped.transfer(amountOfMoney, id, receiverId, callerId);
	}

	async withdraw(amountOfMoney: number, id: string, callerId: string): Promise<void> {
		return this.wrapped.withdraw(amountOfMoney, id, callerId);
	}

	async block(id: string): Promise<void> {
		return this.wrapped.block(id);
	}

	async unblock(id: string): Promise<void> {
		return this.wrapped.unblock(id);
	}
}