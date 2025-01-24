import useApp from "@lib/useApp";
import silhoette from "@assets/icons/silhoette.svg"

interface PokemonSelectorButtonProps {
    className?: string
    style?: React.CSSProperties
}

const PokemonSelectorButton = ({
    className,
    style,
}: PokemonSelectorButtonProps) => {

    const { selectedPokemon, setShowPokemonSelector } = useApp()
 
    return (
        <button 
            className={className}
            style={style}
            onClick={() => setShowPokemonSelector(true)}
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