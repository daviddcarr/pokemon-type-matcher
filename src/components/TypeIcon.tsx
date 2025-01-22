import classNames from "classnames"

import bug from "../assets/icons/bug.svg"
import dark from "../assets/icons/dark.svg"
import dragon from "../assets/icons/dragon.svg"
import electric from "../assets/icons/electric.svg"
import fairy from "../assets/icons/fairy.svg"
import fighting from "../assets/icons/fighting.svg"
import fire from "../assets/icons/fire.svg"
import flying from "../assets/icons/flying.svg"
import ghost from "../assets/icons/ghost.svg"
import grass from "../assets/icons/grass.svg"
import ground from "../assets/icons/ground.svg"
import ice from "../assets/icons/ice.svg"
import normal from "../assets/icons/normal.svg"
import poison from "../assets/icons/poison.svg"
import psychic from "../assets/icons/psychic.svg"
import rock from "../assets/icons/rock.svg"
import steel from "../assets/icons/steel.svg"
import water from "../assets/icons/water.svg"

import { PokeType } from "../data/types"

const TYPE_ICONS: Record<PokeType, string> = {
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water
}

export interface TypeIconProps {
    type: PokeType,
    className?: string,
    style?: React.CSSProperties
}


const TypeIcon = ({type, className, style}: TypeIconProps) => {
    return (
        <img 
            src={TYPE_ICONS[type]} 
            className={classNames("max-w-full max-h-full", className)}
            style={style ?? {}}
            />
    )
}

export default TypeIcon