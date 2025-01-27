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

export const LANGUAGE_DICT_ATTACKING: Record<SupportedLanguage, string> = {
    "en": "is Attacking",
    "ja": "攻撃中",
    "es": "está atacando",
    "fr": "attaque",
    "it": "sta attaccando",
    "de": "greift an",
    "ko": "공격 중"
  }

const TYPE_NAMES = raw as LocalizedTypeNames;
export default TYPE_NAMES;