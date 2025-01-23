import { useState } from "react"

import { Pokemon } from "@lib/types"

import allPokemon from "@data/json/pokemon.json"

export interface PokemonSelectorProps {
    onChange: (pokemon: Pokemon | null) => void
}

const PokemonSelector = ({
    onChange
}: PokemonSelectorProps) => {

    const [ filteredPokemon, setFilteredPokemon ] = useState<Pokemon[]>(allPokemon)

    const handleSearch = (searchTerm: string) => {
        if ( !searchTerm || searchTerm.length < 3 ) {
            setFilteredPokemon(allPokemon)
            return
        }
        const filtered = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPokemon(filtered)
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
                    filteredPokemon.map((pokemon, i) => (
                        <button 
                            key={i}
                            onClick={() => onChange(pokemon)} 
                            className="w-full h-20 flex items-center cursor-pointer rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" 
                            >
                            <img 
                                src={pokemon.sprites.front_default}
                                className="w-16 h-16 ml-4"
                                />
                            <div className="ml-4 text-left">
                                <p className="text-lg font-bold text-black dark:text-white">{pokemon.name}</p>
                                <p className="text-sm text-gray-500">{pokemon.types.join(", ")}</p>
                            </div>
                        </button>
                    ))
                }
                </div>
            </div>

            {/* Close Button */}
            <div className="w-full">
                <button 
                    className="w-full p-4 border-t-2 border-slate-200 dark:border-slate-950 bg-white dark:bg-slate-700 text-black dark:text-white"
                    onClick={() => onChange(null)}
                    >
                    Close
                </button>
            </div>
        </div>
    )
}

export default PokemonSelector