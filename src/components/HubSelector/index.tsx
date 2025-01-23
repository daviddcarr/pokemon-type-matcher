import classNames from "classnames"

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
                    "absolute rounded-full h-full w-full z-20 border-4 origin-center border-slate-100 flex items-center justify-center transition-transform",
                    parentMounted ? 'scale-100' : 'scale-0'
                )}
                style={{
                    backgroundColor: selectedType.color,
                    transitionDelay: `${pokeTypes.length * 10}ms`,
                }}
                >
                        <TypeIcon type={selectedType.name} className="w-1/2 h-1/2 object-contain" />
                
                { radius > 300 && (
                    <BattlePositionButton
                    battlePosition={battlePosition}
                    className={classNames(
                    "absolute -bottom-1 left-0 coin-flip-container",
                    )}
                    style={{
                    height: `${radius * 0.1}px`,
                    width: `${radius * 0.1}px`,
                    }}
                    onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
                    />
                )}
                </div>
            </div>
        </>
    )
}

export default HubSelector