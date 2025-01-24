import { PokeTypeData } from "@lib/types";
import TypeIcon from "@components/TypeIcon";

interface TypeButtonProps {
    selectedType: PokeTypeData | null
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

const TypeButton = ({
    selectedType,
    className,
    style,
    onClick
}: TypeButtonProps) => {

    return (
        <button 
            className={className}
            style={style}
            onClick={onClick}
            >
            <div 
                className="w-full h-full rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center"
                style={{
                    backgroundColor: selectedType?.color ?? "white"
                }}
                >
                    { selectedType ? (
                        <TypeIcon type={selectedType.name} className="text-white w-[65%]" />
                    ) : (
                        <span className="text-black text-xl relative -top-[2px] font-bold">+</span>
                    )
                }
            </div>
        </button>
    )
}

export default TypeButton