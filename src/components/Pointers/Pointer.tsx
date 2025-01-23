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
    "quadruple": "#00BF00",
    "double": "#00BF00",
    "half": "#7E1C00",
    "quarter": "#7E1C00",
    "no": "#000000"
}

const TEXT_COLOR_MAP: Record<DualDamageTypes, string> = {
    "quadruple": "text-[#00BF00] dark:text-[#00FF00]",
    "double": "text-[#00BF00] dark:text-[#00FF00]",
    "half": "text-[#7E1C00] dark:text-[#FF4444]",
    "quarter": "text-[#7E1C00] dark:text-[#FF4444]",
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
                                        className="relative pointer-events-none"
                                        style={{
                                            transform: position === "to" ? "translateX(-50%) rotate(-90deg)" : "translateX(-50%) rotate(90deg)",
                                            color: COLOR_MAP[damageType],
                                            fontSize: `${radius * 0.1}px`,
                                        }}
                                        />
                                    { (damageType === "quadruple" || damageType === "quarter") && (
                                        <GiPlayButton
                                            className="relative pointer-events-none"
                                            style={{
                                                transform: position === "to" ? "translateX(-50%) translateY(-20px) rotate(-90deg)" : "translateX(-50%) translateY(-20px) rotate(90deg)",
                                                color: COLOR_MAP[damageType],
                                                fontSize: `${radius * 0.1}px`,
                                            }}
                                        />
                                    )} 
                                </>
                            ) : (
                                <GiCancel
                                    className="relative pointer-events-none -translate-x-1/2 translate-y-1"
                                    style={{
                                        color: COLOR_MAP[damageType],
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