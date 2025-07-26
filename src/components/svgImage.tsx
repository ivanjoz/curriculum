import { createEffect, createSignal, JSX, Show } from "solid-js"
import { parseSVG } from "~/helpers"
import s1 from '../styles/main.module.css'

export interface ISvgImage {
  src: string
  class?: string
  style?: JSX.CSSProperties
  prerender?: boolean
}

export const SvgImage = (props: ISvgImage) => {

  const [isLoading, setIsLoading] = createSignal(!props.prerender)

  createEffect(() => {
    if(props.prerender){ return }
    if(typeof window !== 'undefined'){
      setIsLoading(false)
    }
  })

  return <>
    <Show when={isLoading()}>
      <div class={props.class}>Cargando...</div>
    </Show>
    <Show when={!isLoading()}>
      <img class={props.class} alt="" style={props.style} src={parseSVG(props.src as string)}/>
    </Show>
  </>
}

export interface IImagePlaceholder {
  placeHolder: string
  src: string
  class: string
  alt?: string
}

export const ImagePlaceholder = (props: IImagePlaceholder) => {

  createEffect(() => {

  })

  return <div class={s1.image_placeholder_ctn +" "+ props.class}>
    <img src={props.placeHolder} loading="lazy" />
    <img src={props.src} alt={props.alt} />
  </div>
}