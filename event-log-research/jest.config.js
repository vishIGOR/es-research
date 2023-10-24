"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    coverageProvider: "v8",
    maxWorkers: 1,
    "preset": "ts-jest",
    "testEnvironment": "node",
    "transform": {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    "transformIgnorePatterns": [
        "node_modules/(?!variables/.*)"
    ]
};
