"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["clientRegistered"] = "clientRegistered";
    EventType["accountOpened"] = "accountOpened";
    EventType["moneyDeposited"] = "moneyDeposited";
    EventType["moneyTransferredFromIt"] = "moneyTransferredFromIt";
    EventType["moneyTransferredToIt"] = "moneyTransferredToIt";
    EventType["moneyWithdrew"] = "moneyWithdrew";
    EventType["accountBlocked"] = "accountBlocked";
    EventType["accountUnblocked"] = "accountUnblocked";
    EventType["testEvent"] = "testEvent";
})(EventType || (exports.EventType = EventType = {}));
