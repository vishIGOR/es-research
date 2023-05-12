import { AppError } from "./errors.base";

export class ValidationError extends AppError {
	_code = 400;

	constructor(message: string) {
		super();
		this._message = message;
	}
}

export abstract class EntityNotFoundError extends AppError {
	_code = 404;

	protected constructor(entityName: string) {
		super();
		this._message = `${entityName} not found`;
	}
}

export class AccountNotFoundError extends EntityNotFoundError {
	constructor() {
		super("Account");
	}
}

export class AccountIsBlocked extends AppError {
	_code = 403;
	_message = "Account is blocked";
}

export class InvalidTokenError extends AppError {
	_code = 401;
	_message = "Token is invalid";
}

export class UserNotOwnerError extends AppError {
	_code = 403;
	_message = "User is not the owner";
}

export class UserAlreadyExists extends AppError {
	_code = 400;
	_message = "User has already exist";
}

export class CurrencyAlreadyExistsError extends AppError {
	_code = 400;
	_message = "This currency has already exist";
}

export class TokenNotFoundError extends AppError {
	_code = 401;
	_message = "Token is not found";
}

export class UnexpectedServerError extends AppError {
	_code = 500;
	_message = "Unexpected server error";
}

export class NotEnoughMoneyError extends AppError {
	_code = 400;
	_message = "Not enough money on account";
}

export class SameAccountsInTransferError extends AppError {
	_code = 400;
	_message = "Can't transfer from account to itself";
}