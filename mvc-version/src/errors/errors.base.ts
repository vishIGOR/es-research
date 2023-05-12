export abstract class AppError extends Error {
    protected _code: number;

    public get code(): number {
        return this._code;
    }

    protected _message: string

    public get message(): string {
        return this._message;
    }

    public getSchemaExample(): { status: number, description: string } {
        return {status: this._code, description: this._message}
    }
}