import { SupportedLanguage } from "@lib/types"
import raw from "@data/json/typeNames.json"
import { LocalizedTypeNames } from "@lib/types"

export const SUPPORTED_LANGUAGES = [ "en", "ja", "es", "fr", "it", "de", "ko" ]

export const LANGUAGE_CLASS: Record<SupportedLanguage, string> = {
    "en": "gb",
    "ja": "jp",
    "es": "es",
    "fr": "fr",
    "it": "it",
    "de": "de",
    "ko": "kr"
}

const TYPE_NAMES = raw as LocalizedTypeNames;
export default TYPE_NAMES;