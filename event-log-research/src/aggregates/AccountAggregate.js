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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAggregate = void 0;
var Aggregate_1 = require("./Aggregate");
var EventStore_1 = require("../eventStore/EventStore");
var accountEvents_1 = require("../events/accountEvents");
var EventType_1 = require("../events/EventType");
var uuid_1 = require("uuid");
var AccountAggregate = /** @class */ (function (_super) {
    __extends(AccountAggregate, _super);
    function AccountAggregate() {
        var _this = _super.call(this) || this;
        _this.balance = 0;
        _this.isBlocked = false;
        return _this;
    }
    AccountAggregate.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var eventStore, aggregate, events, _i, events_1, event_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventStore = EventStore_1.EventStore.getInstance();
                        aggregate = new this();
                        return [4 /*yield*/, eventStore.get(accountEvents_1.AccountEvent.buildStreamName(id))];
                    case 1:
                        events = _a.sent();
                        for (_i = 0, events_1 = events; _i < events_1.length; _i++) {
                            event_1 = events_1[_i];
                            aggregate.applyEvent(event_1);
                        }
                        return [2 /*return*/, aggregate];
                }
            });
        });
    };
    AccountAggregate.openAccount = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var eventStore, id, openingEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventStore = EventStore_1.EventStore.getInstance();
                        id = (0, uuid_1.v4)();
                        openingEvent = new accountEvents_1.AccountOpened({
                            accountId: id,
                            clientId: params.clientId
                        });
                        return [4 /*yield*/, eventStore.save(openingEvent)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.get(id)];
                }
            });
        });
    };
    AccountAggregate.prototype.applyEvent = function (event) {
        var definedEvent;
        switch (event.type) {
            case EventType_1.EventType.accountOpened:
                definedEvent = event;
                this.id = event.accountId;
                this.ownerId = definedEvent.clientId;
                this.openedAt = definedEvent.createdAt;
                break;
            case EventType_1.EventType.moneyDeposited:
                definedEvent = event;
                this.balance += definedEvent.amountOfMoney;
                break;
            case EventType_1.EventType.moneyWithdrew:
                definedEvent = event;
                this.balance -= definedEvent.amountOfMoney;
                break;
            case EventType_1.EventType.moneyTransferredFromIt:
                definedEvent = event;
                this.balance -= definedEvent.amountOfMoney;
                break;
            case EventType_1.EventType.moneyTransferredToIt:
                definedEvent = event;
                this.balance += definedEvent.amountOfMoney;
                break;
        }
        this.version = event.revision;
    };
    AccountAggregate.prototype.deposit = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var depositEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        depositEvent = new accountEvents_1.MoneyDeposited({
                            clientId: params.clientId,
                            accountId: this.id,
                            amountOfMoney: params.amountOfMoney,
                        });
                        return [4 /*yield*/, this.eventStore.save(depositEvent)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.applyEvent(depositEvent)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AccountAggregate;
}(Aggregate_1.Aggregate));
exports.AccountAggregate = AccountAggregate;
