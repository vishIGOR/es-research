export class AcccountSnapshot {
    id: string;
    provision: number
    ownerId: string;
    openedAt: Date;
    balance: number = 0;
    isBlocked: boolean = false;
}