import { useState, useRef, useEffect } from "react"
import classNames from "classnames"

import BattlePositionButton from "@components/HubSelector/BattlePositionButton"
import TypeButton from "@components/HubSelector/TypeButton"
import { PokeTypeData } from "@lib/types"
import TypeCircle from "@components/TypeCircle"
import HubSelector from "@components/HubSelector"
import Pointers from "@components/Pointers"
import TypeSelector from "@components/TypeSelector"
import PokemonSelector from "@components/PokemonSelector"
import PokemonSelectorButton from "@components/HubSelector/PokemonSelectorButton"
import LanguageSelector from "@components/LanguageSelector"

import useApp from "@lib/useApp"

function App() {
  // State Handlers, (Should probably move to singleton)
  const { 
    selectedType,
    selectedDualType,
    showPokemonSelector, 
    showTypeSelector, 
    showDualTypeSelector,
    battlePosition,
    selectedPokemon,
    setSelectedType,
    setSelectedDualType,
    setShowTypeSelector,
    setShowDualTypeSelector,
    setSelectedPokemon,
  } = useApp()

  // Resize observer to control scale of type circle
  const [ radius, setRadius ] = useState<number>(2);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
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

  return (
    <main className="absolute inset-0 h-full w-full bg-slate-100 dark:bg-slate-800">


      <div className="relative w-full grid grid-rows-[auto_1fr_auto] h-full">

        <div className="relative w-full flex items-center justify-between p-4 z-0 bg-slate-200 dark:bg-slate-900">
          <LanguageSelector />
        </div>


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
                  parentMounted={componentMounted}
                />
              </div>

              {/* Pointers */}
              <div className="w-full h-full absolute inset-0 pointer-events-none z-10">
                <Pointers
                  radius={radius}
                  parentMounted={componentMounted}
                  />
              </div>

              {/* Type Circle */}
              <div className="w-full h-full absolute inset-0 pointer-events-none">
                <TypeCircle
                  radius={radius}
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
                className="h-16 w-16" 
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
                className="h-16 w-16" 
                />


        </div>
      </div>

      {
        (showTypeSelector || showDualTypeSelector || showPokemonSelector) && (
          <div className="absolute inset-0 bg-slate-100/60 dark:bg-slate-800/60 flex items-center justify-center z-40">

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
                    <PokemonSelector />
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
