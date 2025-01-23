import { PokeTypeData } from "@data/types";
import TypeIcon from "@components/TypeIcon";

interface DualTypeButtonProps {
    selectedType: PokeTypeData | null
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

const DualTypeButton = ({
    selectedType,
    className,
    style,
    onClick
}: DualTypeButtonProps) => {

    return (
        <button 
            className={className}
            style={style}
            onClick={onClick}
            >
            <div 
                className="w-full h-full rounded-full border-4 border-slate-100 pointer-events-auto flex items-center justify-center"
                style={{
                    backgroundColor: selectedType?.color ?? "white"
                }}
                >
                    { selectedType ? (
                        <TypeIcon type={selectedType.name} className="text-white w-3/4" />
                    ) : (
                        <span className="text-black text-[100%]">?</span>
                    )
                }
            </div>
        </button>
    )
}

export default DualTypeButton