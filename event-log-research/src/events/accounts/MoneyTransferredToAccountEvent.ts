import { JSONEventType, MetadataType, jsonEvent } from "@eventstore/db-client";
import { BaseEventData } from "../Event";
import { EventType } from "../EventType";
import { AccountEvent } from "./AccountEvent";


export class MoneyTransferredToAccountEvent extends AccountEvent {
    readonly type = EventType.moneyTransferredToAccount;
    readonly amountOfMoney: number;
    readonly from: string;

    constructor(params: {
        baseData?: BaseEventData;
        clientId: string;
        accountId: string;
        amountOfMoney: number;
        from: string;
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.accountId = params.accountId;
        this.amountOfMoney = params.amountOfMoney;
        this.from = params.from;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType; } {
        return jsonEvent<JSONEventType<
            typeof this.type, {
                entityId: string;
                clientId: string;
                amountOfMoney: number;
                from: string;
            }
        >>({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId,
                amountOfMoney: this.amountOfMoney,
                from: this.from,
            }
        });
    }
}