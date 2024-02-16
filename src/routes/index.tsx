import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import style from "../styles/main.module.css"

export default function Home() {
  return <div class={style.main}>
    <div class={style.about_me_layer}>
      <div class={style.photo_circle}>
        <i>*</i>
      </div>
      <div class={`${style.letter} h2`}>
        Iván Joseph Angulo Reyna
      </div>
      <div class={style.letter}>
        Senior Software Developer
      </div>
    </div>
    <div  class={style.content}>
      <h1>hola</h1>
      <div>Programador Backend con Node.Js, Go y C# con conocimientos en arquitectura cloud con AWS, frontend con React y bases de datos SQL.
    </div>
    </div>
  </div>
}
