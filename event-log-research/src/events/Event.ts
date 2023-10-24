import { MetadataType } from "@eventstore/db-client";
import { EventType } from "./EventType";

export abstract class Event {
    readonly id?: string;
    readonly revision?: BigInt;
    readonly type: EventType;
    readonly createdAt: Date;

    constructor(baseData?: BaseEventData) {
        this.id = baseData?.id;
        this.revision = baseData?.revision;
        this.createdAt = baseData?.createdAt;
    }

    public abstract toJsonEvent(): {
        id: string,
        contentType: "application/json",
        type: string,
        data: {},
        metadata: MetadataType
    }
}

export type BaseEventData = {
    id: string,
    revision: BigInt,
    createdAt: Date
}
