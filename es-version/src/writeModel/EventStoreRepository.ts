import { EventsRepositoryInterface } from "./EventsRepositoryInterface";

export class EventStoreRepository implements EventsRepositoryInterface {
	async save(event: Event): Promise<void> {
		return Promise.resolve(undefined);
	}

}