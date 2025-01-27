import { PokeType } from "@lib/types"

import raw from "@assets/icons/icon_data.json"

const TYPE_ICON_DATA = raw as Record<PokeType | "all", { viewbox: string, path: string}>

export interface TypeIconProps {
    type: PokeType | "all",
    className?: string,
    style?: React.CSSProperties
}

const TypeIcon = ({type, className, style}: TypeIconProps) => {
    return (
        <svg
        width="100%" 
        height="100%" 
        viewBox={TYPE_ICON_DATA[type].viewbox} 
        version="1.1" 
        className={className}
        style={{
            ...style,
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            strokeLinejoin: 'round',
            strokeMiterlimit: 2
        }}
        >
        <path 
            id="effective" 
            d={TYPE_ICON_DATA[type].path}
            />
    </svg>
    )
}

export default TypeIcon