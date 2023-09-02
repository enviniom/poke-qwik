import type { PokemonListReponse, SmallPokemon } from "~/interfaces";


export const getSmallPokemons = async (offset: number = 0, limit: number = 10): Promise<SmallPokemon[]> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await resp.json() as PokemonListReponse;
    return data.results.map(({name, url}) => {

        const segments = url.split("/");

        return {
            id: segments.at(-2)!,
            name: name
        }
    });
}