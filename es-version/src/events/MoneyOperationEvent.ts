import { Event } from "./Event";

export abstract class MoneyOperationEvent extends Event {
	moneyAmount: number;

	toObject(): object {
		return Object.assign(super.toObject(), {
			moneyAmount: this.moneyAmount
		});
	}
}

export class TopUpEvent extends MoneyOperationEvent {
	accountId: string;

	toObject(): object {
		return Object.assign(super.toObject(), {
			accountId: this.accountId
		});
	}
}

export class WithdrawEvent extends MoneyOperationEvent {
	accountId: string;

	toObject(): object {
		return Object.assign(super.toObject(), {
			accountId: this.accountId
		});
	}
}

export class TransferEvent extends MoneyOperationEvent {
	payeeId: string;
	receiverId: string;

	toObject(): object {
		return Object.assign(super.toObject(), {
			payeeId: this.payeeId,
			receiverId: this.receiverId
		});
	}
}