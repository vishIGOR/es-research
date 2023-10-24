import { AccountAggregate } from "../../aggregates/AccountAggregate";
import { Command } from "../Command";

class OpenAccountCommand extends Command {
    constructor(private readonly accountId: string, private readonly clientId: string) {
        super();
    }

    async execute(): Promise<void> {
        AccountAggregate.openAccount({ clientId: this.clientId });
    }
}