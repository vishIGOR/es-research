import { Body, Controller, Get, Inject, Logger, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccountCreateModel } from "./models/AccountCreateModel";
import { AccountReadModel } from "./models/AccountReadModel";
import { ObjectIdValidationPipe } from "../../utils/database.pipes";
import { OperationReadModel } from "../operations/models/OperationReadModel";
import { MoneyOperationModel } from "./models/MoneyOperationModel";
import { Connection } from "mongoose";
import { AccountsServiceTransactionsDecorator } from "./service/accounts.service.transactions.decorator";
import { InjectConnection } from "@nestjs/mongoose";
import { AccountsServiceInterface } from "./service/accounts.service.interface";
import { OwnerIdReadModel } from "./models/OwnerIdReadModel";


@Controller("accounts")
@ApiTags("Accounts")
export class AccountsController {
	private readonly logger = new Logger(AccountsController.name);
	private readonly accountsService: AccountsServiceInterface;

	constructor(
		@InjectConnection() private readonly mongoConnection: Connection,
		@Inject(AccountsServiceInterface) accountsService: AccountsServiceInterface
	) {
		this.accountsService = new AccountsServiceTransactionsDecorator(accountsService, this.mongoConnection);
	}

	@Post("/")
	@ApiOperation({
		summary: "Create new bank account"
	})
	@ApiResponse({
		status: 201,
		description: "success",
		type: AccountReadModel
	})
	async create(@Body() accountCreateModel: AccountCreateModel): Promise<AccountReadModel> {
		return this.accountsService.create(accountCreateModel);
	}

	@Get("/")
	@ApiOperation({
		summary: "Get list of accounts"
	})
	@ApiResponse({
		status: 200,
		description: "success",
		type: [AccountReadModel]
	})
	@ApiQuery({ name: "ownerId", required: false })
	async getList(@Query() ownerIdReadModel?: OwnerIdReadModel) {
		return this.accountsService.getList(ownerIdReadModel.ownerId);
	}

	@Get("/:id")
	@ApiOperation({
		summary: "Get account info"
	})
	@ApiResponse({
		status: 200,
		description: "success",
		type: AccountReadModel
	})
	async get(@Param("id", ObjectIdValidationPipe) id: string) {
		return this.accountsService.get(id);
	}

	@Post("/:id/block")
	@ApiOperation({
		summary: "Block account"
	})
	@ApiResponse({
		status: 200,
		description: "success"
	})
	async block(@Param("id", ObjectIdValidationPipe) id: string) {
		await this.accountsService.block(id);
	}

	@Post("/:id/unblock")
	@ApiOperation({
		summary: "Unblock account"
	})
	@ApiResponse({
		status: 200,
		description: "success"
	})
	async unblock(@Param("id", ObjectIdValidationPipe) id: string) {
		await this.accountsService.unblock(id);
	}

	@Get("/:id/history")
	@ApiOperation({
		summary: "Get history of operations"
	})
	@ApiResponse({
		status: 200,
		description: "success",
		type: [OperationReadModel]
	})
	async getOperationsHistory(@Param("id") id: string) {
		await this.accountsService.getHistory(id);
	}

	@Post("/:id/topUp")
	@ApiOperation({
		summary: "Top up balance"
	})
	@ApiResponse({
		status: 200,
		description: "success"
	})
	async topUp(@Param("id", ObjectIdValidationPipe) id: string, @Body() moneyOperationModel: MoneyOperationModel) {
		return this.accountsService.topUp(moneyOperationModel.amountOfMoney, id, moneyOperationModel.userId);
	}

	@Post("/:id/transfer/:receiverId")
	@ApiOperation({
		summary: "Transfer money from one account to another"
	})
	@ApiResponse({
		status: 200,
		description: "success"
	})
	async transfer(@Param("id", ObjectIdValidationPipe) id: string, @Param("receiverId") receiverId: string, @Body() moneyOperationModel: MoneyOperationModel) {
		return this.accountsService.transfer(moneyOperationModel.amountOfMoney, id, receiverId, moneyOperationModel.userId);
	}

	@Post("/:id/withdraw")
	@ApiOperation({
		summary: "Withdraw money"
	})
	@ApiResponse({
		status: 200,
		description: "success"
	})
	async withdraw(@Param("id", ObjectIdValidationPipe) id: string, @Body() moneyOperationModel: MoneyOperationModel) {
		return this.accountsService.withdraw(moneyOperationModel.amountOfMoney, id, moneyOperationModel.userId);
	}
}
