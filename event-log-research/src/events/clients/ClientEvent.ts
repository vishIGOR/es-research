import { Event } from "../Event";

export abstract class ClientEvent extends Event {
    clientId: string;
}

