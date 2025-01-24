import "flag-icons/css/flag-icons.min.css"
import { SUPPORTED_LANGUAGES, LANGUAGE_CLASS } from "@data/languages"
import { useState } from "react"
import useApp from "@lib/useApp"


const LanguageSelector = () => {
    const { language, setLanguage } = useApp()

    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    return (
        <div className="relative z-50 flex flex-row gap-4">
            <button onClick={() => setShowDropdown(!showDropdown)}>
                <span className={`fi fi-${LANGUAGE_CLASS[language]}`}></span>
            </button>
            { showDropdown && (
                <div className="flex flex-row gap-2">
                    {
                        SUPPORTED_LANGUAGES.map((lang) => {
                            return (
                                <button
                                    className="cursor-pointer pointer-events-auto z-50"
                                    onClick={() => {
                                        setLanguage(lang)
                                        setShowDropdown(false)
                                    }}
                                    >
                                    <span className={`fi fi-${LANGUAGE_CLASS[lang]}`}></span>
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