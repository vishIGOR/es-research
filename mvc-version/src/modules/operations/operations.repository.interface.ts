import { Operation } from "../databases/mongodb/schemas/OperationSchema";

export interface OperationsRepositoryInterface {
	save(operation: Operation): Promise<void>;

	getList(accountId: string): Promise<Operation[]>;

}

export const OperationsRepositoryInterface = Symbol("OperationsRepositoryInterface");