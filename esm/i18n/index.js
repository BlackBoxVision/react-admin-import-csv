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
import englishMessages from "ra-language-english";
import spanishMessages from "ra-language-spanish";
import domainEsMessages from "./es";
import domainEnMessages from "./en";
export default {
    es: __assign(__assign({}, spanishMessages), domainEsMessages),
    en: __assign(__assign({}, englishMessages), domainEnMessages),
};
