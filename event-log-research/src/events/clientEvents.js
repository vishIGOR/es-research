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
exports.ClientRegistered = exports.ClientEvent = void 0;
var Event_1 = require("./Event");
var db_client_1 = require("@eventstore/db-client");
var EventType_1 = require("./EventType");
var ClientEvent = /** @class */ (function (_super) {
    __extends(ClientEvent, _super);
    function ClientEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ClientEvent.prototype, "streamName", {
        get: function () {
            return ClientEvent.buildStreamName(this.clientId);
        },
        enumerable: false,
        configurable: true
    });
    ClientEvent.buildStreamName = function (id) {
        return "client-".concat(id);
    };
    return ClientEvent;
}(Event_1.Event));
exports.ClientEvent = ClientEvent;
var ClientRegistered = /** @class */ (function (_super) {
    __extends(ClientRegistered, _super);
    function ClientRegistered(params) {
        var _this = _super.call(this, params.baseData) || this;
        _this.type = EventType_1.EventType.clientRegistered;
        _this.clientId = params.clientId;
        _this.clientName = params.clientName;
        return _this;
    }
    ClientRegistered.prototype.toJsonEvent = function () {
        return (0, db_client_1.jsonEvent)({
            type: this.type,
            data: {
                entityId: this.clientId,
                clientName: this.clientName
            }
        });
    };
    return ClientRegistered;
}(ClientEvent));
exports.ClientRegistered = ClientRegistered;
