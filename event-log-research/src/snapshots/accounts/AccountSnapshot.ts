import { JSONEventType, MetadataType, jsonEvent } from "@eventstore/db-client";

export class AccountSnapshot {
    readonly id: string;
    readonly version: BigInt;
    readonly ownerId: string;
    readonly openedAt: Date;
    readonly balance: number = 0;
    readonly isBlocked: boolean = false;

    constructor(params: {
        id: string;
        version: BigInt;
        ownerId: string;
        openedAt: Date;
        balance: number;
        isBlocked: boolean;
    }) {
        this.id = params.id;
        this.version = params.version;
        this.ownerId = params.ownerId;
        this.openedAt = params.openedAt;
        this.balance = params.balance;
        this.isBlocked = params.isBlocked;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType; } {
        return jsonEvent<JSONEventType<
            "AccountSnapshot", {
                id: string;
                version: BigInt;
                ownerId: string;
                openedAt: Date;
                balance: number;
                isBlocked: boolean;
            }
        >>({
            type: "AccountSnapshot",
            data: {
                id: this.id,
                version: this.version,
                ownerId: this.ownerId,
                openedAt: this.openedAt,
                balance: this.balance,
                isBlocked: this.isBlocked
            }
        });
    }
}