import { JSONEventType, MetadataType, jsonEvent } from "@eventstore/db-client";
import { BaseEventData } from "../Event";
import { EventType } from "../EventType";
import { AccountEvent } from "./AccountEvent";

export class AccountBlockedEvent extends AccountEvent {
    readonly type = EventType.accountBlocked;

    constructor(params: {
        baseData?: BaseEventData;
        clientId: string;
        accountId: string;
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.accountId = params.accountId;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType; } {
        return jsonEvent<JSONEventType<
            typeof this.type, {
                entityId: string;
                clientId: string;
            }
        >>({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId
            }
        });
    }
}