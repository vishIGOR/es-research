import { AccountAggregate } from "../../aggregates/AccountAggregate";
import { Command } from "../Command";


export class DepositMoneyCommand extends Command {
    constructor(private readonly accountId: string, private readonly clientId: string, private readonly amountOfMoney: number) {
        super();
        this.accountId = accountId;
        this.clientId = clientId;
        this.amountOfMoney = amountOfMoney;
    }

    async execute(): Promise<void> {
        const account = await AccountAggregate.get(this.accountId);

        await account.depositMoney({
            clientId: this.clientId,
            amountOfMoney: this.amountOfMoney,
        });
    }

}
