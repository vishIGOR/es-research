import { Event } from "../Event";

export abstract class AccountEvent extends Event {
    accountId: string;
    clientId: string;
}


