import classNames from "classnames"

import ALL_POKE_TYPES from "@data/types"
import useApp from "@lib/useApp"

import TypeIcon from "@components/TypeIcon"
import TypeButton from "@components/HubSelector/TypeButton"

export interface HubSelectorProps {
    radius: number,
    parentMounted: boolean,
}

const HubSelector = ({
    radius,
    parentMounted,
}: HubSelectorProps) => {

    const { 
        selectedType, 
        selectedDualType, 
        battlePosition, 
        setShowDualTypeSelector 
    } = useApp()

    const button_distance = {
        height: `${radius * 0.25}px`
    }

    const button_dimensions = {
        height: `${radius * 0.18}px`,
        width: `${radius * 0.18}px`,
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                style={{
                width: `${radius * 0.4}px`,
                height: `${radius * 0.4}px`,                    
                }}
                >
                <div 
                    className={classNames(
                        "absolute rounded-full h-full w-full z-10 origin-center flex items-center justify-center transition-transform",
                    )}>

                    {/* Selected type */}
                    <div 
                        className={classNames(
                            "absolute rounded-full h-full w-full z-20 border-4 border-slate-100 dark:border-slate-800 origin-center flex items-center justify-center transition-transform",
                            parentMounted ? 'scale-100' : 'scale-0'
                        )}
                        style={{
                            backgroundColor: selectedType.color,
                            transitionDelay: `${ALL_POKE_TYPES.length * 10}ms`,
                        }}
                        >
                        <TypeIcon type={selectedType.name} className="w-1/2 h-1/2 object-contain" />
                    </div>

                </div>

                { battlePosition === "from" && (
                    <div 
                        className={classNames(
                            "w-0 z-40 absolute left-1/2 origin-bottom transition-transform",
                            parentMounted ? "rotate-[125deg]" : "rotate-180"
                        )}
                        style={button_distance}
                        >
                        <TypeButton
                            selectedType={selectedDualType}
                            className={classNames(
                                "-translate-x-1/2 left-0 z-30",
                                parentMounted ? "-rotate-[125deg]" : "-rotate-180"
                            )}
                            style={button_dimensions}
                            onClick={() => setShowDualTypeSelector(true)}
                            />
                    </div>
                )}

            </div>
        </>
    )
}

export default HubSelector