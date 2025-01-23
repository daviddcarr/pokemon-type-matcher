import classNames from "classnames"

import ALL_POKE_TYPES from "@data/types"
import { BattlePositions, Pokemon, PokeTypeData } from "@lib/types"

import TypeIcon from "@components/TypeIcon"
import BattlePositionButton from "@components/HubSelector/BattlePositionButton"
import DualTypeButton from "@components/HubSelector/DualTypeButton"
import PokemonSelectorButton from "./PokemonSelectorButton"

export interface HubSelectorProps {
    radius: number,
    selectedType: PokeTypeData,
    selectedDualType: PokeTypeData | null,
    battlePosition: BattlePositions,
    setBattlePosition: (battlePosition: BattlePositions) => void,
    parentMounted: boolean,
    showDualTypeSelector: () => void,
    selectedPokemon: Pokemon | null,
    showPokemonSelector: () => void
}

const HubSelector = ({
    radius,
    selectedType,
    selectedDualType,
    battlePosition,
    setBattlePosition,
    parentMounted,
    showDualTypeSelector,
    selectedPokemon,
    showPokemonSelector
}: HubSelectorProps) => {

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

                { radius > 300 && (

                    <>
                        <div 
                            className={classNames(
                                "w-0 z-40 absolute left-1/2 origin-bottom transition-transform",
                                parentMounted ? "rotate-[235deg]" : "rotate-180"
                            )}
                            style={{
                                height: `${radius * 0.18}px`
                            }}
                            >
                            <BattlePositionButton
                                battlePosition={battlePosition}
                                className={classNames(
                                    "left-0 coin-flip-container z-30 -translate-x-1/2",
                                    parentMounted ? "-rotate-[235deg]" : "-rotate-180"
                                )}
                                style={{
                                    height: `${radius * 0.1}px`,
                                    width: `${radius * 0.1}px`,
                                }}
                                onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
                            />
                        </div>
                        { battlePosition === "from" && (
                            <div 
                                className={classNames(
                                    "w-0 z-40 absolute left-1/2 origin-bottom transition-transform",
                                    parentMounted ? "rotate-[125deg]" : "rotate-180"
                                )}
                                style={{
                                    height: `${radius * 0.18}px`
                                }}
                                >
                                <DualTypeButton
                                    selectedType={selectedDualType}
                                    className={classNames(
                                        "-translate-x-1/2 left-0 z-30",
                                        parentMounted ? "-rotate-[125deg]" : "-rotate-180"
                                    )}
                                    style={{
                                        height: `${radius * 0.1}px`,
                                        width: `${radius * 0.1}px`,
                                    }}
                                    onClick={showDualTypeSelector}
                                    />
                            </div>
                        )}
                        <div 
                            className={classNames(
                                "w-0 z-40 absolute left-1/2 origin-bottom transition-transform",
                                parentMounted ? battlePosition === "from" ? "rotate-180" : "rotate-[125deg]" : "rotate-180"
                            )}
                            style={{
                                height: `${radius * 0.18}px`
                            }}
                            >
                            <PokemonSelectorButton
                                selectedPokemon={selectedPokemon}
                                className={classNames(
                                    "-translate-x-1/2 left-0 z-30",
                                    parentMounted ? battlePosition === "from" ? "-rotate-180" : "-rotate-[125deg]" : "-rotate-180"

                                )}
                                style={{
                                    height: `${radius * 0.1}px`,
                                    width: `${radius * 0.1}px`,
                                }}
                                onClick={showPokemonSelector}
                                />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default HubSelector