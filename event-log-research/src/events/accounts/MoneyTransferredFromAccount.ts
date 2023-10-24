import { JSONEventType, MetadataType, jsonEvent } from "@eventstore/db-client";
import { BaseEventData } from "../Event";
import { EventType } from "../EventType";
import { AccountEvent } from "./AccountEvent";


export class MoneyTransferredFromAccountEvent extends AccountEvent {
    readonly type = EventType.moneyTransferredFromAccount;
    readonly amountOfMoney: number;
    readonly to: string;

    constructor(params: {
        baseData?: BaseEventData;
        clientId: string;
        accountId: string;
        amountOfMoney: number;
        to: string;
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.accountId = params.accountId;
        this.amountOfMoney = params.amountOfMoney;
        this.to = params.to;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType; } {
        return jsonEvent<JSONEventType<
            typeof this.type, {
                entityId: string;
                clientId: string;
                amountOfMoney: number;
                to: string;
            }
        >>({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId,
                amountOfMoney: this.amountOfMoney,
                to: this.to,
            }
        });
    }
}
