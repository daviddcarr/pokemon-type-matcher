import classNames from "classnames"
import { PokeTypeData } from "../data/types"
import { getIdFromType } from "../data/types"
import { BattlePositions, DamageTypes } from "../lib/types"
import { GiPlayButton, GiCancel } from "react-icons/gi";

export type PointerProps = {
    type: PokeTypeData,
    radius: number,
    position: BattlePositions,
    damageType: DamageTypes
}

const COLOR_MAP: Record<DamageTypes, string> = {
    "double": "#00BF00",
    "half": "#7E1C00",
    "no": "#000000"
}

const Pointer = ({ type, radius, position, damageType }: PointerProps) => {
    return (
         <div 
            className={classNames(
                "w-0 absolute bottom-full origin-bottom transition-transform pointer-events-none"
            )} 
            style={{ 
                height: `${radius * 0.8}px`,
                transform: `rotate(${ (getIdFromType(type.name) - 1) * 20}deg)`,
                }}>
                    <div className="">
                        <div 
                            className="rounded-full bg-white font-bold flex items-center justify-center"
                            style={{
                                width: `${radius * 0.1}px`,
                                height: `${radius * 0.1}px`,
                                fontSize: `${radius * 0.035}px`,
                                color: COLOR_MAP[damageType],
                                transform: `translateX(-50%) rotate(-${ (getIdFromType(type.name) - 1) * 20}deg)`,
                            }}
                            >
                            {
                                damageType === "double" ? 'x2' :
                                damageType === "half" ? 'x0.5' :
                                'x0'
                            }
                        </div>

                    {
                        damageType !== "no" ? (
                            <>
                                <GiPlayButton
                                    className="relative"
                                    style={{
                                        transform: position === "to" ? "translateX(-50%) rotate(-90deg)" : "translateX(-50%) rotate(90deg)",
                                        color: COLOR_MAP[damageType],
                                        fontSize: `${radius * 0.1}px`,
                                    }}
                                    />
                                <GiPlayButton
                                    className="relative"
                                    style={{
                                        transform: position === "to" ? "translateX(-50%) rotate(-90deg)" : "translateX(-50%) rotate(90deg)",
                                        color: COLOR_MAP[damageType],
                                        fontSize: `${radius * 0.1}px`,
                                    }}
                                    />
                            </>
                        ) : (
                            <GiCancel
                                className="relative -translate-x-1/2 translate-y-1 "
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