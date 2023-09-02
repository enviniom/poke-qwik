import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';


export default component$(() => {

  const pokemonList = useContext(PokemonListContext);

  useOnDocument('scroll', $(() => {
    const maxscroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight
    if (currentScroll + 200 >= maxscroll && !pokemonList.isLoading) {
      pokemonList.isLoading = true;
      pokemonList.currentPage++;
    }
  }));

  useTask$(async ({track}) => {
    track(() => pokemonList.currentPage)

    pokemonList.isLoading = true;
    const pokemons = await getSmallPokemons(pokemonList.currentPage * 10, 30);
    pokemonList.pokemons = [...pokemonList.pokemons,...pokemons];
    pokemonList.isLoading = false;
  })
  
  return (
    <>
    <div class="flex flex-col">
      <span class="my-5 text-5xl">Status</span>
      <span>Página actual: {pokemonList.currentPage}</span>
      <span>Está cargando : {pokemonList.isLoading ? 'Si' : 'No'}</span>
    </div>

    <div class="mt-10">
      <button onClick$={() => pokemonList.currentPage++} class="btn btn-primary mr-2">
        Siguientes 
      </button>
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
      {
        pokemonList.pokemons.map(({name, id}) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span class="capitalize"> {name} </span>
          </div>
        ))
      }
    </div>
    </>
  )
});

export const head: DocumentHead = {
    title: "List Client",
    meta: [
      {
        name: "description",
        content: "Lista de pokemons generada desde el cliente",
      },
    ],
  };

  