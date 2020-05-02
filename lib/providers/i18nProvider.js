"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_admin_1 = require("react-admin");
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var i18n_1 = __importDefault(require("../i18n"));
exports.i18nProvider = ra_i18n_polyglot_1.default(function (locale) { return (i18n_1.default[locale] ? i18n_1.default[locale] : i18n_1.default.en); }, react_admin_1.resolveBrowserLocale());
