import { useState } from "react"

import { Pokemon, PokeType } from "@lib/types"

import POKEMON from "@data/pokemon"
import TYPE_NAMES from "@data/typeNames"

import useApp from '@lib/useApp'
import ALL_POKE_TYPES from "@data/types"


const PokemonSelector = () => {

    const { 
        language,
        setSelectedPokemon, 
        setSelectedType, 
        setSelectedDualType, 
        setShowPokemonSelector } = useApp()

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-min">
                {
                    filteredPokemon.map((pokemon, i) => {
                        
                        const translatedTypeNames: string[] = []
                        pokemon.types.forEach((type: PokeType) => {
                            translatedTypeNames.push(TYPE_NAMES[type][language])
                        })

                        return (
                        <button 
                            key={i}
                            onClick={() => handlePokemonSelect(pokemon)} 
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
                                <p className="text-sm text-gray-500">{translatedTypeNames.join(", ")}</p>
                            </div>
                        </button>
                    )
                })
                }
                </div>
            </div>

            {/* Close Button */}
            <div className="w-full">
                <button 
                    className="w-full p-4 border-t-2 border-slate-200 dark:border-slate-950 bg-white dark:bg-slate-700 text-black dark:text-white"
                    onClick={() => handlePokemonSelect(null)}
                    >
                    Close
                </button>
            </div>
        </div>
    )
}

export default PokemonSelector