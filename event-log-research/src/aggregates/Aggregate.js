"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregate = void 0;
var EventStore_1 = require("../eventStore/EventStore");
var Aggregate = /** @class */ (function () {
    function Aggregate() {
        this.version = BigInt(0);
        this.eventStore = EventStore_1.EventStore.getInstance();
    }
    return Aggregate;
}());
exports.Aggregate = Aggregate;
