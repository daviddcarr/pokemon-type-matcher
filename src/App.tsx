import { useState, useRef, useEffect } from "react"
import classNames from "classnames"

import pokeTypes from "@data/types"
import BattlePositionButton from "@components/HubSelector/BattlePositionButton"
import TypeButton from "@components/HubSelector/TypeButton"
import { BattlePositions, Pokemon, PokeTypeData } from "@lib/types"
import TypeCircle from "@components/TypeCircle"
import HubSelector from "@components/HubSelector"
import Pointers from "@components/Pointers"
import TypeSelector from "@components/TypeSelector"
import PokemonSelector from "@components/PokemonSelector"
import PokemonSelectorButton from "@components/HubSelector/PokemonSelectorButton"

function App() {
  // State Handlers, (Should probably move to singleton)
  const [ selectedType, setSelectedType] = useState<PokeTypeData>(pokeTypes[0])
  const [ selectedDualType, setSelectedDualType] = useState<PokeTypeData|null>(pokeTypes[1])
  const [ battlePosition, setBattlePosition] = useState<BattlePositions>("to")
  const [ showTypeSelector, setShowTypeSelector ] = useState(false)
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
  const handleTypeSelect = (type: PokeTypeData | null) => {
    console.log("type", type)
    if (type) {
      setSelectedType(type)
      if (selectedDualType === type) setSelectedDualType(null)
      if (selectedPokemon?.types[0] !== type.name) {
        setSelectedPokemon(null)
      }
    }
    setShowTypeSelector(false)
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
                  parentMounted={componentMounted}
                  selectedDualType={selectedDualType}
                  showDualTypeSelector={() => setShowDualTypeSelector(true)}
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
        <div className={classNames(
          "relative w-full flex items-center justify-between p-4 z-0 bg-slate-200 dark:bg-slate-900"
          )}
          >
            <div className="flex">
              <PokemonSelectorButton
                selectedPokemon={selectedPokemon}
                className="h-16 w-16" 
                onClick={() => {
                  console.log("Hello world")
                  setShowPokemonSelector(true)
                }}
                />

              <TypeButton
                selectedType={selectedType}
                className="h-16 w-16"
                onClick={() => setShowTypeSelector(true)}
                />
                { battlePosition === "from" && (
                  <TypeButton
                    selectedType={selectedDualType}
                    className="h-16 w-16" 
                    onClick={() => setShowDualTypeSelector(true)}
                    />
                )}
              </div>
              <BattlePositionButton
                battlePosition={battlePosition}
                className="h-16 w-16" 
                onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
                />


        </div>
      </div>

      {
        (showTypeSelector || showDualTypeSelector || showPokemonSelector) && (
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 bg-opacity-60 z-10 flex items-center justify-center z-40">

              {
                showTypeSelector && (
                  <div className="w-full h-full md:max-w-80 md:max-h-[80vh] relative md:rounded-md overflow-hidden">
                    <TypeSelector
                      onChange={handleTypeSelect}
                      />
                  </div>
                )
              }

              {
                showDualTypeSelector && (
                  <div className="w-full h-full md:max-w-80 md:max-h-[80vh] relative md:rounded-md overflow-hidden">
                    <TypeSelector
                      onChange={handleDualTypeSelect}
                      />
                  </div>
                )
              }
        
              {
                showPokemonSelector && (
                  <div className="w-full h-full md:max-w-[80vw] md:max-h-[80vh] relative">
                    <PokemonSelector 
                      onChange={handlePokemonSelect}
                      />
                  </div>
                )
              }
          </div>
        )
      }


    </main>
  )
}

export default App
