"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyTransferredFromIt = exports.MoneyTransferredToIt = exports.MoneyWithdrew = exports.MoneyDeposited = exports.AccountOpened = exports.AccountEvent = void 0;
var Event_1 = require("./Event");
var db_client_1 = require("@eventstore/db-client");
var EventType_1 = require("./EventType");
var AccountEvent = /** @class */ (function (_super) {
    __extends(AccountEvent, _super);
    function AccountEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AccountEvent.prototype, "streamName", {
        get: function () {
            return AccountEvent.buildStreamName(this.accountId);
        },
        enumerable: false,
        configurable: true
    });
    AccountEvent.buildStreamName = function (id) {
        return "account-".concat(id);
    };
    return AccountEvent;
}(Event_1.Event));
exports.AccountEvent = AccountEvent;
var AccountOpened = /** @class */ (function (_super) {
    __extends(AccountOpened, _super);
    function AccountOpened(params) {
        var _this = _super.call(this, params.baseData) || this;
        _this.type = EventType_1.EventType.accountOpened;
        _this.clientId = params.clientId;
        _this.accountId = params.accountId;
        return _this;
    }
    AccountOpened.prototype.toJsonEvent = function () {
        return (0, db_client_1.jsonEvent)({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId
            }
        });
    };
    return AccountOpened;
}(AccountEvent));
exports.AccountOpened = AccountOpened;
var MoneyDeposited = /** @class */ (function (_super) {
    __extends(MoneyDeposited, _super);
    function MoneyDeposited(params) {
        var _this = _super.call(this, params.baseData) || this;
        _this.type = EventType_1.EventType.moneyDeposited;
        _this.clientId = params.clientId;
        _this.accountId = params.accountId;
        _this.amountOfMoney = params.amountOfMoney;
        return _this;
    }
    MoneyDeposited.prototype.toJsonEvent = function () {
        return (0, db_client_1.jsonEvent)({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId,
                amountOfMoney: this.amountOfMoney
            }
        });
    };
    return MoneyDeposited;
}(AccountEvent));
exports.MoneyDeposited = MoneyDeposited;
var MoneyWithdrew = /** @class */ (function (_super) {
    __extends(MoneyWithdrew, _super);
    function MoneyWithdrew(params) {
        var _this = _super.call(this, params.baseData) || this;
        _this.type = EventType_1.EventType.moneyWithdrew;
        _this.clientId = params.clientId;
        _this.accountId = params.accountId;
        _this.amountOfMoney = params.amountOfMoney;
        return _this;
    }
    MoneyWithdrew.prototype.toJsonEvent = function () {
        return (0, db_client_1.jsonEvent)({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId,
                amountOfMoney: this.amountOfMoney
            }
        });
    };
    return MoneyWithdrew;
}(AccountEvent));
exports.MoneyWithdrew = MoneyWithdrew;
var MoneyTransferredToIt = /** @class */ (function (_super) {
    __extends(MoneyTransferredToIt, _super);
    function MoneyTransferredToIt(params) {
        var _this = _super.call(this, params.baseData) || this;
        _this.type = EventType_1.EventType.moneyTransferredToIt;
        _this.clientId = params.clientId;
        _this.accountId = params.accountId;
        _this.amountOfMoney = params.amountOfMoney;
        _this.from = params.from;
        return _this;
    }
    MoneyTransferredToIt.prototype.toJsonEvent = function () {
        return (0, db_client_1.jsonEvent)({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId,
                amountOfMoney: this.amountOfMoney,
                from: this.from,
            }
        });
    };
    return MoneyTransferredToIt;
}(AccountEvent));
exports.MoneyTransferredToIt = MoneyTransferredToIt;
var MoneyTransferredFromIt = /** @class */ (function (_super) {
    __extends(MoneyTransferredFromIt, _super);
    function MoneyTransferredFromIt(params) {
        var _this = _super.call(this, params.baseData) || this;
        _this.type = EventType_1.EventType.moneyTransferredFromIt;
        _this.clientId = params.clientId;
        _this.accountId = params.accountId;
        _this.amountOfMoney = params.amountOfMoney;
        _this.to = params.to;
        return _this;
    }
    MoneyTransferredFromIt.prototype.toJsonEvent = function () {
        return (0, db_client_1.jsonEvent)({
            type: this.type,
            data: {
                entityId: this.accountId,
                clientId: this.clientId,
                amountOfMoney: this.amountOfMoney,
                to: this.to,
            }
        });
    };
    return MoneyTransferredFromIt;
}(AccountEvent));
exports.MoneyTransferredFromIt = MoneyTransferredFromIt;
