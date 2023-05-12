import { Module } from "@nestjs/common";
import { OperationsRepositoryInterface } from "./operations.repository.interface";
import { OperationsMongodbRepository } from "./operations.mongodb.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Operation, OperationSchema } from "../databases/mongodb/schemas/OperationSchema";

@Module({
	providers: [
		{
			provide: OperationsRepositoryInterface,
			useClass: OperationsMongodbRepository
		}
	],
	imports: [
		MongooseModule.forFeature([
			{ name: Operation.name, schema: OperationSchema }
		])
	],
	exports: [
		{
			provide: OperationsRepositoryInterface,
			useClass: OperationsMongodbRepository
		}
	]
})
export class OperationsModule {

}