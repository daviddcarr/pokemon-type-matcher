import { GiCrossedSwords, GiVibratingShield } from "react-icons/gi";

import { BattlePositions } from "@lib/types"

interface BattlePositionButtonProps {
    battlePosition: BattlePositions
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

const BattlePositionButton = ({
    battlePosition,
    className,
    style,
    onClick
}: BattlePositionButtonProps) => {

    return (
        <button 
            className={className}
            style={style}
            onClick={onClick}
            >
            <div className="coin-flip-inner w-full h-full transition-transform"
                style={{
                transform: battlePosition === "to" ? "rotateY(0deg)" : "rotateY(180deg)"
                }}
                >
                <div className="coin-face face-front h-full w-full bg-red-400 rounded-full border-4 border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                <GiCrossedSwords className="text-white text-[100%]" />
                </div>
                <div className="coin-face face-back rotate h-full w-full bg-blue-400 rounded-full border-4 border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                <GiVibratingShield className="text-white text-[100%]" />
                </div>
            </div>
        </button>
    )
}

export default BattlePositionButton