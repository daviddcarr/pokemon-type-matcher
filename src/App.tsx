import { useState, useRef, useEffect } from "react"
import classNames from "classnames"

import pokeTypes, { PokeTypeData, DamageRelationKey, PokeType, getDataFromType } from "./data/types"
import Slice from "./components/Slice"
import Pointer from "./components/Pointer"
import BattlePositionButton from "./components/BattlePositionButton"
import { BattlePositions, DAMAGE_TYPES } from "./lib/types"
import TypeIcon from "./components/TypeIcon"

// const battlePositionOptions: {value: BattlePositions, label: string, color: string} = [
//   {
//     value: "to",
//     label: "Attacking",
//     color: "#FF0000"
//   },
//   {
//     value: "from",
//     label: "Defending",
//     color: "#0000FF"
//   }
// ]

function App() {
  const [ selectedType, setSelectedType] = useState<PokeTypeData>(pokeTypes[0])
  const [ battlePosition, setBattlePosition] = useState<BattlePositions>("to")


  const [ radius, setRadius ] = useState<number>(2);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      console.log("We are resizing")
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
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-20 border-4 border-slate-100 flex items-center justify-center"
                  style={{
                    backgroundColor: selectedType.color,
                    width: `${radius * 0.3}px`,
                    height: `${radius * 0.3}px`,
                  }}
                  >
                    <TypeIcon type={selectedType.name} className="w-1/2 h-1/2 object-contain" />
                  
                  { radius > 300 && (
                    <BattlePositionButton
                    battlePosition={battlePosition}
                      className={classNames(
                        "absolute -bottom-1 left-0 coin-flip-container",
                      )}
                      style={{
                        height: `${radius * 0.1}px`,
                        width: `${radius * 0.1}px`,
                      }}
                      onClick={() => setBattlePosition(battlePosition === "to" ? "from" : "to")}
                      />
                  )}
                </div>

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
                                  />
                              )})
                            })
                          }
                    </div>

              </div>

              {/* Pie Chart */}
              <div className="w-full h-full absolute inset-0 pointer-events-none">
                {
                  pokeTypes.map((type, index) => {
                    return (
                      <div 
                        className="circle origin-bottom absolute left-1/2 pointer-events-auto" 
                        key={index} 
                        style={{ 
                          transform: `translateX(-50%) rotate(${index * 20}deg) translateY(-10px)`,
                          height: `${radius}px`, 
                          }}>
                        <Slice 
                          type={type} 
                          selected={type === selectedType}
                          onClick={() => setSelectedType(type)}
                          />
                      </div>
                    )
                  })
                }
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
