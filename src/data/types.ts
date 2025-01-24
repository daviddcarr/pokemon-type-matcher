import raw from "@data/json/typeData.json"
import { PokeType, PokeTypeData, DualPokeDamageRelations } from "@lib/types"

export const POKE_TYPE_NAMES = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy"
]

export const DAMAGE_TYPES = ["half", "double", "no"]
export const DUAL_DAMAGE_TYPES = [...DAMAGE_TYPES, "quarter", "quadruple"]

export const getSingleTypeMultiplier = (defender: PokeTypeData, attacker: PokeTypeData): number => {
    if (defender.damage_relations.no_damage_from.includes(attacker.name)) {
        return 0
    }
    if (defender.damage_relations.double_damage_from.includes(attacker.name)) {
        return 2
    }
    if (defender.damage_relations.half_damage_from.includes(attacker.name)) {
        return 0.5
    }
    return 1
}

const ALL_POKE_TYPES: PokeTypeData[] = raw as PokeTypeData[]
export default ALL_POKE_TYPES

export const getDataFromType = (type: PokeType): PokeTypeData => {
    return ALL_POKE_TYPES.find(t => t.name === type) ?? ALL_POKE_TYPES[0]
}

export const getIdFromType = (type: PokeType): number => {
    return getDataFromType(type).id
}

export const combineDualTypes = (primary: PokeTypeData, secondary: PokeTypeData): DualPokeDamageRelations => {
    const result: DualPokeDamageRelations ={
        "quadruple_damage_from": [],
        "double_damage_from": [],
        "half_damage_from": [],
        "quarter_damage_from": [],
        "no_damage_from": []
    }

    ALL_POKE_TYPES.forEach((attackingType) => {
        const multiplierA = getSingleTypeMultiplier(primary, attackingType)
        const multiplierB = getSingleTypeMultiplier(secondary, attackingType)
        const finalMultiplier = multiplierA * multiplierB

        if (finalMultiplier === 4) {
            result.quadruple_damage_from.push(attackingType.name)
        } else if (finalMultiplier === 2) {
            result.double_damage_from.push(attackingType.name)
        } else if (finalMultiplier === 0.5) {
            result.half_damage_from.push(attackingType.name)
        } else if (finalMultiplier === 0.25) {
            result.quarter_damage_from.push(attackingType.name)
        } else if (finalMultiplier === 0) {
            result.no_damage_from.push(attackingType.name)
        }
    })

    return result
}