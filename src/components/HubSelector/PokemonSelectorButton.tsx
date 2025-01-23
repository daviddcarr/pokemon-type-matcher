import { Pokemon } from "@lib/types";
import silhoette from "@assets/icons/silhoette.svg"

interface PokemonSelectorButtonProps {
    selectedPokemon: Pokemon | null
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

const PokemonSelectorButton = ({
    selectedPokemon,
    className,
    style,
    onClick
}: PokemonSelectorButtonProps) => {

    return (
        <button 
            className={className}
            style={style}
            onClick={onClick}
            >
            <div 
                className="w-full h-full rounded-full border-[3px] border-slate-100 dark:border-slate-800 bg-white pointer-events-auto flex items-center justify-center"
                >
                    { selectedPokemon ? (
                        <img src={selectedPokemon?.sprites.front_default ?? ""} className="max-w-full max-h-full" />
                    ) : (
                        <img src={silhoette} className="max-w-full max-h-full object-contain w-[65%] h-[65%]" />
                    )
                }
            </div>
        </button>
    )
}

export default PokemonSelectorButton