import fs from 'fs/promises';
import fetch from 'node-fetch';

export const SUPPORTED_LANGUAGES = [ "en", "ja", "es", "fr", "it", "de", "ko" ]
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

async function main() {
    console.log('Attempting to grab type names in other languages.');

    const typeList = {};
    for (let index = 0; index < POKE_TYPE_NAMES.length; index++) {
        try {
            const url = `https://pokeapi.co/api/v2/type/${POKE_TYPE_NAMES[index]}`;
            console.log(`Fetching ${url}`);

            const resp = await fetch(url);
            if (!resp.ok) {
                console.error(`Failed to fetch ID ${index}: ${resp.status}`);
                continue;
            }

            const data = await resp.json();
            const names = {}
            data.names.forEach((name) => {
                if (SUPPORTED_LANGUAGES.includes(name.language.name)) {
                    names[name.language.name] = name.name
                }
            })

            typeList[POKE_TYPE_NAMES[index]] = names
        } catch (error) {
            console.error(`Failed to fetch ID ${index}: ${error}`);
        }
    }

    console.log(`Fetched ${typeList.length} Language Names`);

    writeDataToJson(typeList, 'typeNames.json');

    console.log(`Wrote ${typeList.length} Type Names to ./src/data/json/typeNames.json`);

    let typesByLanguage = {}
    SUPPORTED_LANGUAGES.forEach((lang) => {
        console.log(`Creating array for ${lang}`)
        typesByLanguage[lang] = {}
    })

    POKE_TYPE_NAMES.forEach((type) => {
        SUPPORTED_LANGUAGES.forEach((lang) => {
            console.log(`Adding ${type} to ${lang}`)
            if (typeList[type][lang]) {
                typesByLanguage[lang][type] = typeList[type][lang]
            }
        })
    })

    writeDataToJson(typesByLanguage, 'typesByLanguage.json');

    console.log(`Wrote ${typesByLanguage.length} Type Names to ./src/data/json/typesByLanguage.json`);
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