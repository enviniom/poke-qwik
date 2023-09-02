import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getFunFactAboutPokemon } from '~/helpers/get-chatgpt-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, pathname, redirect }) => {

  let pokemons: SmallPokemon[] = [];
  const offset = Number(query.get('offset') || '0');
  if (isNaN(offset) || offset < 0 || offset > 500) {
    console.log(pathname);

    redirect(301, pathname);
  } else {
    pokemons = await getSmallPokemons(offset)
  }

  return pokemons;
})

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const modalPokemon = useStore({
    id: '',
    name: ''
  });

  const chatGptPokemonFact = useSignal('');

  const modalVisible = useSignal(false);

  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });

  // TODO: Probar asycn
  useVisibleTask$(({ track }) =>{
    track(() => modalPokemon.name );

    chatGptPokemonFact.value = '';

    if ( modalPokemon.name.length > 0 ) {
      getFunFactAboutPokemon( modalPokemon.name )
        .then( resp => chatGptPokemonFact.value = resp );


    }
  });

  const currentOffset = useComputed$(() => {
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get('offset') || 0);
  })

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: {location.isNavigating ? 'Si' : 'No'}</span>
      </div>

      <div class="mt-10">
        <Link href={'/pokemons/list-ssr/?offset=' + (currentOffset.value - 10)} class="btn btn-primary mr-2">
          Anteriores
        </Link>
        <Link href={'/pokemons/list-ssr/?offset=' + (currentOffset.value + 10)} class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({ name, id }) => (
            <div key={name} onClick$={() => showModal(id, name)}
              class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class="capitalize"> {name} </span>
            </div>
          ))
        }
      </div>

      <Modal showModal={ modalVisible.value } persistent size='sm' closeFn={closeModal}>
        <div q:slot='title'>{ modalPokemon.name }</div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImage id={modalPokemon.id} />

          <span>
              { 
                chatGptPokemonFact.value === ''
                ? 'Preguntando a ChatGPT'
                : chatGptPokemonFact
              }
            </span>
        </div>
      </Modal>

    </>
  )
});


export const head: DocumentHead = {
  title: "List SSR",
  meta: [
    {
      name: "description",
      content: "Lista de pokemons generada desde el servidor",
    },
  ],
};
