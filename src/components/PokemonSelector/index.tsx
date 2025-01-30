import { useState } from "react"

import { Pokemon } from "@lib/types"
import useApp from '@lib/useApp'
import useStyles from "@lib/useStyles"
import useLanguage from "@lib/useLanguage"
import POKEMON from "@data/pokemon"
import ALL_POKE_TYPES from "@data/types"

import PokemonCard from "./PokemonCard"
import classNames from "classnames"
import MobileSpacer from "@components/MobileSpacer"


const PokemonSelector = () => {

    const { 
        selectedPokemon,
        setSelectedPokemon, 
        setSelectedType, 
        setSelectedDualType, 
        setShowPokemonSelector } = useApp()

    const styles = useStyles()
    const { close } = useLanguage()

    const [ filteredPokemon, setFilteredPokemon ] = useState<Pokemon[]>(POKEMON)

    const handleSearch = (searchTerm: string) => {
        if ( !searchTerm || searchTerm.length < 3 ) {
            setFilteredPokemon(POKEMON)
            return
        }

        const lowerTerm = searchTerm.toLocaleLowerCase()


        const filtered: Pokemon[] = POKEMON.filter(pokemon => {
            if (pokemon.name.toLowerCase().includes(lowerTerm)) {
                return true;
            }

            if (pokemon.names) {
                const matchesAnyLang = Object.values(pokemon.names).some((localizedName) =>
                  localizedName.toLowerCase().includes(lowerTerm)
                );
                if (matchesAnyLang) {
                  return true;
                }
              }

            return false;
        })
        setFilteredPokemon(filtered)
    }


    const handlePokemonSelect = (pokemon: Pokemon | null) => {
        setSelectedPokemon(pokemon)
        if (pokemon) {
        setSelectedType(ALL_POKE_TYPES.find(type => type.name === pokemon.types[0])!)
        setSelectedDualType(ALL_POKE_TYPES.find(type => type.name === pokemon.types[1]) || null)
        }
        setShowPokemonSelector(false)
    }

    return (
        <div className="absolute inset-0 w-full h-full z-40 grid grid-rows-[auto,1fr,auto] bg-white dark:bg-slate-900">
            {/* Search Input */}
            <div className="w-full">
                <input 
                    type="text"
                    placeholder="Search..."
                    className="w-full p-4 border-b-2 border-slate-200 dark:border-slate-950 bg-white dark:bg-slate-700 text-black dark:text-white"
                    onChange={(e) => handleSearch(e.target.value)}
                    />
            </div>

            {/* Pokemon List */}
            <div className="overflow-y-scroll h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-min p-2 gap-1">
                {
                    filteredPokemon.map((pokemon, i) =>
                        <PokemonCard
                            key={i}
                            pokemon={pokemon}
                            onClick={() => handlePokemonSelect(pokemon)}
                            isActive={selectedPokemon === pokemon}
                            className={selectedPokemon === pokemon ? "order-0" : "order-1"}
                            />
                    )
                }
                </div>
            </div>

            {/* Close Button */}
            <div className="w-full">
                <button 
                    className={classNames(
                        styles.headingFont,
                        "w-full p-4 border-t-2 border-slate-200 dark:border-slate-950 bg-white dark:bg-slate-700 text-black dark:text-white"
                    )}
                    onClick={() => handlePokemonSelect(null)}
                    >
                    { close }
                </button>

                <MobileSpacer />
            </div>
        </div>
    )
}

export default PokemonSelector