import classNames from "classnames"
import { useState, useRef, useEffect } from "react"

import pokeTypes, { PokeTypeData } from "@data/types"
import { BattlePositions } from "@lib/types"

import TypeIcon from "@components/TypeIcon"
import BattlePositionButton from "@components/HubSelector/BattlePositionButton"

export interface HubSelectorProps {
    radius: number,
    selectedType: PokeTypeData,
    battlePosition: BattlePositions,
    setBattlePosition: (battlePosition: BattlePositions) => void,
    parentMounted: boolean
}

const HubSelector = ({
    radius,
    selectedType,
    battlePosition,
    setBattlePosition,
    parentMounted
}: HubSelectorProps) => {

    // State management to store old type for circular swipe transition
    const [oldType, setOldType] = useState<PokeTypeData>(selectedType)
    const [showOverlay, setShowOverlay] = useState(false)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if ( selectedType.color !== oldType.color ) {
            setShowOverlay(true)
        }
    }, [selectedType.color, oldType])

    function handleOverlayTransitionEnd() {
        setShowOverlay(false)
        setOldType(selectedType)
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                style={{
                width: `${radius * 0.3}px`,
                height: `${radius * 0.3}px`,                    
                }}
                >
                <div 
                    className={classNames(
                        "absolute rounded-full h-full w-full z-10 border-4 origin-center border-slate-100 flex items-center justify-center transition-transform",
                    )}>

                    {/* Transition overlay */}
                    {showOverlay && (
                        <div
                            ref={overlayRef}
                            className="absolute rounded-full h-full w-full origin-center flex items-center justify-center transition-transform z-[21]"
                            style={{
                                backgroundColor: oldType.color,
                                clipPath: "circle(0% at 50% 50%)",
                                animation: "overlayRadial 0.5s forwards ease-in-out",
                            }}
                            onAnimationEnd={handleOverlayTransitionEnd}
                        >
                            <TypeIcon type={oldType.name} className="w-1/2 h-1/2 object-contain" />
                        </div>
                    )}

                    {/* Selected type */}
                    <div 
                        className={classNames(
                            "absolute rounded-full h-full w-full z-20 origin-center flex items-center justify-center transition-transform",
                            parentMounted ? 'scale-100' : 'scale-0'
                        )}
                        style={{
                            backgroundColor: selectedType.color,
                            transitionDelay: `${pokeTypes.length * 10}ms`,
                        }}
                        >
                        <TypeIcon type={selectedType.name} className="w-1/2 h-1/2 object-contain" />
                    </div>

                </div>

                { radius > 300 && (
                    <BattlePositionButton
                        battlePosition={battlePosition}
                        className={classNames(
                            "absolute -bottom-1 left-0 coin-flip-container z-30",
                        )}
                        style={{
                            height: `${radius * 0.1}px`,
                            width: `${radius * 0.1}px`,
                        }}
                        onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
                    />
                )}
            </div>
        </>
    )
}

export default HubSelector