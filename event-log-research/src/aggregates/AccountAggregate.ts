import { v4 as uuidv4 } from "uuid";
import { AccountsEventStoreInterface } from "../eventStore/AccountsEventStoreInterface";
import { EventStore } from "../eventStore/EventStore";
import { EventType } from "../events/EventType";
import { AccountBlockedEvent } from "../events/accounts/AccountBlockedEvent";
import { AccountEvent } from "../events/accounts/AccountEvent";
import { AccountOpenedEvent } from "../events/accounts/AccountOpenedEvent";
import { AccountUnblockedEvent } from "../events/accounts/AccountUnblockedEvent";
import { MoneyDepositedEvent } from "../events/accounts/MoneyDepositedEvent";
import { MoneyTransferredFromAccountEvent } from "../events/accounts/MoneyTransferredFromAccount";
import { MoneyTransferredToAccountEvent } from "../events/accounts/MoneyTransferredToAccountEvent";
import { MoneyWithdrewEvent } from "../events/accounts/MoneyWithdrewEvent";
import { AccountSnapshot } from "../snapshots/accounts/AccountSnapshot";
import { AccountSnapshotsRepositoryInterface } from "../snapshots/accounts/AccountSnashotsRepositoryInterface";
import { Aggregate } from "./Aggregate";

export class AccountAggregate extends Aggregate {
    ownerId: string;
    openedAt: Date;
    balance: number = 0;
    isBlocked: boolean = false;
    private snapshotBuildingPeriod: number = 10;

    private constructor() {
        super();
    }

    static async get(id: string): Promise<AccountAggregate | null> {
        const eventStore: AccountsEventStoreInterface = EventStore.getInstance();

        const aggregate = new this();

        const events = await eventStore.getAccountEvents(id);
        if (events.length == 0) {
            return null;
        }
        for (const event of events) {
            aggregate.applyEvent(event);
        }
        return aggregate;
    }

    applyEvent(event: AccountEvent) {
        let definedEvent;
        switch (event.type) {
            case EventType.accountOpened:
                definedEvent = event as AccountOpenedEvent;
                this.id = (event as AccountOpenedEvent).accountId;
                this.ownerId = definedEvent.clientId;
                this.openedAt = definedEvent.createdAt;

                break;
            case EventType.moneyDeposited:
                definedEvent = event as MoneyDepositedEvent;
                this.balance += definedEvent.amountOfMoney;

                break;
            case EventType.moneyWithdrew:
                definedEvent = event as MoneyDepositedEvent;
                this.balance -= definedEvent.amountOfMoney;

                break;
            case EventType.moneyTransferredFromAccount:
                definedEvent = event as MoneyDepositedEvent;
                this.balance -= definedEvent.amountOfMoney;

                break;
            case EventType.moneyTransferredToAccount:
                definedEvent = event as MoneyDepositedEvent;
                this.balance += definedEvent.amountOfMoney;

                break;
            case EventType.accountBlocked:
                definedEvent = event as AccountBlockedEvent;
                this.isBlocked = true;

                break;
            case EventType.accountUnblocked:
                definedEvent = event as AccountBlockedEvent;
                this.isBlocked = false;

                break;
        }

        this.version = event.revision;
    }

    static async openAccount(params: { clientId: string }): Promise<AccountAggregate> {
        const eventStore = EventStore.getInstance();

        const id = uuidv4();
        const openingEvent = new AccountOpenedEvent({
            accountId: id,
            clientId: params.clientId
        });
        await eventStore.saveClientEvent(openingEvent);

        return this.get(id);
    }

    async depositMoney(params: { clientId: string, amountOfMoney: number }) {
        this.throwErrorIfBlocked()
        const depositEvent = new MoneyDepositedEvent({
            clientId: params.clientId,
            accountId: this.id,
            amountOfMoney: params.amountOfMoney,
        });

        await this.eventStore.saveClientEvent(depositEvent);

        this.applyEvent(depositEvent);
    }

    async withdrawMoney(params: { accountId: string, clientId: string; amountOfMoney: number }): Promise<void> {
        this.throwErrorIfBlocked()
        if (this.balance < params.amountOfMoney) {
            throw new Error("Insufficient balance");
        }
        this.applyEvent(new MoneyWithdrewEvent({ accountId: this.id, amountOfMoney: params.amountOfMoney, clientId: params.clientId }));
    }

    async blockAccount(params: { clientId: string }): Promise<void> {
        if (this.isBlocked) {
            throw new Error("Account is already blocked");
        }
        const event = new AccountBlockedEvent({ accountId: this.id, clientId: params.clientId });
        await this.eventStore.saveClientEvent(event)
        this.applyEvent(event);
    }

    async unblockAccount(params: { clientId: string }): Promise<void> {
        if (!this.isBlocked) {
            throw new Error("Account is already unblocked");
        }
        const event = new AccountUnblockedEvent({ accountId: this.id, clientId: params.clientId });
        await this.eventStore.saveClientEvent(event)
        this.applyEvent(event);
    }

    async transferMoney(params: { clientId: string; targetAccountId: string; amountOfMoney: number }): Promise<void> {
        this.throwErrorIfBlocked()
        const targetAccount = await AccountAggregate.get(params.targetAccountId)
        if (!targetAccount) {
            throw new Error("Target account doesn't exist");
        }
        if (targetAccount.isBlocked) {
            throw new Error("Target account is blocked");
        }
        if (this.balance < params.amountOfMoney) {
            throw new Error("Insufficient balance");
        }
        const fromAccountEvent = new MoneyTransferredFromAccountEvent({ accountId: this.id, clientId: params.clientId, to: params.targetAccountId, amountOfMoney: params.amountOfMoney });
        const toAccountEvent = new MoneyTransferredToAccountEvent({ accountId: params.targetAccountId, clientId: params.clientId, from: this.id, amountOfMoney: params.amountOfMoney });

        const promises = []
        promises.push(this.eventStore.saveClientEvent(fromAccountEvent));
        promises.push(this.eventStore.saveClientEvent(toAccountEvent));

        this.applyEvent(fromAccountEvent);

        await Promise.all(promises)
    }

    static applySnapshot(snapshot: AccountSnapshot): AccountAggregate {
        const account = new AccountAggregate();
        account.balance = snapshot.balance;
        account.isBlocked = snapshot.isBlocked;
        return account;
    }

    async buildSnapshot(snapshotsRepository: AccountSnapshotsRepositoryInterface): Promise<void> {
        if (this.snapshotBuildingPeriod > 0 && this.balance > this.snapshotBuildingPeriod) {
            const snapshot = new AccountSnapshot({ version: this.version, id: this.id, ownerId: this.ownerId, balance: this.balance, isBlocked: this.isBlocked, openedAt: this.openedAt });
            await snapshotsRepository.save(snapshot);
        }
    }


    private throwErrorIfBlocked() {
        if (this.isBlocked) {
            throw new Error("Account is blocked");
        }
    }
}


