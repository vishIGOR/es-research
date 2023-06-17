import { Command } from "../Command";
import { TopUpEvent } from "../../events/MoneyOperationEvent";

export class TopUpCommand extends Command<TopUpEvent>{
	protected createEvent(): TopUpEvent {
		return undefined;
	}

	execute(): void {
	}

}