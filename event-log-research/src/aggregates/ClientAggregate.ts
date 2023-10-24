import { v4 as uuidv4 } from "uuid";
import { ClientsEventStoreInterface } from "../eventStore/ClientsEventStoreInterface";
import { EventStore } from "../eventStore/EventStore";
import { EventType } from "../events/EventType";
import { ClientEvent } from "../events/clients/ClientEvent";
import { ClientRegisteredEvent } from "../events/clients/ClientRegisteredEvent";
import { Aggregate } from "./Aggregate";

export class ClientAggregate extends Aggregate {
    name: string;
    registeredAt: Date;

    private constructor() {
        super();
    }

    static async get(id: string): Promise<ClientAggregate> {
        const eventStore: ClientsEventStoreInterface = EventStore.getInstance();

        const aggregate = new this();

        const events = await eventStore.getClientEvents(id);
        for (const event of events) {
            aggregate.applyEvent(event);
        }

        return aggregate;
    }

    static async registerClient(params: { name: string }): Promise<ClientAggregate> {
        const eventStore = EventStore.getInstance();

        const id = uuidv4();
        const registrationEvent = new ClientRegisteredEvent({
            clientId: id,
            clientName: params.name
        });
        await eventStore.saveClientEvent(registrationEvent);

        return this.get(id);
    }

    applyEvent(event: ClientEvent) {
        let definedEvent;
        switch (event.type) {
            case EventType.clientRegistered:
                definedEvent = event as ClientRegisteredEvent;
                this.registeredAt = definedEvent.createdAt;
                this.id = definedEvent.clientId;
                this.name = definedEvent.clientName;

                break;
        }
    }
}
