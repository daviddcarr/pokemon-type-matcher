import fs from 'fs/promises';
import fetch from 'node-fetch';

// Grab the second argument from the command line (process.argv[2]) 
// and parse it as an integer.
const userArg = parseInt(process.argv[2], 10);

// If the user didn't provide an argument or provided something invalid, default to 1025
const CURRENT_MAX = Number.isNaN(userArg) ? 1025 : userArg;

async function getPokemonCount() {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon');
    if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    return data.count;
}

async function main() {
    const count = await getPokemonCount();
    console.log('Total Pokemon in the API:', count);

    const maxID = Math.min(count, CURRENT_MAX);

    const pokemonList = [];
    for (let id = 1; id <= maxID; id++) {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            console.log(`Fetching ${url}`);

            const resp = await fetch(url);
            if (!resp.ok) {
                console.error(`Failed to fetch ID ${id}: ${resp.status}`);
                continue;
            }

            const data = await resp.json();
            const types = data.types.map((t) => t.type.name);
            const pokemon = {
                id: data.id,
                name: data.name,
                types,
                sprites: { front_default: data.sprites.front_default }
            }

            pokemonList.push(pokemon);
        } catch (error) {
            console.error(`Failed to fetch ID ${id}: ${error}`);
        }
    }

    console.log(`Fetched ${pokemonList.length} Pokemon`);

    writeDataToJson(pokemonList, 'pokemon.json');

    console.log(`Wrote ${pokemonList.length} Pokemon to ./src/data/json/pokemon.json`);
}

main().catch((error) => {
    console.error('Script error:', error);
});

function writeDataToJson(data, filename) {
    fs.writeFile(`./src/data/json/${filename}`, JSON.stringify(data), (err) => { if (err) {
        console.error('Error writing JSON data.')
        console.error(err)
        throw err
    } })
}