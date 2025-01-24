import classNames from "classnames"
import { useEffect, useState } from "react"

import ALL_POKE_TYPES from "@data/types"
import { PokeTypeData } from "@lib/types"
import useApp from "@lib/useApp"
import Slice from "./Slice"

export interface TypeCircleProps {
    radius: number
    onChange: (type: PokeTypeData) => void
}

const TypeCircle = ({
    radius,
    onChange
}: TypeCircleProps) => {

    const { selectedType } = useApp()

    const [ componentMounted, setComponentMounted ] = useState(false);

    useEffect(() => {
        setComponentMounted(true);
    }, []);

    return ALL_POKE_TYPES.map((type, index) => {
        return (
          <div 
            className="circle origin-bottom absolute left-1/2 transition-transform" 
            key={index} 
            style={{ 
              transform: `translateX(-50%) rotate(${index * 20}deg) translateY(-10px)`,
              }}>
            <div
              className={classNames(
                "slice-inner transition-transform origin-bottom w-100 h-100 relative inset-0",
                componentMounted ? 'scale-100' : 'scale-0'
              )}
              style={{
                transitionDelay: `${index * 10}ms`,
                height: `${radius}px`, 

              }}>
              <Slice 
                type={type} 
                radius={radius}
                selected={type === selectedType}
                onClick={() => onChange(type)}
                />
            </div>
          </div>
        )
    })
}

export default TypeCircle