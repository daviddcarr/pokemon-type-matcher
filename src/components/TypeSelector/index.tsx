import classNames from "classnames"

import ALL_POKE_TYPES from "@data/types"
import { PokeTypeData } from "@lib/types"
import useStyles from "@lib/useStyles"
import useLanguage from "@lib/useLanguage"

import TypeIcon from "@components/TypeIcon"
import MobileSpacer from "@components/MobileSpacer"

export interface TypeSelectorProps {
    onChange: (type: PokeTypeData | null) => void,
    selectedType: PokeTypeData | null
}


const TypeSelector = ({
    onChange,
    selectedType
}: TypeSelectorProps) => {

    const styles = useStyles()
    const { none } = useLanguage()

    const animationStyles: React.CSSProperties = {
        animationName: "scaleWave",
        animationDuration: "10s",
        animationIterationCount: "infinite"
    }

    return (
        <>
            <div className="absolute inset-0 w-full h-full z-40 grid grid-rows-[1fr,auto]">
                <div className="grid grid-rows-[1fr,auto] p-2 gap-1">
                    <div className="w-full grid grid-cols-3 gap-1">
                        {
                            ALL_POKE_TYPES.map((type, i) => { 
                                const styles = type !== selectedType
                                    ? {
                                        ...animationStyles,
                                        animationDelay: `${i * 0.09}s`,
                                    } : {}

                                return (
                                    <button 
                                        className={classNames(
                                            "w-full h-full flex items-center justify-center rounded",
                                            type === selectedType ? "grayscale pointer-events-none" : ""
                                        )}
                                        onClick={() => onChange(type)}
                                        key={i}
                                        style={{
                                            backgroundColor: type.color,
                                            ...styles
                                        }}
                                        >
                                        <TypeIcon type={type.name} className="fill-white dark:fill-slate-900 w-8" />
                                    </button>
                                )
                            })
                        }
                    </div>
                    <button className={classNames(
                            styles.headingFont,
                            "w-full p-4 rounded border-slate-200 dark:border-slate-950 bg-white dark:bg-slate-700 text-black dark:text-white"
                        )}
                        onClick={() => onChange(null)}
                        >
                        { none }
                    </button>
                </div>

                <MobileSpacer />
            </div>
        </>
    )
}

export default TypeSelector