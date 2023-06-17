import { Body, Controller, Get, Inject, Logger, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ObjectIdValidationPipe } from "../utils/database.pipes";
import { MoneyOperationWriteDto } from "../dtos/MoneyOperationWriteDto";
import { OwnerIdReadDto } from "../dtos/OwnerIdReadDto";
import { AccountReadDto } from "../dtos/AccountReadDto";
import { AccountCreateDto } from "../dtos/AccountCreateDto";
import { OperationReadDto } from "../dtos/OperationReadDto";


@Controller("accounts")
@ApiTags("Accounts")
export class AccountsController {
	private readonly logger = new Logger(AccountsController.name);

	@Post("/")
	@ApiOperation({
		summary: "Create new bank account"
	})
	@ApiResponse({
		status: 201,
		description: "success",
		type: AccountReadDto
	})
	async create(@Body() accountCreateDto: AccountCreateDto) {
	}

	@Get("/")
	@ApiOperation({
		summary: "Get list of accounts"
	})
	@ApiResponse({
		status: 200,
		description: "success",
		type: [AccountReadDto]
	})
	@ApiQuery({ name: "ownerId", required: false })
	async getList(@Query() ownerIdReadDto?: OwnerIdReadDto) {
	}

	@Get("/:id")
	@ApiOperation({
		summary: "Get account info"
	})
	@ApiResponse({
		status: 200,
		description: "success",
		type: AccountReadDto
	})
	async get(@Param("id", ObjectIdValidationPipe) id: string) {
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
	}

	@Get("/:id/history")
	@ApiOperation({
		summary: "Get history of operations"
	})
	@ApiResponse({
		status: 200,
		description: "success",
		type: [OperationReadDto]
	})
	async getOperationsHistory(@Param("id") id: string) {
	}

	@Post("/:id/topUp")
	@ApiOperation({
		summary: "Top up balance"
	})
	@ApiResponse({
		status: 200,
		description: "success"
	})
	async topUp(@Param("id", ObjectIdValidationPipe) id: string, @Body() moneyOperationDto: MoneyOperationWriteDto) {
	}

	@Post("/:id/transfer/:receiverId")
	@ApiOperation({
		summary: "Transfer money from one account to another"
	})
	@ApiResponse({
		status: 200,
		description: "success"
	})
	async transfer(@Param("id", ObjectIdValidationPipe) id: string, @Param("receiverId") receiverId: string, @Body() moneyOperationDto: MoneyOperationWriteDto) {
	}

	@Post("/:id/withdraw")
	@ApiOperation({
		summary: "Withdraw money"
	})
	@ApiResponse({
		status: 200,
		description: "success"
	})
	async withdraw(@Param("id", ObjectIdValidationPipe) id: string, @Body() moneyOperationDto: MoneyOperationWriteDto) {
	}
}
