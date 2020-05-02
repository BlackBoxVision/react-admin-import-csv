"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_spanish_1 = __importDefault(require("ra-language-spanish"));
var es_1 = __importDefault(require("./es"));
var en_1 = __importDefault(require("./en"));
exports.default = {
    es: __assign(__assign({}, ra_language_spanish_1.default), es_1.default),
    en: __assign(__assign({}, ra_language_english_1.default), en_1.default),
};
