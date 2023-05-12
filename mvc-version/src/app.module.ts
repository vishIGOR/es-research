import { Module } from "@nestjs/common";
import { DatabaseConfigService } from "./modules/databases/mongodb/database.config";
import { DatabaseConfigModule } from "./modules/databases/mongodb/database.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { OperationsModule } from "./modules/operations/operations.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env"
		}),
		DatabaseConfigModule,
		MongooseModule.forRootAsync({
			inject: [DatabaseConfigService],
			useFactory: async (configService: DatabaseConfigService) => configService.getMongoConfig()
		}),
		AccountsModule,
		UsersModule,
		OperationsModule
	],
	controllers: [],
	providers: []
})
export class AppModule {
}
