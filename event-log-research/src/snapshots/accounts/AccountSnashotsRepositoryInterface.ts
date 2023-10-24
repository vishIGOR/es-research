import { AccountSnapshot } from "./AccountSnapshot";

export interface AccountSnapshotsRepositoryInterface {
  save(snapshot: AccountSnapshot): Promise<void>;
  getLastVersion(id: string): Promise<AccountSnapshot | null>;
}