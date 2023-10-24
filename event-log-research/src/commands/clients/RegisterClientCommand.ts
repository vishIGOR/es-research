import { ClientAggregate } from "../../aggregates/ClientAggregate";
import { Command } from "../Command";

class RegisterClientCommand extends Command {
    constructor(private readonly clientId: string, private readonly name: string) {
        super();
    }

    async execute(): Promise<void> {
        await ClientAggregate.registerClient({ name: this.name });
    }
}