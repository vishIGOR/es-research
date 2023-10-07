"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(baseData) {
        this.id = baseData === null || baseData === void 0 ? void 0 : baseData.id;
        this.revision = baseData === null || baseData === void 0 ? void 0 : baseData.revision;
        this.createdAt = baseData === null || baseData === void 0 ? void 0 : baseData.createdAt;
    }
    return Event;
}());
exports.Event = Event;
