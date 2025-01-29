import classNames from "classnames"

import ALL_POKE_TYPES from "@data/types"
import { PokeTypeData } from "@lib/types"
import useStyles from "@lib/useStyles"

import TypeIcon from "@components/TypeIcon"

export interface TypeSelectorProps {
    onChange: (type: PokeTypeData | null) => void,
    selectedType: PokeTypeData | null
}


const TypeSelector = ({
    onChange,
    selectedType
}: TypeSelectorProps) => {

    const styles = useStyles()

    const animationStyles: React.CSSProperties = {
        animationName: "scaleWave",
        animationDuration: "10s",
        animationIterationCount: "infinite"
    }

    return (
        <>
            <div className="absolute inset-0 w-full h-full grid grid-cols-3 z-40 gap-1">
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
                                <TypeIcon type={type.name} className="text-white w-8" />
                            </button>
                        )
                    })
                }
                <button className={classNames(
                        styles.headingFont,
                        "col-span-3 w-full h-full flex items-center justify-center bg-white"
                    )}
                    onClick={() => onChange(null)}
                    >
                    None
                </button>

            </div>
        </>
    )
}

export default TypeSelector