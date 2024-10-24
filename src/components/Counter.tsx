import { JSX, createSignal } from "solid-js";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button class="increment" onClick={() => setCount(count() + 1)}>
      Clicks: {count()}
    </button>
  )
}

interface ISpinnerProps {
  className?: string
  size?: string
  children?: JSX.Element | JSX.Element[]
}

export const Spinner = (props: ISpinnerProps) => {
  let className = "spinner1 flex a-center j-center"
  if (props.className) { className += (" " + props.className) }

  return <div class={"flex ai-center "+(className||"")}>
    <div class="lds-spinner">
      <div></div><div></div><div></div><div></div><div></div>
      <div></div><div></div><div></div><div></div><div></div>
      <div></div><div></div>
    </div>
    {props.children &&
      <div class="ml-08">
        { props.children }
      </div>
    }
  </div>
}