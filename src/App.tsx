import { useState, useRef, useEffect } from "react"

import pokeTypes, { PokeTypeData } from "@data/types"
import BattlePositionButton from "@components/HubSelector/BattlePositionButton"
import DualTypeButton from "@components/HubSelector/DualTypeButton"
import { BattlePositions } from "@lib/types"
import TypeCircle from "@components/TypeCircle"
import HubSelector from "@components/HubSelector"
import Pointers from "@components/Pointers"
import DualTypeSelector from "@components/DualTypeSelector"

function App() {

  const [ selectedType, setSelectedType] = useState<PokeTypeData>(pokeTypes[0])
  const [ selectedDualType, setSelectedDualType] = useState<PokeTypeData|null>(pokeTypes[1])
  const [ battlePosition, setBattlePosition] = useState<BattlePositions>("to")
  const [ showDualTypeSelector, setShowDualTypeSelector ] = useState(false)


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

  return (
    <main className="absolute inset-0 h-full w-full bg-slate-100">


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
                />
              </div>

              {/* Pointers */}
              <div className="w-full h-full absolute inset-0 pointer-events-none z-10">
                
                <Pointers
                  radius={radius}
                  selectedType={selectedType}
                  battlePosition={battlePosition}
                  parentMounted={componentMounted}
                  />

              </div>

              {/* Type Circle */}
              <div className="w-full h-full absolute inset-0 pointer-events-none">
                <TypeCircle
                  radius={radius}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  />
              </div>


            </div>
          </div>
        </div>
        <div className="relative w-full flex items-center justify-center p-4">
          {
            radius <= 300 && (
              <>
                <BattlePositionButton
                  battlePosition={battlePosition}
                  className="h-16 w-16" 
                  onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
                  />
                <DualTypeButton
                  selectedType={selectedDualType}
                  className="h-16 w-16" 
                  onClick={() => setShowDualTypeSelector(true)}
                  />
              </>
            )
          }
        </div>
      </div>

      {
        showDualTypeSelector && (
          <DualTypeSelector
            onChange={(type: PokeTypeData | null) => {
              setSelectedDualType(type)
              setShowDualTypeSelector(false)
            }}
            />
        )
      }

    </main>
  )
}

export default App
