import { useState, useRef, useEffect } from "react"
import classNames from "classnames"

import BattlePositionButton from "@components/HubSelector/BattlePositionButton"
import TypeButton from "@components/HubSelector/TypeButton"
import TypeCircle from "@components/TypeCircle"
import HubSelector from "@components/HubSelector"
import Pointers from "@components/Pointers"
import PokemonSelectorButton from "@components/HubSelector/PokemonSelectorButton"
import LanguageSelector from "@components/LanguageSelector"
import Overlays from "@components/Overlays"
import { MdSwapHorizontalCircle } from "react-icons/md"
import TypeIcon from "@components/TypeIcon"
import { LANGUAGE_DICT_ATTACKING } from "@data/languages"

import useStyles from "@lib/useStyles"
import useApp from "@lib/useApp"
import InfoButton from "@components/InfoPanel/InfoButton"

function App() {
  const { 
    language,
    selectedType,
    selectedDualType,
    battlePosition,
    setDualTypes,
    setShowTypeSelector,
    setShowDualTypeSelector,
    setShowInfo
  } = useApp()

  const styles = useStyles()

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
  
  return (
    <main className="absolute inset-0 h-full w-full bg-slate-100 dark:bg-slate-800">


      <div className="relative w-full grid grid-rows-[auto_1fr_auto_auto] h-full">

        {/* Header Bar */}
        <div className="relative w-full flex items-center justify-between p-4 z-0 bg-slate-200 dark:bg-slate-900">
          <LanguageSelector />

          <InfoButton 
            onClick={() => {
              setShowInfo(true)
            }}
            />
        </div>


        {/* Main Content: Circle */}
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
                  />
              </div>


            </div>
          </div>
        </div>

        {/* Tooltip */}
        <div className="p-2 flex items-center justify-center gap-2">
          <TypeIcon
            type={battlePosition === "from" ? "all" : selectedType.name}
            className="w-8 fill-slate-900 dark:fill-white"
            /> 

          <h2 className={classNames(
            styles.headingFont,
            "text-xl text-slate-900 dark:text-white"
            )}
            >{ LANGUAGE_DICT_ATTACKING[language] }</h2>

          <TypeIcon
            type={battlePosition === "to" ? "all" : selectedType?.name}
            className="w-8 fill-slate-900 dark:fill-white"
            />
          { battlePosition == "from" && selectedDualType && (
            <TypeIcon
              type={selectedDualType.name}
              className="w-8 fill-slate-900 dark:fill-white"
              />
          )}
        </div>

        {/* Thumb / Footer UI */}
        <div className={classNames(
          "relative w-full flex items-center justify-between p-4 z-0 bg-slate-200 dark:bg-slate-900"
          )}
          >
            <div className="flex gap-1">
              <PokemonSelectorButton
                className="h-10 w-10 sm:h-16 sm:w-16" 
                />

              <TypeButton
                selectedType={selectedType}
                className="h-10 w-10 sm:h-16 sm:w-16"
                onClick={() => setShowTypeSelector(true)}
                />
              <TypeButton
                selectedType={selectedDualType}
                className={classNames(
                  "h-10 w-10 sm:h-16 sm:w-16",
                  battlePosition === "to" && "opacity-75 grayscale"
                )}
                onClick={() => {
                  setShowDualTypeSelector(true)
                }}
                />
              {
                selectedDualType && (                  
                  <button
                    className="h-10 w-10 sm:h-16 sm:w-16 flex items-center justify-center text-slate-900 dark:text-slate-200 p-2 rounded-full bg-slate-400 dark:bg-slate-600"
                    onClick={() => {
                      const mainType = selectedDualType
                      const dualType = selectedType
    
                      setDualTypes(mainType, dualType)
                    }}
                    ><MdSwapHorizontalCircle className="text-4xl" /></button>
                )
              }
            </div>
            <BattlePositionButton
              className="h-10 w-10 sm:h-16 sm:w-16" 
              />


        </div>


      </div>

      {/* Overlays / Windows */}
      <Overlays />

    </main>
  )
}

export default App
