import { BaseEventData, Event } from "./Event";
import { jsonEvent, JSONEventType, MetadataType } from "@eventstore/db-client";
import { EventType } from "./EventType";

export abstract class AccountEvent extends Event {
    accountId: string;
    clientId: string;

    get streamName(): string {
        return AccountEvent.buildStreamName(this.accountId);
    }

    static buildStreamName(id: string): string {
        return `account-${id}`;
    }
}

export class AccountOpened extends AccountEvent {
    readonly type = EventType.accountOpened;

    constructor(params: {
        baseData?: BaseEventData,
        clientId: string,
        accountId: string,
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.accountId = params.accountId;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType } {
        return jsonEvent<JSONEventType<
            typeof this.type,
            {
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

export class MoneyDeposited extends AccountEvent {
    readonly type = EventType.moneyDeposited;
    readonly amountOfMoney: number;

    constructor(params: {
        baseData?: BaseEventData,
        clientId: string,
        accountId: string,
        amountOfMoney: number
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.accountId = params.accountId;
        this.amountOfMoney = params.amountOfMoney;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType } {
        return jsonEvent<JSONEventType<
            typeof this.type,
            {
                entityId: string;
                clientId: string;
                amountOfMoney: number;
            }
        >>({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId,
                amountOfMoney: this.amountOfMoney
            }
        });
    }
}

export class MoneyWithdrew extends AccountEvent {
    readonly type = EventType.moneyWithdrew;
    readonly amountOfMoney: number;

    constructor(params: {
        baseData?: BaseEventData,
        clientId: string,
        accountId: string,
        amountOfMoney: number
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.accountId = params.accountId;
        this.amountOfMoney = params.amountOfMoney;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType } {
        return jsonEvent<JSONEventType<
            typeof this.type,
            {
                entityId: string;
                clientId: string;
                amountOfMoney: number;
            }
        >>({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId,
                amountOfMoney: this.amountOfMoney
            }
        });
    }
}

export class MoneyTransferredToIt extends AccountEvent {
    readonly type = EventType.moneyTransferredToIt;
    readonly amountOfMoney: number;
    readonly from: string;

    constructor(params: {
        baseData?: BaseEventData,
        clientId: string,
        accountId: string,
        amountOfMoney: number,
        from: string,
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.accountId = params.accountId;
        this.amountOfMoney = params.amountOfMoney;
        this.from = params.from;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType } {
        return jsonEvent<JSONEventType<
            typeof this.type,
            {
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

export class MoneyTransferredFromIt extends AccountEvent {
    readonly type = EventType.moneyTransferredFromIt;
    readonly amountOfMoney: number;
    readonly to: string;

    constructor(params: {
        baseData?: BaseEventData,
        clientId: string,
        accountId: string,
        amountOfMoney: number,
        to: string,
    }) {
        super(params.baseData);
        this.clientId = params.clientId;
        this.accountId = params.accountId;
        this.amountOfMoney = params.amountOfMoney;
        this.to = params.to;
    }

    toJsonEvent(): { id: string; contentType: "application/json"; type: string; data: {}; metadata: MetadataType } {
        return jsonEvent<JSONEventType<
            typeof this.type,
            {
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
