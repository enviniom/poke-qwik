import { component$, Slot, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { type PokemonGameState, PokemonGameContext } from "./pokemon-game.context";
import { type PokemonListState, PokemonListContext } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isVisible: true,
    showBackImage: false
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: []
  })

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    const initialData: string | null = localStorage.getItem('pokemon-game');
    if (initialData) {
      const { isVisible = true, pokemonId = 1, showBackImage = false } = JSON.parse(initialData) as PokemonGameState;
      pokemonGame.isVisible = isVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
    }
  })

  useVisibleTask$(({ track }) => {
    track(() => [pokemonGame.pokemonId, pokemonGame.isVisible, pokemonGame.showBackImage]);

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  })

  return <Slot />
});