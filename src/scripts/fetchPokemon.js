import fs from 'fs/promises';
import fetch from 'node-fetch';

export const SUPPORTED_LANGUAGES = [ "en", "ja", "es", "fr", "it", "de", "ko" ]

const userArg = parseInt(process.argv[2], 10);
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
                sprites: { front_default: data.sprites.front_default },
                names: []
            }

            // Check for names in other languages
            if (data.species?.url) {
                const speciesResp = await fetch(data.species.url)
                if (speciesResp.ok) {
                    const speciesData = await speciesResp.json()
                    const allNames = speciesData.names
                    const multiLangNames = {}
                    allNames.forEach((name) => {
                        const langCode = name.language.name
                        if ( SUPPORTED_LANGUAGES.includes(langCode)) {
                            multiLangNames[langCode] = name.name
                        }
                    })
                    pokemon.names = multiLangNames
                }
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