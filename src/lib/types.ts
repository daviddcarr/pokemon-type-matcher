import { POKE_TYPE_NAMES, DAMAGE_TYPES, DUAL_DAMAGE_TYPES } from "@data/types"

export type PokeType = typeof POKE_TYPE_NAMES[number]

export type BattlePositions = "to" | "from"

export type DamageTypes = typeof DAMAGE_TYPES[number]

export type DualDamageTypes = typeof DUAL_DAMAGE_TYPES[number]

export type DamageRelationKey = 
    "double_damage_from" |
    "double_damage_to" |
    "half_damage_from" |
    "half_damage_to" |
    "no_damage_from" |
    "no_damage_to"

export type DualDamageRelationKey =
    "quadruple_damage_from" |
    "double_damage_from" |
    "half_damage_from" |
    "quarter_damage_from" |
    "no_damage_from"

type PokeDamageRelations = Record<DamageRelationKey, PokeType[]>
export type DualPokeDamageRelations = Record<DualDamageRelationKey, PokeType[]>

export type PokeTypeData = {
    id: number,
    name: PokeType,
    color: string,
    damage_relations: PokeDamageRelations
}

export type Pokemon = {
    id: number
    name: string
    names: Record<string, string>
    types: Array<PokeType>
    sprites: { front_default: string }
}