import { useState, useRef, useEffect } from "react"

import pokeTypes, { PokeTypeData, DamageRelationKey, PokeType, getDataFromType } from "./data/types"
import Pointer from "./components/Pointer"
import BattlePositionButton from "@components/HubSelector/BattlePositionButton"
import { BattlePositions, DAMAGE_TYPES } from "./lib/types"
import TypeCircle from "@components/TypeCircle"
import HubSelector from "@components/HubSelector"

function App() {

  const [ selectedType, setSelectedType] = useState<PokeTypeData>(pokeTypes[0])
  const [ selectedSecondaryType, setSelectedSecondaryType] = useState<PokeTypeData|null>(null)
  const [ battlePosition, setBattlePosition] = useState<BattlePositions>("to")


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
                />
              </div>

              {/* Pointers */}
              <div className="w-full h-full absolute inset-0 pointer-events-none z-10">
                  
                <div className="absolute left-1/2 top-1/2 w-0 h-0 ">
                  {/* Pointer Map */}
                      {
                        DAMAGE_TYPES.map((damageType, damageIndex) => {
                          const damage_index: DamageRelationKey = `${damageType}_damage_${battlePosition}` as DamageRelationKey
                          const matchingTypes: PokeType[] = selectedType.damage_relations[damage_index]

                          return matchingTypes.map((type, index) => {
                            return (<Pointer 
                              key={`${damageIndex}_${index}`}
                              type={getDataFromType(type)}
                              radius={radius}
                              position={battlePosition}
                              damageType={damageType}
                              parentMounted={componentMounted}
                              />
                          )})
                        })
                      }
                </div>

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
              <BattlePositionButton
                battlePosition={battlePosition}
                className="h-16 w-16" 
                onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
                />
            )
          }
        </div>
      </div>
    </main>
  )
}

export default App
