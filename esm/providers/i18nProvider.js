import { resolveBrowserLocale } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import messages from "../i18n";
export var i18nProvider = polyglotI18nProvider(function (locale) { return (messages[locale] ? messages[locale] : messages.en); }, resolveBrowserLocale());
