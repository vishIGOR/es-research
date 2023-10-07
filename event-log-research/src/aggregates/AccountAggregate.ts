import { Aggregate } from "./Aggregate";
import { EventStore } from "../eventStore/EventStore";
import { AccountEvent, AccountOpened, MoneyDeposited } from "../events/accountEvents";
import { EventType } from "../events/EventType";
import { v4 as uuidv4 } from "uuid";

export class AccountAggregate extends Aggregate {
    ownerId: string;
    openedAt: Date;
    balance: number = 0;
    isBlocked: boolean = false;

    private constructor() {
        super();
    }

    static async get(id: string) {
        const eventStore = EventStore.getInstance();

        const aggregate = new this();

        const events = await eventStore.get(AccountEvent.buildStreamName(id));
        for (const event of events) {
            aggregate.applyEvent(event as AccountEvent);
        }
        return aggregate;
    }

    static async openAccount(params: { clientId: string }): Promise<AccountAggregate> {
        const eventStore = EventStore.getInstance();

        const id = uuidv4();
        const openingEvent = new AccountOpened({
            accountId: id,
            clientId: params.clientId
        });
        await eventStore.save(openingEvent);

        return this.get(id);
    }

    applyEvent(event: AccountEvent) {
        let definedEvent;
        switch (event.type) {
            case EventType.accountOpened:
                definedEvent = event as AccountOpened;
                this.id = (event as AccountOpened).accountId;
                this.ownerId = definedEvent.clientId;
                this.openedAt = definedEvent.createdAt;

                break;
            case EventType.moneyDeposited:
                definedEvent = event as MoneyDeposited;
                this.balance += definedEvent.amountOfMoney;

                break;
            case EventType.moneyWithdrew:
                definedEvent = event as MoneyDeposited;
                this.balance -= definedEvent.amountOfMoney;

                break;
            case EventType.moneyTransferredFromIt:
                definedEvent = event as MoneyDeposited;
                this.balance -= definedEvent.amountOfMoney;

                break;
            case EventType.moneyTransferredToIt:
                definedEvent = event as MoneyDeposited;
                this.balance += definedEvent.amountOfMoney;

                break;
        }

        this.version = event.revision;
    }

    async deposit(params: { clientId: string, amountOfMoney: number }) {
        const depositEvent = new MoneyDeposited({
            clientId: params.clientId,
            accountId: this.id,
            amountOfMoney: params.amountOfMoney,
        });

        await this.eventStore.save(depositEvent);

        await this.applyEvent(depositEvent);
    }

}
