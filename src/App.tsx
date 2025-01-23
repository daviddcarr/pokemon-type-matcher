import { useState, useRef, useEffect } from "react"

import pokeTypes from "@data/types"
import BattlePositionButton from "@components/HubSelector/BattlePositionButton"
import DualTypeButton from "@components/HubSelector/DualTypeButton"
import { BattlePositions, Pokemon, PokeTypeData } from "@lib/types"
import TypeCircle from "@components/TypeCircle"
import HubSelector from "@components/HubSelector"
import Pointers from "@components/Pointers"
import DualTypeSelector from "@components/DualTypeSelector"
import PokemonSelector from "@components/PokemonSelector"
import PokemonSelectorButton from "@components/HubSelector/PokemonSelectorButton"

function App() {
  // State Handlers, (Should probably move to singleton)
  const [ selectedType, setSelectedType] = useState<PokeTypeData>(pokeTypes[0])
  const [ selectedDualType, setSelectedDualType] = useState<PokeTypeData|null>(pokeTypes[1])
  const [ battlePosition, setBattlePosition] = useState<BattlePositions>("to")
  const [ showDualTypeSelector, setShowDualTypeSelector ] = useState(false)
  const [ showPokemonSelector, setShowPokemonSelector ] = useState(false)
  const [ selectedPokemon, setSelectedPokemon ] = useState<Pokemon|null>(null)

  // Resize observer to control scale of type circle
  const [ radius, setRadius ] = useState<number>(2);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        console.log(width, height)
        setRadius(Math.min(width, height) * 0.4);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Component mounted state for intro animations
  const [componentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    setComponentMounted(true);
  }, [])
  

  // Change Handlers
  const handleTypeSelect = (type: PokeTypeData) => {
    setSelectedType(type)
    if (selectedPokemon?.types[0] !== type.name) {
      setSelectedPokemon(null)
    }
  }

  const handleDualTypeSelect = (type: PokeTypeData | null) => {
    // Set type unless it's the same as the currently selected primary type
    if (type !== selectedType)
      setSelectedDualType(type)
    else 
      setSelectedDualType(null)

    if (selectedPokemon?.types[1] !== type?.name) {
      setSelectedPokemon(null)
    }

    setShowDualTypeSelector(false)
  }

  const handlePokemonSelect = (pokemon: Pokemon | null) => {
    setSelectedPokemon(pokemon)
    if (pokemon) {
      setSelectedType(pokeTypes.find(type => type.name === pokemon.types[0])!)
      setSelectedDualType(pokeTypes.find(type => type.name === pokemon.types[1]) || null)
    }
    setShowPokemonSelector(false)
  }

  return (
    <main className="absolute inset-0 h-full w-full bg-slate-100 dark:bg-slate-800">


      <div className="relative w-full grid grid-rows-[1fr_auto] h-full">
        <div className="relative w-full flex items-center justify-center p-4">
          <div 
            ref={containerRef}
            className="circle-container w-full h-full relative flex items-center justify-center">
            <div
              className="relative"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`
              }}>

              {/* Selected Type & Battle Position */}
              <div className="w-full h-full absolute inset-0 pointer-events-none">
                <HubSelector
                  radius={radius}
                  selectedType={selectedType}
                  battlePosition={battlePosition}
                  setBattlePosition={setBattlePosition}
                  parentMounted={componentMounted}
                  selectedDualType={selectedDualType}
                  showDualTypeSelector={() => setShowDualTypeSelector(true)}
                  selectedPokemon={selectedPokemon}
                  showPokemonSelector={() => setShowPokemonSelector(true)}
                />
              </div>

              {/* Pointers */}
              <div className="w-full h-full absolute inset-0 pointer-events-none z-10">
                <Pointers
                  radius={radius}
                  selectedType={selectedType}
                  selectedDualType={selectedDualType}
                  battlePosition={battlePosition}
                  parentMounted={componentMounted}
                  />
              </div>

              {/* Type Circle */}
              <div className="w-full h-full absolute inset-0 pointer-events-none">
                <TypeCircle
                  radius={radius}
                  selectedType={selectedType}
                  onChange={handleTypeSelect}
                  />
              </div>


            </div>
          </div>
        </div>
        <div className="relative w-full flex items-center justify-center p-4 z-0">
          {
            radius <= 300 && (
              <>
                <BattlePositionButton
                  battlePosition={battlePosition}
                  className="h-16 w-16" 
                  onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
                  />
                <PokemonSelectorButton
                  selectedPokemon={selectedPokemon}
                  className="h-16 w-16" 
                  onClick={() => setShowPokemonSelector(true)}
                  />
                {
                  battlePosition === "from" && (
                    <DualTypeButton
                      selectedType={selectedDualType}
                      className="h-16 w-16" 
                      onClick={() => setShowDualTypeSelector(true)}
                      />
                  )
                }
              </>
            )
          }
        </div>
      </div>

      {
        showDualTypeSelector && (
          <DualTypeSelector
            onChange={handleDualTypeSelect}
            />
        )
      }

      {
        showPokemonSelector && (
          <PokemonSelector 
            onChange={handlePokemonSelect}
            />
        )
      }

    </main>
  )
}

export default App
