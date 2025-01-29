import useApp from "@lib/useApp"
import { LocalizedTypeNamesByLanguage } from "@lib/types"

import raw from "@data/json/typesByLanguage.json"

import {
    LANGUAGE_DICT_ATTACKING,
    LANGUAGE_DICT_INFO,
    LANGUAGE_DICT_CLOSE,
    LANGUAGE_DICT_NONE,
    LANGUAGE_DICT_INSTALL
} from "@data/languages"

const TYPE_NAMES = raw as LocalizedTypeNamesByLanguage

const useLanguage = () => {
    const { language } = useApp()

    return {
        close: LANGUAGE_DICT_CLOSE[language],
        none: LANGUAGE_DICT_NONE[language],
        install: LANGUAGE_DICT_INSTALL[language],
        attacking: LANGUAGE_DICT_ATTACKING[language],
        types: TYPE_NAMES[language],
        info: LANGUAGE_DICT_INFO[language]
    }
}

export default useLanguage