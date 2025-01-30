import "flag-icons/css/flag-icons.min.css"
import { SUPPORTED_LANGUAGES, LANGUAGE_CLASS } from "@data/languages"
import useApp from "@lib/useApp"


const LanguageSelector = () => {
    const { language, showLanguageOptions, setLanguage, setShowLanguageOptions } = useApp()

    return (
        <div className="relative z-50 flex flex-row gap-4">
            <button onClick={() => setShowLanguageOptions(!showLanguageOptions)}>
                <span className={`fi fi-${LANGUAGE_CLASS[language]}`}></span>
            </button>
            { showLanguageOptions && (
                <div className="flex flex-row gap-2">
                    {
                        SUPPORTED_LANGUAGES.map((lang) => {
                            return (
                                <button
                                    className="cursor-pointer pointer-events-auto z-50"
                                    onClick={() => {
                                        setLanguage(lang)
                                        setShowLanguageOptions(false)
                                    }}
                                    >
                                    <span className={`fi fi-${LANGUAGE_CLASS[lang]} `}></span>
                                </button>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default LanguageSelector