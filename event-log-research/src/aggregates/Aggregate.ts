import { EventStore } from "../eventStore/EventStore";

export abstract class Aggregate {
    id: string;
    version: BigInt = BigInt(0);
    protected eventStore: EventStore;

    protected constructor() {
        this.eventStore = EventStore.getInstance();
    }
}
