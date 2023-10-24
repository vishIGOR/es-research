import { BACKWARDS, END, EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";
import { EventType } from "../events/EventType";
import { AccountBlockedEvent } from "../events/accounts/AccountBlockedEvent";
import { AccountEvent } from "../events/accounts/AccountEvent";
import { AccountOpenedEvent } from "../events/accounts/AccountOpenedEvent";
import { MoneyDepositedEvent } from "../events/accounts/MoneyDepositedEvent";
import { MoneyTransferredFromAccountEvent } from "../events/accounts/MoneyTransferredFromAccount";
import { MoneyTransferredToAccountEvent } from "../events/accounts/MoneyTransferredToAccountEvent";
import { MoneyWithdrewEvent } from "../events/accounts/MoneyWithdrewEvent";
import { ClientEvent } from "../events/clients/ClientEvent";
import { ClientRegisteredEvent } from "../events/clients/ClientRegisteredEvent";
import { AccountsEventStoreInterface } from "./AccountsEventStoreInterface";
import { ClientsEventStoreInterface } from "./ClientsEventStoreInterface";


export type EventStoreGetOptions = {
    invertedDirection?: boolean,
    maxCount?: number,
    fromRevision?: "end" | "start" | BigInt;
}

export class EventStore implements ClientsEventStoreInterface, AccountsEventStoreInterface {
    private static instance: EventStore;
    private client: EventStoreDBClient;

    private constructor() {
        this.client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");
    }

    static getInstance(): EventStore {
        return this.instance || (this.instance = new this());
    }

    async saveClientEvent(event: ClientEvent): Promise<void> {
        await this.client.appendToStream(`client-${event.clientId}`, event.toJsonEvent());
    }

    async saveAccountEvent(event: AccountEvent): Promise<void> {
        await this.client.appendToStream(`account-${event.accountId}`, event.toJsonEvent());
    }

    async getClientEvents(clientId: string, options?: EventStoreGetOptions): Promise<ClientEvent[]> {
        const stream = `client-${clientId}`;

        const eventsAsObjects = await this.get(stream, options);

        return this.transformObjectsToClientEvents(eventsAsObjects);
    }


    async getAccountEvents(accountId: string, options?: EventStoreGetOptions): Promise<AccountEvent[]> {
        const stream = `account-${accountId}`;

        const eventsAsObjects = await this.get(stream, options);

        return this.transformObjectsToAccountEvents(eventsAsObjects);
    }

    private transformObjectsToAccountEvents(eventsAsObjects): AccountEvent[] {
        const events: AccountEvent[] = [];
        for (const eventAsObject of eventsAsObjects) {
            switch (eventAsObject.event.type) {
                case EventType.accountOpened:
                    events.push(new AccountOpenedEvent({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        accountId: eventAsObject.event.data["entityId"]
                    }));
                    break;
                case EventType.accountBlocked:
                    events.push(new AccountBlockedEvent({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        accountId: eventAsObject.event.data["entityId"]
                    }));
                    break;
                case EventType.accountUnblocked:
                    events.push(new AccountBlockedEvent({
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
                    events.push(new MoneyDepositedEvent({
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
                    events.push(new MoneyWithdrewEvent({
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
                case EventType.moneyTransferredFromAccount:
                    events.push(new MoneyTransferredFromAccountEvent({
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
                case EventType.moneyTransferredToAccount:
                    events.push(new MoneyTransferredToAccountEvent({
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

    private transformObjectsToClientEvents(eventsAsObjects): ClientEvent[] {
        const events: ClientEvent[] = [];
        for (const eventAsObject of eventsAsObjects) {
            switch (eventAsObject.event.type) {
                case EventType.clientRegistered:
                    events.push(new ClientRegisteredEvent({
                        baseData: {
                            id: eventAsObject.event.id,
                            revision: eventAsObject.event.revision,
                            createdAt: eventAsObject.event.created
                        },
                        clientId: eventAsObject.event.data["clientId"],
                        clientName: eventAsObject.event.data["clientName"]
                    }));
                    break;
                default:
                    throw new Error("EventStore.get() got unspecified event " + eventAsObject.event.type);
            }
        }
        return events;
    }

    private async get(stream: string, options?: EventStoreGetOptions) {
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

        const events = await this.client.readStream(stream, {
            direction: options?.invertedDirection ? BACKWARDS : FORWARDS,
            maxCount: options?.maxCount ? options.maxCount : undefined,
            fromRevision,
        });
        return events;
    }

    async disconnect() {
        await this.client.dispose();
    }
}
