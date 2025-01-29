import classNames from 'classnames'
import useApp from '@lib/useApp'
import useStyles from "@lib/useStyles"
import { Pokemon, PokeType } from "@lib/types"
import TYPE_NAMES from "@data/languages"
import { getDataFromType } from "@data/types"

export interface PokemonCardProps {
    pokemon: Pokemon,
    onClick: (pokemon: Pokemon) => void,
    isActive: boolean,
    className?: string
}

const PokemonCard = ({ pokemon, onClick, isActive, className }: PokemonCardProps) => {

    const { language } = useApp()
    const styles = useStyles()

    const translatedTypeNames: string[] = []
    pokemon.types.forEach((type: PokeType) => {
        translatedTypeNames.push(TYPE_NAMES[type][language])
    })

    return (
        <button 
            onClick={() => onClick(pokemon)} 
            className={classNames(
                "w-full h-20 flex items-center cursor-pointer rounded-md",
                className,
                isActive ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"
            )} 
            >
            <img 
                src={pokemon.sprites.front_default}
                className="w-16 h-16 ml-4"
                />
            <div className="ml-4 text-left">
                <p className={classNames(
                    styles.headingFont,
                    "text-lg font-bold text-black dark:text-white capitalize"
                    )}>
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