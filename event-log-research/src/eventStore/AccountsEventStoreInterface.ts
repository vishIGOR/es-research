import { AccountEvent } from "../events/accounts/AccountEvent";
import { EventStoreGetOptions } from "./EventStore";



export interface AccountsEventStoreInterface {
    saveAccountEvent(event: AccountEvent): Promise<void>;
    getAccountEvents(accountId: string, options?: EventStoreGetOptions): Promise<AccountEvent[]>;
}
