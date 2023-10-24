import { EventStoreDBClient, JSONEventType } from "@eventstore/db-client";
import { AccountSnapshot } from "./accounts/AccountSnapshot";
import { AccountSnapshotsRepositoryInterface } from "./accounts/AccountSnashotsRepositoryInterface";

class SnapshotsRepository implements AccountSnapshotsRepositoryInterface {
    private static instance: SnapshotsRepository;
    private client: EventStoreDBClient;

    private constructor() {
        this.client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");
    }

    static getInstance(): SnapshotsRepository {
        return this.instance || (this.instance = new this());
    }

    async save(snapshot: AccountSnapshot): Promise<void> {
        await this.client.appendToStream(`accountSnapshot-${snapshot.id}`, snapshot.toJsonEvent());
    }

    async getLastVersion(accountId: string): Promise<AccountSnapshot | null> {
        const readResult = await this.client.readStream(`accountSnapshot-${accountId}`);

        let lastSnapshot: AccountSnapshot | null = null;

        for await (const resolvedEvent of readResult) {
            if (resolvedEvent.event) {
                const event = resolvedEvent.event;

                if (event.type === 'AccountSnapshot') {
                    const eventData = event.data as JSONEventType<string, any>['data'];
                    lastSnapshot = new AccountSnapshot(
                        {
                            id: eventData.id,
                            ownerId: eventData.ownerId,
                            balance: eventData.balance,
                            isBlocked: eventData.isBlocked,
                            version: eventData.version,
                            openedAt: eventData.openedAt,
                        });
                }
            }
        }

        return lastSnapshot;
    }
}