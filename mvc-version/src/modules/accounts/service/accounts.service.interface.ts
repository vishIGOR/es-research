import { AccountReadModel } from "../models/AccountReadModel";
import { AccountCreateModel } from "../models/AccountCreateModel";
import { OperationsHistoryModel } from "../../operations/models/OperationsHistoryModel";


export interface AccountsServiceInterface {
	get(id: string): Promise<AccountReadModel>;

	getList(ownerId?: string): Promise<AccountReadModel[]>;

	create(accountCreateModel: AccountCreateModel): Promise<AccountReadModel>;

	topUp(amountOfMoney: number, id: string, callerId: string): Promise<void>;

	withdraw(amountOfMoney: number, id: string, callerId: string): Promise<void>;

	transfer(amountOfMoney: number, id: string, receiverId: string, callerId: string): Promise<void>;

	getHistory(id): Promise<OperationsHistoryModel>;

	block(id: string): Promise<void>;

	unblock(id: string): Promise<void>;
}

export const AccountsServiceInterface = Symbol("AccountsServiceInterface");