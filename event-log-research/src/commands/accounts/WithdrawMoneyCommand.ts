import { AccountAggregate } from "../../aggregates/AccountAggregate";
import { Command } from "../Command";

export class WithdrawMoneyCommand extends Command {
    constructor(private readonly accountId: string, private readonly amountOfMoney: number, private readonly clientId: string) {
        super();
    }

    async execute(): Promise<void> {
        const account = await AccountAggregate.get(this.accountId);
        account.withdrawMoney({ accountId: this.accountId, clientId: this.clientId, amountOfMoney: this.amountOfMoney });
    }
}