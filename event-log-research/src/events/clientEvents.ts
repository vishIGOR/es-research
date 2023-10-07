import { BaseEventData, Event } from "./Event";
import { jsonEvent, JSONEventType, MetadataType } from "@eventstore/db-client";
import { EventType } from "./EventType";

export abstract class ClientEvent extends Event{
    clientId: string;
    get streamName(): string {
        return ClientEvent.buildStreamName(this.clientId);
    }

    static buildStreamName(id: string): string {
        return `client-${id}`;
    }
}
export class ClientRegistered extends ClientEvent{
    readonly type = EventType.clientRegistered;
    readonly clientName: string;

    constructor(params: {
        baseData?: BaseEventData,
        clientId: string,
        clientName: string,
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.clientName = params.clientName;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType } {
        return jsonEvent<JSONEventType<
            typeof this.type,
            {
                entityId: string;
                clientName: string;
            }
        >>({
            type: this.type,
            data: {
                entityId: this.clientId,
                clientName: this.clientName
            }
        });
    }

}
