import { $, useComputed$, useContext } from "@builder.io/qwik"
import { PokemonGameContext } from "~/context";


export const usePokemonGame = () => {

  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if ((pokemonGame.pokemonId + value) < 1) {
      return;
    }
    pokemonGame.pokemonId += value;
  })

  const changeBackImageState = $(() => { pokemonGame.showBackImage = !pokemonGame.showBackImage })
  const changeRevealPokemonState = $(() => { pokemonGame.isVisible = !pokemonGame.isVisible })

  return {
    isPokemonVisible: useComputed$(() => pokemonGame.isVisible),
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    nextPokemon: $(() => { changePokemonId(1); }),
    prevPokemon: $(() => { changePokemonId(-1); }),
    toggleVisible: changeRevealPokemonState,
    toggleFrontBack: changeBackImageState
  }
}

