export interface EventsRepositoryInterface {

	save(event: Event): Promise<void>;
}

export const EventsRepositoryInterface = Symbol("EventsRepositoryInterface");