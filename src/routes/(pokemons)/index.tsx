import { component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/pokemon-game";

export default component$(() => {


  const {
    isPokemonVisible,
    nextPokemon,
    pokemonId,
    prevPokemon,
    showBackImage,
    toggleFrontBack,
    toggleVisible
  } = usePokemonGame();

  const goToPokemon = useNavigate()

  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{pokemonId.value}</span>

      <div onClick$={async () => goToPokemon(`/pokemon/${pokemonId.value}/`)}>
        <PokemonImage id={ pokemonId.value } backImage={ showBackImage.value } reveal={isPokemonVisible.value} />
      </div>

      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ toggleFrontBack } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ toggleVisible } class="btn btn-primary mr-2">Revelar</button>
        <button onClick$={ nextPokemon } class="btn btn-primary">Siguiente</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera aplicación con Qwik",
    },
  ],
};
