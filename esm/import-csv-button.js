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
        while (_) try {
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
import React, { useState } from "react";
import { Button as RAButton } from "react-admin";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, } from "@material-ui/core";
import { useNotify, useDataProvider } from "react-admin";
import { i18nProvider } from "./providers/i18nProvider";
import { processCsvFile } from "./csv-extractor";
export var ImportButton = function (props) {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var _b = useState(false), importing = _b[0], setImporting = _b[1];
    var _c = useState(null), fileName = _c[0], setFileName = _c[1];
    var _d = useState(null), values = _d[0], setValues = _d[1];
    var _e = useState(null), errorTxt = _e[0], setErrorTxt = _e[1];
    var notify = useNotify();
    var dataProvider = useDataProvider();
    var handleSubmitCreate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setImporting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (values.some(function (v) { return v.id; })) {
                        throw new Error(i18nProvider.translate("csv.error.hasId"));
                    }
                    if (preCommitCallback) {
                        setValues(preCommitCallback("create", values));
                    }
                    if (!!handleFileData) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all(values.map(function (value) { return dataProvider.create(resource, { data: value }); }))];
                case 2:
                    result = _a.sent();
                    if (result) {
                        handleComplete();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    handleFileData(values);
                    handleComplete();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    handleComplete(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmitOverwrite = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setImporting(true);
            try {
                if (values.some(function (v) { return !v.id; })) {
                    throw new Error(i18nProvider.translate("csv.error.noId"));
                }
                if (preCommitCallback)
                    setValues(preCommitCallback("overwrite", values));
                Promise.all(values.map(function (value) {
                    return dataProvider.update(resource, { id: value.id, data: value });
                })).then(function () {
                    handleComplete();
                });
            }
            catch (error) {
                handleComplete(error);
            }
            return [2 /*return*/];
        });
    }); };
    var resource = props.resource, parseConfig = props.parseConfig, logging = props.logging, preCommitCallback = props.preCommitCallback, _f = props.withOverwrite, withOverwrite = _f === void 0 ? true : _f, handleFileData = props.handleFileData;
    if (logging) {
        console.log({ props: props });
    }
    if (!resource) {
        throw new Error(i18nProvider.translate("csv.error.emptyResource"));
    }
    var variant = props.variant, label = props.label, resourceName = props.resourceName;
    if (!label) {
        label = i18nProvider.translate("csv.main.import");
    }
    if (!variant) {
        variant = "text";
    }
    if (!resourceName) {
        resourceName = resource;
    }
    var openImportDialog = function () { return setOpen(true); };
    var handleClose = function () {
        setOpen(false);
        setImporting(false);
        setFileName(null);
        setValues(null);
    };
    var handleComplete = function (error) {
        if (error === void 0) { error = false; }
        handleClose();
        if (!error)
            notify(i18nProvider.translate("csv.alert.imported") + " " + fileName);
        if (error) {
            notify(i18nProvider.translate("csv.error.importing") + " " + fileName + ", " + error, "error");
        }
    };
    var onFileAdded = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var file, values_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = e.target.files && e.target.files[0];
                    setFileName(file.name);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, processCsvFile(file, parseConfig)];
                case 2:
                    values_1 = _a.sent();
                    if (logging) {
                        console.log({ values: values_1 });
                    }
                    setValues(values_1);
                    setErrorTxt(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    setValues(null);
                    setErrorTxt(error_2.toString());
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(RAButton, { color: "primary", component: "span", variant: variant, label: label, onClick: openImportDialog },
            React.createElement(GetAppIcon, { style: { transform: "rotate(180deg)", fontSize: "20" } })),
        React.createElement(Dialog, { open: open, onClose: handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
            React.createElement(DialogTitle, { id: "alert-dialog-title" },
                i18nProvider.translate("csv.dialog.importTo"),
                " \"",
                resourceName,
                "\""),
            React.createElement(DialogContent, null,
                React.createElement("div", { id: "alert-dialog-description", style: { fontFamily: "sans-serif" } },
                    React.createElement("p", { style: { margin: "0" } }, i18nProvider.translate("csv.dialog.dataFileReq")),
                    React.createElement("ol", null,
                        React.createElement("li", null, i18nProvider.translate("csv.dialog.extension")),
                        React.createElement("li", null, i18nProvider.translate("csv.dialog.idColumnCreate")),
                        React.createElement("li", null, i18nProvider.translate("csv.dialog.idColumnUpdate"))),
                    React.createElement(Button, { variant: "contained", component: "label" },
                        React.createElement("span", null, i18nProvider.translate("csv.dialog.chooseFile")),
                        React.createElement(GetAppIcon, { style: { transform: "rotate(180deg)", fontSize: 20 } }),
                        React.createElement("input", { type: "file", style: { display: "none" }, onChange: onFileAdded, accept: ".csv,.tsv,.txt" })),
                    !!fileName && (React.createElement("p", { style: { marginBottom: 0 } },
                        i18nProvider.translate("csv.dialog.processed"),
                        ":",
                        " ",
                        React.createElement("strong", null, fileName))),
                    !!values && (React.createElement("p", { style: { margin: 0 } },
                        i18nProvider.translate("csv.dialog.rowCount"),
                        ":",
                        " ",
                        React.createElement("strong", null, values.length))),
                    !!errorTxt && (React.createElement("p", { style: { margin: 0, color: "red" } }, errorTxt)))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: handleClose },
                    React.createElement("span", null, i18nProvider.translate("csv.dialog.cancel"))),
                React.createElement(Button, { disabled: !values || importing, onClick: handleSubmitCreate, color: "secondary", variant: "contained" },
                    importing && React.createElement(CircularProgress, { size: 18, thickness: 2 }),
                    React.createElement("span", null, i18nProvider.translate("csv.dialog.importNew"))),
                withOverwrite && (React.createElement(Button, { disabled: !values || importing, onClick: handleSubmitOverwrite, color: "primary", variant: "contained" },
                    importing && React.createElement(CircularProgress, { size: 18, thickness: 2 }),
                    React.createElement("span", null, i18nProvider.translate("csv.dialog.importOverride"))))))));
};
