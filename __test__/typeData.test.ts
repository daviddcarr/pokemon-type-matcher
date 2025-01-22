/**
 * @file typeData.test.ts
 *
 * Test to ensure our local `types.ts` data matches the official PokéAPI
 * type damage relations for each type.
 */

import { describe, it, expect } from 'vitest'

import fetch from 'node-fetch'
import pokeTypes from '../src/data/types.ts'

interface NameUrl {
    name: string;
    url: string;
}

interface PokeApiTypeResponse {
    damage_relations: {
        double_damage_from: NameUrl[];
        double_damage_to: NameUrl[];
        half_damage_from: NameUrl[];
        half_damage_to: NameUrl[];
        no_damage_from: NameUrl[];
        no_damage_to: NameUrl[];
    }
}

describe('Local Pokemon Type Data', () => {
    it('matches the live data from PokéAPI', async () => {
    
        for (const pokeType of pokeTypes) {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${pokeType.name}`)
            expect(response.ok).toBe(true)

            const remoteData = await response.json() as PokeApiTypeResponse;
            const remoteDamageRelations = remoteData.damage_relations

            // Grab arrays from remote and map them into simple array of strings instead of NameUrl[] and sort them.
            const remoteDoubleDamageFrom = remoteDamageRelations.double_damage_from.map((rel: NameUrl) => rel.name).sort();
            const remoteDoubleDamageTo   = remoteDamageRelations.double_damage_to.map((rel: NameUrl) => rel.name).sort();
            const remoteHalfDamageFrom   = remoteDamageRelations.half_damage_from.map((rel: NameUrl) => rel.name).sort();
            const remoteHalfDamageTo     = remoteDamageRelations.half_damage_to.map((rel: NameUrl) => rel.name).sort();
            const remoteNoDamageFrom     = remoteDamageRelations.no_damage_from.map((rel: NameUrl) => rel.name).sort();
            const remoteNoDamageTo       = remoteDamageRelations.no_damage_to.map((rel: NameUrl) => rel.name).sort();

            // Grab arrays from data and sort them.
            const localDoubleDamageFrom = [...pokeType.damage_relations.double_damage_from].sort();
            const localDoubleDamageTo   = [...pokeType.damage_relations.double_damage_to].sort();
            const localHalfDamageFrom   = [...pokeType.damage_relations.half_damage_from].sort();
            const localHalfDamageTo     = [...pokeType.damage_relations.half_damage_to].sort();
            const localNoDamageFrom     = [...pokeType.damage_relations.no_damage_from].sort();
            const localNoDamageTo       = [...pokeType.damage_relations.no_damage_to].sort();

            // Compare
            expect(localDoubleDamageFrom, `${pokeType.name} double damage from`).toEqual(remoteDoubleDamageFrom);
            expect(localDoubleDamageTo, `${pokeType.name} double damage to`).toEqual(remoteDoubleDamageTo);
            expect(localHalfDamageFrom, `${pokeType.name} half damage from`).toEqual(remoteHalfDamageFrom);
            expect(localHalfDamageTo, `${pokeType.name} half damage to`).toEqual(remoteHalfDamageTo);
            expect(localNoDamageFrom, `${pokeType.name} no damage from`).toEqual(remoteNoDamageFrom);
            expect(localNoDamageTo, `${pokeType.name} no damage to`).toEqual(remoteNoDamageTo);
        }
    })
})