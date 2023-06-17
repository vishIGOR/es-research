import { Event } from "../events/Event";

export abstract class Command<EventType extends Event> {

	constructor() {
	}
	abstract execute(): void ;

	protected abstract createEvent(): EventType;
}