import englishMessages from "ra-language-english";
import spanishMessages from "ra-language-spanish";

import domainEsMessages from "./es";
import domainEnMessages from "./en";

export default {
  es: { ...spanishMessages, ...domainEsMessages },
  en: { ...englishMessages, ...domainEnMessages },
};
