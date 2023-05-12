import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Operation, OperationDocument } from "../databases/mongodb/schemas/OperationSchema";
import { Model, Types } from "mongoose";
import { OperationsRepositoryInterface } from "./operations.repository.interface";
import { OperationStatus } from "../../enums/OperationStatus";
import {
	TopUpOperationPayload,
	TransferOperationPayload,
	WithdrawOperationPayload
} from "../../entities/OperationPayloadType";
import { OperationType } from "../../enums/OperationType";

@Injectable()
export class OperationsMongodbRepository implements OperationsRepositoryInterface {
	constructor(@InjectModel(Operation.name) private readonly _operationModel: Model<OperationDocument>) {
	}

	async topUp(amountOfMoney: number, id: string, callerId: string, status: OperationStatus): Promise<void> {
		const payload = new TopUpOperationPayload(id, amountOfMoney);

		await this._operationModel.create(new this._operationModel({
			callerId: callerId,
			type: OperationType.topUp,
			status: status,
			targetAccountIds: [new Types.ObjectId(id)],
			payload: payload
		}));
	}

	async transfer(amountOfMoney: number, id: string, receiverId: string, callerId: string, status: OperationStatus): Promise<void> {
		const payload = new TransferOperationPayload(id, receiverId, amountOfMoney);

		await this._operationModel.create(new this._operationModel({
			callerId: callerId,
			type: OperationType.transfer,
			status: status,
			targetAccountIds: [new Types.ObjectId(id), new Types.ObjectId(receiverId)],
			payload: payload
		}));
	}

	async withdraw(amountOfMoney: number, id: string, callerId: string, status: OperationStatus): Promise<void> {
		const payload = new WithdrawOperationPayload(id, amountOfMoney);

		await this._operationModel.create(new this._operationModel({
			callerId: callerId,
			type: OperationType.withdraw,
			status: status,
			targetAccountIds: [new Types.ObjectId(id)],
			payload: payload
		}));
	}

	async getList(accountId: string): Promise<Operation[]> {
		return this._operationModel.find({ targetAccountIds: accountId });
	}

    async save(operation: Operation): Promise<void> {
	    await this._operationModel.create(operation);
    }

}