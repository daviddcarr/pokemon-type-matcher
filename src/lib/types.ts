export type BattlePositions = "to" | "from"

export const DAMAGE_TYPES = ["half", "double", "no"]
export type DamageTypes = typeof DAMAGE_TYPES[number]

export const DUAL_DAMAGE_TYPES = [...DAMAGE_TYPES, "quarter", "quadruple"]
export type DualDamageTypes = typeof DUAL_DAMAGE_TYPES[number]