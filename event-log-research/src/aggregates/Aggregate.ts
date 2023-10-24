import { EventStore } from "../eventStore/EventStore";

export abstract class Aggregate {
    id: string;
    protected eventStore: EventStore;

    protected constructor() {
        this.eventStore = EventStore.getInstance();
    }
}
