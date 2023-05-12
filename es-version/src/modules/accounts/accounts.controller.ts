import {Body, Controller, Get, Logger, Param, Post, Query} from "@nestjs/common";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AccountCreateModel} from "./models/AccountCreateModel";
import {AccountReadModel} from "./models/AccountReadModel";
import {PaginationParamsModel} from "../../models/PaginationParamsModel";
import {AccountsWithTotalCountReadModel} from "./models/AccountsWithTotalCountReadModel";
import {ObjectIdValidationPipe} from "../../utils/database.pipes";
import {OperationReadModel} from "../operations/models/OperationReadModel";


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
        type: AccountReadModel
    })
    async create(@Body() accountCreateModel: AccountCreateModel): Promise<AccountReadModel> {
        return null;
    }

    @Get("/")
    @ApiOperation({
        summary: "Get list of accounts"
    })
    @ApiResponse({
        status: 200,
        description: "success",
        type: [AccountsWithTotalCountReadModel]
    })
    @ApiQuery({name: "limit", required: false})
    @ApiQuery({name: "skip", required: false})
    async getList(@Query() paginationParams: PaginationParamsModel) {

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

    }

    @Post("/:id/block")
    @ApiOperation({
        summary: "Block account",
        deprecated: true
    })
    @ApiResponse({
        status: 200,
        description: "success"
    })
    async block(@Param("id", ObjectIdValidationPipe) id: string) {
    }

    @Post("/:id/unblock")
    @ApiOperation({
        summary: "Unblock account",
        deprecated: true
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
        type: [OperationReadModel]
    })
    @ApiQuery({name: "limit", required: false})
    @ApiQuery({name: "skip", required: false})
    async getOperationsHistory(@Param("id") id: string, @Query() paginationParams: PaginationParamsModel) {

    }

}
