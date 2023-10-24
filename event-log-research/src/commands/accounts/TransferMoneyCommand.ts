import { AccountAggregate } from "../../aggregates/AccountAggregate";
import { Command } from "../Command";

export class TransferMoneyCommand extends Command {
    constructor(
        private readonly sourceAccountId: string,
        private readonly targetAccountId: string,
        private readonly clientId: string,
        private readonly amountOfMoney: number
    ) {
        super();
    }

    async execute(): Promise<void> {
        const sourceAccount = await AccountAggregate.get(this.sourceAccountId);
        sourceAccount.transferMoney({ clientId: this.clientId, targetAccountId: this.targetAccountId, amountOfMoney: this.amountOfMoney });
    }
}