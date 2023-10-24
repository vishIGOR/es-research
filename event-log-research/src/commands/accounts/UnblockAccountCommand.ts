import { AccountAggregate } from "../../aggregates/AccountAggregate";
import { Command } from "../Command";

export class UnblockAccountCommand extends Command {
    constructor(private readonly accountId: string, private readonly clientId: string) {
        super();
    }

    async execute(): Promise<void> {
        const account = await AccountAggregate.get(this.accountId);
        account.unblockAccount({ clientId: this.clientId });
    }
}