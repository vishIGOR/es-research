import { BACKWARDS, END, EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";
import { Event } from "../events/Event";
import { EventType } from "../events/EventType";
import { ClientRegistered } from "../events/clientEvents";
import {
    AccountOpened,
    MoneyDeposited,
    MoneyTransferredFromIt,
    MoneyTransferredToIt,
    MoneyWithdrew
} from "../events/accountEvents";
import { compressToBase64, decompressFromBase64 } from "lz-string";


export interface EventStoreInterface {
    save(event: Event): Promise<void>;
}

export type EventStoreGetOptions = {
    invertedDirection?: boolean,
    maxCount?: number,
    fromRevision?: "end" | "start" | BigInt;
}

export class EventStore implements EventStoreInterface {
    private static instance: EventStore;
    private static buffer: Event[] = [];
    private client: EventStoreDBClient;
    private batchSavePeriod: number = 10;

    private constructor() {
        this.client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");
    }

    static getInstance(): EventStore {
        return this.instance || (this.instance = new this());
    }

    async save(event: Event): Promise<void> {
        if (event.type === EventType.accountOpened || event.type === EventType.clientRegistered) {
            await this.client.appendToStream(event.streamName, event.toJsonEvent());
            return;
        }
        EventStore.buffer.push(event);
        if (EventStore.buffer.length >= this.batchSavePeriod) {
            await this.batchSave();
        }
    }

    async get(stream: string, options?: EventStoreGetOptions): Promise<Event[]> {
        let fromRevision;
        switch (options?.fromRevision) {
            case "start":
                fromRevision = START;
                break;
            case "end":
                fromRevision = END;
                break;
            default:
                if (typeof options?.fromRevision === "bigint")
                    fromRevision = options.fromRevision;
        }

        const eventsAsObjects = await this.client.readStream(stream, {
            direction: options?.invertedDirection ? BACKWARDS : FORWARDS,
            maxCount: options?.maxCount ? options.maxCount : undefined,
            fromRevision,
        });

        const events: Event[] = [];
        for await (const eventAsObject of eventsAsObjects) {

            switch (eventAsObject.event.type) {
                case EventType.clientRegistered:
                    events.push(new ClientRegistered({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        clientName: eventAsObject.event.data["clientName"]
                    }));
                    break;
                case EventType.accountOpened:
                    events.push(new AccountOpened({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        accountId: eventAsObject.event.data["entityId"]
                    }));
                    break;
                case EventType.moneyDeposited:
                    events.push(new MoneyDeposited({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        accountId: eventAsObject.event.data["entityId"],
                        amountOfMoney: eventAsObject.event.data["amountOfMoney"]
                    }));
                    break;
                case EventType.moneyWithdrew:
                    events.push(new MoneyWithdrew({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        accountId: eventAsObject.event.data["entityId"],
                        amountOfMoney: eventAsObject.event.data["amountOfMoney"]
                    }));
                    break;
                case EventType.moneyTransferredFromIt:
                    events.push(new MoneyTransferredFromIt({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        accountId: eventAsObject.event.data["entityId"],
                        amountOfMoney: eventAsObject.event.data["amountOfMoney"],
                        to: eventAsObject.event.data["to"]
                    }));
                    break;
                case EventType.moneyTransferredToIt:
                    events.push(new MoneyTransferredToIt({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        accountId: eventAsObject.event.data["entityId"],
                        amountOfMoney: eventAsObject.event.data["amountOfMoney"],
                        from: eventAsObject.event.data["from"]
                    }));
                    break;
                default:
                    throw new Error("EventStore.get() got unspecified event " + eventAsObject.event.type);
            }
        }
        return events;
    }

    async disconnect() {
        await this.client.dispose();
    }

    private async batchSave() {
        const events = [];
        for (const event of EventStore.buffer) {
            events.push(event.toJsonEvent());
        }
        EventStore.buffer = [];
        await this.client.appendToStream("test-batch-stream", events);
    }

    private decompressData(compressedData: string): string {
        return decompressFromBase64(compressedData);
    }

}
