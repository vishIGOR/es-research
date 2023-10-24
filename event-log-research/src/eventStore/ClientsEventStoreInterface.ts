import { ClientEvent } from "../events/clients/ClientEvent";
import { EventStoreGetOptions } from "./EventStore";



export interface ClientsEventStoreInterface {
    saveClientEvent(event: ClientEvent): Promise<void>;
    getClientEvents(clientId: string, options?: EventStoreGetOptions): Promise<ClientEvent[]>;
}
