import { Command } from "../Command";
import { AccountCreatedEvent } from "../../events/AccountEvent";

export class CreateAccountCommand extends Command<AccountCreatedEvent>{
	createEvent(): AccountCreatedEvent {
		return undefined;
	}

	execute(): void {
	}
}