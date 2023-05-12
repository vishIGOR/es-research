import { Account } from "../databases/mongodb/schemas/AccountSchema";

export interface AccountsRepositoryInterface {
	getById(id: string): Promise<Account>;

	getList(ownerId?: string): Promise<Account[]>;

	create(account: Account): Promise<Account>;

	block(id: string): Promise<void>;

	unblock(id: string): Promise<void>;

	update(account: Account): Promise<void>;
}

export const AccountsRepositoryInterface = Symbol("AccountsRepositoryInterface");