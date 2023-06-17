import { Module } from "@nestjs/common";
import { EventStoreRepository } from "../writeModel/EventStoreRepository";
import { EventsRepositoryInterface } from "../writeModel/EventsRepositoryInterface";

@Module({
	providers: [
		{
			provide: WriteRepositoryInterface,
			useClass: EventStoreRepository
		}
	],
	controllers: [],
	exports: [
		{
			provide: WriteRepositoryInterface,
			useClass: EventStoreRepository
		}
	],
	imports: []
})
export class WriteModelModule {
}