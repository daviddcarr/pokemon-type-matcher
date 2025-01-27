import classNames from "classnames"
import { useEffect, useState } from "react"

import ALL_POKE_TYPES, { getDamageForTypeName } from "@data/types"
import Slice from "./Slice"

export interface TypeCircleProps {
    radius: number
}

const TypeCircle = ({
    radius,
}: TypeCircleProps) => {

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
                damageType={getDamageForTypeName(type.name)}
                style={{
                  animationName: "wave",
                  animationDuration: "10s",
                  animationDelay: `${index * 0.09}s`,
                  animationIterationCount: "infinite"
                }}
                />
            </div>
          </div>
        )
    })
}

export default TypeCircle