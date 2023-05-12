import {Entity} from "./Entity";

export abstract class OperationPayloadType extends Entity{
}
export class TransferOperationPayload extends OperationPayloadType {
    senderAccountId: string
    payeeAccountId: string
    amountOfMoney: number

    constructor(senderAccountId?, payeeAccountId?, amountOfMoney?) {
        super();
        this.senderAccountId = senderAccountId;
        this.payeeAccountId = payeeAccountId;
        this.amountOfMoney = amountOfMoney
    }
}

export class WithdrawOperationPayload extends OperationPayloadType {
    accountId: string
    amountOfMoney: number

    constructor(accountId?, amountOfMoney?) {
        super();
        this.accountId = accountId;
        this.amountOfMoney = amountOfMoney
    }
}

export class TopUpOperationPayload extends OperationPayloadType {
    accountId: string
    amountOfMoney: number

    constructor(accountId?, amountOfMoney?) {
        super();
        this.accountId = accountId;
        this.amountOfMoney = amountOfMoney
    }
}
