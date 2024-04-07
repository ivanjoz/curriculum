import { downloadPdf, generateSVGChart } from "~/handlers/pdf-export"

export default function Home() {
  return <div style={{ padding: '16px' }}>
    <h1>hola</h1>
    <div id="svg-container"></div>
    <button onclick={ev => {
      ev.stopPropagation()
      generateSVGChart()
    }}>
      Generar SVG
    </button>
    <button onclick={ev => {
      ev.stopPropagation()
      downloadPdf()
    }}>
      Download
    </button>
  </div>
}