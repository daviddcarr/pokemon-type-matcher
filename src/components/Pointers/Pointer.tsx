import classNames from "classnames"

import pokeTypes, { getIdFromType } from "@data/types"
import { BattlePositions, DualDamageTypes, PokeTypeData } from "@lib/types"
import PointerIcon from "./PointerIcon";


export type PointerProps = {
    type: PokeTypeData,
    radius: number,
    position: BattlePositions,
    damageType: DualDamageTypes,
    parentMounted: boolean,
}

const Pointer = ({ type, radius, position, damageType, parentMounted }: PointerProps) => {

    const vertical_damage_icons: DualDamageTypes[] = ["half", "quarter", "no"]

    const rotation = vertical_damage_icons.includes(damageType) 
        ? `rotate(-${(getIdFromType(type.name) - 1) * 20}deg)` 
        : position === "to" ? "rotate(0deg)" : "rotate(180deg)"

    return (
         <div 
            className={classNames(
                "w-0 absolute bottom-full origin-bottom transition-transform pointer-events-none"
            )} 
            style={{ 
                perspective: "1000px",
                height: `${radius * 0.7}px`,
                transform: `rotate(${ (getIdFromType(type.name) - 1) * 20}deg)`,
                }}>
                    <div
                        className={classNames(
                            "coin-flip-inner transition-transform"
                        )}
                        style={{
                            transformStyle: "preserve-3d",
                            position: "relative",
                            transform: parentMounted ? "rotateY(0deg)" : "rotateY(90deg)",
                            transitionDelay: `${(pokeTypes.length + 10) * 10}ms`,
                        }}>
                        <PointerIcon
                            damageType={damageType}
                            className="-translate-x-1/2 fill-white dark:fill-slate-900"
                            style={{
                                transform: `translateX(-50%) ${rotation}`,
                                width: `${radius * 0.07}px`
                            }}
                            />

                        { damageType !== "double" && damageType !== "quadruple" && (
                            <PointerIcon
                                damageType={"double"}
                                className="translate-x-1/2 fill-white dark:fill-slate-900"
                                style={{
                                    transform: `translateX(-50%) translateY(5px) ${position === "to" ? "rotate(0deg)" : "rotate(180deg)"}`,
                                    width: `${radius * 0.03}px`
                                }}
                                />
                        )}

                    </div>
        </div>
    )
}

export default Pointer