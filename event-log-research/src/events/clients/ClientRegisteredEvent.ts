import { jsonEvent, JSONEventType, MetadataType } from "@eventstore/db-client";
import { BaseEventData } from "../Event";
import { EventType } from "../EventType";
import { ClientEvent } from "./ClientEvent";

export class ClientRegisteredEvent extends ClientEvent {
    readonly type = EventType.clientRegistered;
    readonly clientName: string;

    constructor(params: {
        baseData?: BaseEventData;
        clientId: string;
        clientName: string;
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.clientName = params.clientName;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType; } {
        return jsonEvent<JSONEventType<
            typeof this.type, {
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
