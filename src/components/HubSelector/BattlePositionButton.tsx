import { GiCrossedSwords, GiVibratingShield } from "react-icons/gi";

import useApp from "@lib/useApp"

interface BattlePositionButtonProps {
    className?: string
    style?: React.CSSProperties
}

const BattlePositionButton = ({
    className,
    style,
}: BattlePositionButtonProps) => {

    const { battlePosition, setBattlePosition } = useApp()

    return (
        <button 
            className={className}
            style={style}
            onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
            >
            <div className="coin-flip-inner w-full h-full transition-transform"
                style={{
                transform: battlePosition === "to" ? "rotateY(0deg)" : "rotateY(180deg)"
                }}
                >
                <div className="coin-face face-front h-full w-full bg-red-400 rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                    <GiCrossedSwords className="text-white text-[2rem]" />
                </div>
                <div className="coin-face face-back rotate h-full w-full bg-blue-400 rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                    <GiVibratingShield className="text-white text-[2rem]" />
                </div>
            </div>
        </button>
    )
}

export default BattlePositionButton