import { Event } from "./Event";

export abstract class AccountEvent extends Event {
	accountId: string;

	toObject(): object {
		return Object.assign(super.toObject(), {
			accountId: this.accountId
		});
	}
}

export class AccountCreatedEvent extends AccountEvent {
	ownerId: string;

	toObject(): object {
		return Object.assign(super.toObject(), {
			ownerId: this.ownerId
		});
	}
}

export class AccountBlockedEvent extends AccountEvent{
}

export class AccountUnblockedEvent extends AccountEvent{
}