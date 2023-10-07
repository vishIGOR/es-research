import { Aggregate } from "./Aggregate";
import { ClientEvent, ClientRegistered } from "../events/clientEvents";
import { EventStore } from "../eventStore/EventStore";
import { AccountEvent } from "../events/accountEvents";
import { EventType } from "../events/EventType";
import { v4 as uuidv4 } from "uuid";

export class ClientAggregate extends Aggregate {
    name: string;
    registeredAt: Date;

    private constructor() {
        super();
    }

    static async get(id: string): Promise<ClientAggregate> {
        const eventStore = EventStore.getInstance();

        const aggregate = new this();

        const events = await eventStore.get(ClientEvent.buildStreamName(id));
        for (const event of events) {
            aggregate.applyEvent(event as AccountEvent);
        }

        return aggregate;
    }

    static async registerClient(params: { name: string }): Promise<ClientAggregate> {
        const eventStore = EventStore.getInstance();

        const id = uuidv4();
        const registrationEvent = new ClientRegistered({
            clientId: id,
            clientName: params.name
        });
        await eventStore.save(registrationEvent);

        return this.get(id);
    }

    applyEvent(event: ClientEvent) {
        let definedEvent;
        switch (event.type) {
            case EventType.clientRegistered:
                definedEvent = event as ClientRegistered;
                this.registeredAt = definedEvent.createdAt;
                this.id = definedEvent.clientId;
                this.name = definedEvent.clientName;

                break;
        }

        this.version = event.revision;
    }
}
