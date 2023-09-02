import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number | string;
    size?: number;
    backImage?: boolean;
    reveal?: boolean;
}

export const PokemonImage = component$(( {id, size = 200, backImage = false, reveal = true }:Props ) => {

    const imageLoaded = useSignal(false)

    useTask$( ({ track }) => {
        track(() => id);
        imageLoaded.value = false;
    })

    const imageUrl = useComputed$(() => {
        if (id === '') return '';
        let backImageStr = "";
        if (backImage) {
            backImageStr = "back/"
        }
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${backImageStr}${id}.png`
    })
    
    return (
        <>
        <div class="flex items-center justify-center" style={{height: `${size}px`, width: `${size}px`}}>
            {/* { !imageLoaded.value && (<span>Cargando...</span>) } */}
            <img width={size} height={size} 
                src={imageUrl.value} 
                alt="Pokemon Sprite" 
                style={{ width: `${size}px` }}
                onLoad$={ () => imageLoaded.value = true }
                class={[{ 
                    // 'hidden': !imageLoaded.value,
                    'brightness-0': !reveal
                }, 'transition-all']}
            />
        </div>
      </>
    )
})