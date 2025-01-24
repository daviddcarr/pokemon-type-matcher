import classNames from "classnames"
import { GiPlayButton, GiCancel } from "react-icons/gi";

import pokeTypes, { getIdFromType } from "@data/types"
import { BattlePositions, DualDamageTypes, PokeTypeData } from "@lib/types"


export type PointerProps = {
    type: PokeTypeData,
    radius: number,
    position: BattlePositions,
    damageType: DualDamageTypes,
    parentMounted: boolean,
}

const COLOR_MAP: Record<DualDamageTypes, string> = {
    "quadruple": "text-[#9dea9d] dark:text-[#0c5f0c]",
    "double": "text-[#9dea9d] dark:text-[#0c5f0c]",
    "half": "text-[#ff3b00] dark:text-[#6b1800]",
    "quarter": "text-[#ff3b00] dark:text-[#6b1800]",
    "no": "text-[#000000]"
}

const TEXT_COLOR_MAP: Record<DualDamageTypes, string> = {
    "quadruple": "text-[#00BF00] dark:text-[#00FF00]",
    "double": "text-[#00BF00] dark:text-[#00FF00]",
    "half": "text-[#7E1C00] dark:text-[#ff8d8d]",
    "quarter": "text-[#7E1C00] dark:text-[#ff8d8d]",
    "no": "text-[#000000] dark:text-[#FFFFFF]"
}

const Pointer = ({ type, radius, position, damageType, parentMounted }: PointerProps) => {

    return (
         <div 
            className={classNames(
                "w-0 absolute bottom-full origin-bottom transition-transform pointer-events-none"
            )} 
            style={{ 
                perspective: "1000px",
                height: `${radius * 0.8}px`,
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
                        <div 
                            className={classNames(
                                "rounded-full bg-white dark:bg-slate-800 font-bold flex items-center justify-center pointer-events-none tracking-tighter",
                                TEXT_COLOR_MAP[damageType]
                            )}
                            style={{
                                width: `${radius * 0.1}px`,
                                height: `${radius * 0.1}px`,
                                fontSize: `${radius * 0.03}px`,
                                transform: `translateX(-50%) rotate(-${ (getIdFromType(type.name) - 1) * 20}deg)`,
                            }}
                            >
                            {   
                                damageType === "quadruple" ? 'x4' :
                                damageType === "double" ? 'x2' :
                                damageType === "half" ? 'x0.5' :
                                damageType === "quarter" ? 'x0.25' :
                                'x0'
                            }
                        </div>

                        {
                            damageType !== "no" ? (
                                <>
                                    <GiPlayButton
                                        className={classNames(
                                            "relative pointer-events-none",
                                            COLOR_MAP[damageType]
                                        )}
                                        style={{
                                            transform: `translateX(-50%) ${position === "to" ? "rotate(-90deg)" : "rotate(90deg)"}`,
                                            fontSize: `${radius * 0.1}px`,
                                        }}
                                        />
                                    { (damageType === "quadruple" || damageType === "quarter") && (
                                        <GiPlayButton
                                            className={classNames(
                                                "relative pointer-events-none",
                                                COLOR_MAP[damageType]
                                            )}
                                            style={{
                                                transform: position === "to" ? "translateX(-50%) translateY(-60%) rotate(-90deg)" : "translateX(-50%) translateY(-60%) rotate(90deg)",
                                                fontSize: `${radius * 0.1}px`,
                                            }}
                                        />
                                    )} 
                                </>
                            ) : (
                                <GiCancel
                                    className={classNames(
                                        "relative pointer-events-none -translate-x-1/2 translate-y-1",
                                        COLOR_MAP[damageType]
                                    )}
                                    style={{
                                        fontSize: `${radius * 0.1}px`,
                                    }}
                                    />
                            )
                        }
                    </div>
        </div>
    )
}

export default Pointer