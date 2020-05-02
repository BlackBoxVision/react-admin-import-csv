"use strict";
/*
 * Fublic API Surface of ngx-firestate
 */
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var import_csv_button_1 = require("./import-csv-button");
exports.ImportButton = import_csv_button_1.ImportButton;
exports.default = react_redux_1.connect()(import_csv_button_1.ImportButton);
