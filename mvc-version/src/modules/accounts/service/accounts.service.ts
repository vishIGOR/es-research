import { AccountsServiceInterface } from "./accounts.service.interface";
import { AccountCreateModel } from "../models/AccountCreateModel";
import { AccountReadModel } from "../models/AccountReadModel";
import { OperationsHistoryModel } from "../../operations/models/OperationsHistoryModel";
import { Inject } from "@nestjs/common";
import { AccountsRepositoryInterface } from "../accounts.repository.interface";
import { OperationsRepositoryInterface } from "../../operations/operations.repository.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Account, AccountDocument } from "../../databases/mongodb/schemas/AccountSchema";
import { AccountIsBlocked, AccountNotFoundError } from "../../../errors/errors";

export class AccountsService implements AccountsServiceInterface {
	constructor(
		@Inject(AccountsRepositoryInterface) private readonly accountsRepository: AccountsRepositoryInterface,
		@Inject(OperationsRepositoryInterface) private readonly operationsRepository: OperationsRepositoryInterface,
		@InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>) {

	}

	async create(accountCreateModel: AccountCreateModel): Promise<AccountReadModel> {
		const account = new this.accountModel({
			ownerId: accountCreateModel.ownerId
		});

		await this.accountsRepository.create(account);

		return AccountReadModel.fromAccountSchema(account);
	}

	async get(id: string): Promise<AccountReadModel> {
		const account = await this.accountsRepository.getById(id);
		if (!account)
			throw new AccountNotFoundError();

		return AccountReadModel.fromAccountSchema(account);
	}

	async getList(ownerId?: string): Promise<AccountReadModel[]> {
		const accounts = await this.accountsRepository.getList(ownerId);

		const accountReadModels = [];
		for (const account of accounts) {
			accountReadModels.push(AccountReadModel.fromAccountSchema(account));
		}

		return accountReadModels;
	}

	async topUp(amountOfMoney: number, id: string, callerId: string): Promise<void> {
		const account = await this.accountsRepository.getById(id);
		if (!account)
			throw new AccountNotFoundError();
		this.throwErrorIfAccountBlocked(account);
	}

	async transfer(amountOfMoney: number, id: string, receiverId: string, callerId: string): Promise<void> {
		const payee = await this.accountsRepository.getById(id);
		if (!payee)
			throw new AccountNotFoundError();
		this.throwErrorIfAccountBlocked(payee);

		const receiver = await this.accountsRepository.getById(receiverId);
		if (!receiver)
			throw new AccountNotFoundError();
		this.throwErrorIfAccountBlocked(receiver);


	}

	async withdraw(amountOfMoney: number, id: string, callerId: string): Promise<void> {
		const account = await this.accountsRepository.getById(id);
		if (!account)
			throw new AccountNotFoundError();
		this.throwErrorIfAccountBlocked(account);
	}

	async block(id: string): Promise<void> {
		await this.throwErrorIfAccountDoesNotExists(id);

		await this.accountsRepository.block(id);
	}

	async unblock(id: string): Promise<void> {
		await this.throwErrorIfAccountDoesNotExists(id);

		await this.accountsRepository.unblock(id);
	}

	async getHistory(id): Promise<OperationsHistoryModel> {
		return Promise.resolve(undefined);
	}

	private async throwErrorIfAccountDoesNotExists(id: string) {
		const account = await this.accountsRepository.getById(id);
		if (!account)
			throw new AccountNotFoundError();
	}

	private throwErrorIfAccountBlocked(account: Account) {
		if (account.isBlocked)
			throw new AccountIsBlocked();
	}
}