import useApp from '@lib/useApp'
import { Pokemon, PokeType } from "@lib/types"
import TYPE_NAMES from "@data/languages"
import { getDataFromType } from "@data/types"

export interface PokemonCardProps {
    pokemon: Pokemon,
    onClick: (pokemon: Pokemon) => void
}

const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {

    const { language } = useApp();

    const translatedTypeNames: string[] = []
    pokemon.types.forEach((type: PokeType) => {
        translatedTypeNames.push(TYPE_NAMES[type][language])
    })

    return (
        <button 
            onClick={() => onClick(pokemon)} 
            className="w-full h-20 flex items-center cursor-pointer rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" 
            >
            <img 
                src={pokemon.sprites.front_default}
                className="w-16 h-16 ml-4"
                />
            <div className="ml-4 text-left">
                <p className="text-lg font-bold text-black dark:text-white">
                    { language === "en" ? pokemon.name : pokemon.names[language] }
                </p>
                <div className="flex gap-1">
                    {
                        pokemon.types.map((type: PokeType) => {
                            const typeData = getDataFromType(type)
                            return (
                                <span 
                                    className="inline-block px-1 text-xs text-white dark:text-black rounded font-bold"
                                    style={{
                                        backgroundColor: typeData.color
                                    }}
                                    >
                                    {
                                        TYPE_NAMES[type][language]
                                    }
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </button>
    )
}

export default PokemonCard