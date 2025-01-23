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
    "fairy"]
export type PokeType = typeof POKE_TYPE_NAMES[number]

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


const ALL_POKE_TYPES: PokeTypeData[] = [
    {
        "id": 1,
        "name": "normal",
        "color": "#A8A878",
        "damage_relations": {
            "double_damage_from": ["fighting"],
            "double_damage_to": [],
            "half_damage_from": [],
            "half_damage_to": ["rock","steel"],
            "no_damage_from": ["ghost"],
            "no_damage_to": ["ghost"]
        }
    },
    {
        "id": 2,
        "name": "fire",
        "color": "#F08030",
        "damage_relations": {
            "double_damage_from": ["ground", "rock", "water"],
            "double_damage_to": ["bug", "steel", "grass", "ice"],
            "half_damage_from": ["bug", "steel", "fire", "grass", "ice", "fairy"],
            "half_damage_to": ["fire", "water", "rock", "dragon"],
            "no_damage_from": [],
            "no_damage_to": []
        }
    },
    {
        "id": 3,
        "name": "water",
        "color": "#6890F0",
        "damage_relations": {
            "double_damage_from": ["grass", "electric"],
            "double_damage_to": ["ground", "rock", "fire"],
            "half_damage_from": ["steel", "fire", "water", "ice"],
            "half_damage_to": ["water", "grass", "dragon"],
            "no_damage_from": [],
            "no_damage_to": []
        }
    },
    {
        "id": 4,
        "name": "electric",
        "color": "#F8D030",
        "damage_relations": {
            "double_damage_from": ["ground"],
            "double_damage_to": ["flying", "water"],
            "half_damage_from": ["flying", "steel", "electric"],
            "half_damage_to": ["grass", "electric", "dragon"],
            "no_damage_from": [],
            "no_damage_to": ["ground"]
        }
    },
    {
        "id": 5,
        "name": "grass",
        "color": "#78C850",
        "damage_relations": {
            "double_damage_from": ["flying", "poison", "bug", "fire", "ice"],
            "double_damage_to": ["ground", "rock", "water"],
            "half_damage_from": ["ground", "water", "grass", "electric"],
            "half_damage_to": ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
            "no_damage_from": [],
            "no_damage_to": []
        }
    },
    {
        "id": 6,
        "name": "ice",
        "color": "#98D8D8",
        "damage_relations": {
            "double_damage_from": ["fighting", "rock", "steel", "fire"],
            "double_damage_to": ["flying", "ground", "grass", "dragon"],
            "half_damage_from": ["ice"],
            "half_damage_to": ["steel", "fire", "water", "ice"],
            "no_damage_from": [],
            "no_damage_to": []
        }
    },
    {
        "id": 7,
        "name": "fighting",
        "color": "#C03028",
        "damage_relations": {
            "double_damage_from": ["flying", "psychic", "fairy"],
            "double_damage_to": ["normal", "rock", "steel", "ice", "dark"],
            "half_damage_from": ["rock", "bug", "dark"],
            "half_damage_to": ["flying", "poison", "bug", "psychic", "fairy"],
            "no_damage_from": [],
            "no_damage_to": ["ghost"]
        }
    },
    {
        "id": 8,
        "name": "poison",
        "color": "#A040A0",
        "damage_relations": {
            "double_damage_from": ["ground", "psychic"],
            "double_damage_to": ["grass", "fairy"],
            "half_damage_from": ["fighting", "poison", "bug", "grass", "fairy"],
            "half_damage_to": ["poison", "ground", "rock", "ghost"],
            "no_damage_from": [],
            "no_damage_to": ["steel"]
        }
    },
    {
        "id": 9,
        "name": "ground",
        "color": "#E0C068",
        "damage_relations": {
            "double_damage_from": ["water", "grass", "ice"],
            "double_damage_to": ["poison", "rock", "steel", "fire", "electric"],
            "half_damage_from": ["poison", "rock"],
            "half_damage_to": ["bug", "grass"],
            "no_damage_from": ["electric"],
            "no_damage_to": ["flying"]
        }
    },
    {
        "id": 10,
        "name": "flying",
        "color": "#A890F0",
        "damage_relations": {
            "double_damage_from": ["rock", "electric", "ice"],
            "double_damage_to": ["fighting", "bug", "grass"],
            "half_damage_from": ["fighting", "bug", "grass"],
            "half_damage_to": ["rock", "steel", "electric"],
            "no_damage_from": ["ground"],
            "no_damage_to": []
        }
    },
    {
        "id": 11,
        "name": "psychic",
        "color": "#F85888",
        "damage_relations": {
            "double_damage_from": ["bug", "ghost", "dark"],
            "double_damage_to": ["fighting", "poison"],
            "half_damage_from": ["fighting", "psychic"],
            "half_damage_to": ["steel", "psychic"],
            "no_damage_from": [],
            "no_damage_to": ["dark"]
        }
    },
    {
        "id": 12,
        "name": "bug",
        "color": "#A8B820",
        "damage_relations": {
            "double_damage_from": ["flying", "rock", "fire"],
            "double_damage_to": ["grass", "psychic", "dark"],
            "half_damage_from": ["fighting", "ground", "grass"],
            "half_damage_to": ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
            "no_damage_from": [],
            "no_damage_to": []
        }
    },
    {
        "id": 13,
        "name": "rock",
        "color": "#B8A038",
        "damage_relations": {
            "double_damage_from": ["fighting", "ground", "steel", "water", "grass"],
            "double_damage_to": ["flying", "bug", "fire", "ice"],
            "half_damage_from": ["normal", "flying", "poison", "fire"],
            "half_damage_to": ["fighting", "ground", "steel"],
            "no_damage_from": [],
            "no_damage_to": []
        }
    },
    {
        "id": 14,
        "name": "ghost",
        "color": "#705898",
        "damage_relations": {
            "double_damage_from": ["ghost", "dark"],
            "double_damage_to": ["ghost", "psychic"],
            "half_damage_from": ["poison", "bug"],
            "half_damage_to": ["dark"],
            "no_damage_from": ["normal", "fighting"],
            "no_damage_to": ["normal"]
        }
    },
    {
        "id": 15,
        "name": "dragon",
        "color": "#7038F8",
        "damage_relations": {
            "double_damage_from": ["ice", "dragon", "fairy"],
            "double_damage_to": ["dragon"],
            "half_damage_from": ["fire", "water", "grass", "electric"],
            "half_damage_to": ["steel"],
            "no_damage_from": [],
            "no_damage_to": ["fairy"]
        }
    },
    {
        "id": 16,
        "name": "dark",
        "color": "#705848",
        "damage_relations": {
            "double_damage_from": ["fighting", "bug", "fairy"],
            "double_damage_to": ["ghost", "psychic"],
            "half_damage_from": ["ghost", "dark"],
            "half_damage_to": ["fighting", "dark", "fairy"],
            "no_damage_from": ["psychic"],
            "no_damage_to": []
        }
    },
    {
        "id": 17,
        "name": "steel",
        "color": "#B8B8D0",
        "damage_relations": {
            "double_damage_from": ["fighting", "ground", "fire"],
            "double_damage_to": ["rock", "ice", "fairy"],
            "half_damage_from": ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"],
            "half_damage_to": ["steel", "fire", "water", "electric"],
            "no_damage_from": ["poison"],
            "no_damage_to": []
        }
    },
    {
        "id": 18,
        "name": "fairy",
        "color": "#EE99AC",
        "damage_relations": {
            "double_damage_from": ["poison", "steel"],
            "double_damage_to": ["fighting", "dragon", "dark"],
            "half_damage_from": ["fighting", "bug", "dark"],
            "half_damage_to": ["poison", "steel", "fire"],
            "no_damage_from": ["dragon"],
            "no_damage_to": []
        }
    }
]
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