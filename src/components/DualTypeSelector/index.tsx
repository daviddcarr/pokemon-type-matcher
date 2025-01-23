import pokeTypes, { PokeTypeData } from "@data/types"

import TypeIcon from "@components/TypeIcon"

export interface DualTypeSelectorProps {
    onChange: (type: PokeTypeData | null) => void
}


const DualTypeSelector = ({
    onChange
}: DualTypeSelectorProps) => {

    return (
        <>
            <div className="absolute inset-0 w-full h-full grid grid-cols-2 z-40">
                {
                    pokeTypes.map((type, i) => (
                        <button 
                            className="w-full h-full flex items-center justify-center"
                            onClick={() => onChange(type)}
                            key={i}
                            style={{
                                backgroundColor: type.color
                            }}
                            >
                            <div 
                                className=""
                                >
                                    <TypeIcon type={type.name} className="text-white w-8" />
                            </div>
                        </button>
                    ))
                }
                <button className="col-span-2 w-full h-full flex items-center justify-center bg-white"
                    onClick={() => onChange(null)}
                    >
                    None
                </button>

            </div>
        </>
    )
}

export default DualTypeSelector