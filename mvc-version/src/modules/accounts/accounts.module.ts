import { Module } from "@nestjs/common";
import { AccountsController } from "./accounts.controller";
import { AccountsServiceInterface } from "./service/accounts.service.interface";
import { AccountsService } from "./service/accounts.service";
import { AccountsRepositoryInterface } from "./accounts.repository.interface";
import { AccountsMongodbRepository } from "./accounts.mongodb.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "../databases/mongodb/schemas/AccountSchema";
import { OperationsModule } from "../operations/operations.module";

@Module({
	providers: [
		{
			provide: AccountsServiceInterface,
			useClass: AccountsService
		},
		{
			provide: AccountsRepositoryInterface,
			useClass: AccountsMongodbRepository
		}
	],
	controllers: [AccountsController],
	exports: [],
	imports: [
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema }
		]),
		OperationsModule
	]
})
export class AccountsModule {
}