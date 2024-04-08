import { createEffect } from 'solid-js';
import { downloadPdf, generateSVGChart } from '~/handlers/pdf-maker';

export default function PdfPage() {

  createEffect(async () => {
    if(window.location.search.includes("accion=download")){
      const base64pdf = await downloadPdf(true)
      window.localStorage.setItem("b64Pdf",base64pdf as string)
    }
  })

  return <div style={{ padding: '16px' }}>
    <h1>hola</h1>
    <div id="svg-container"></div>
    <button onclick={ev => {
      ev.stopPropagation()
      generateSVGChart()
    }}>
      Generar SVG
    </button>
    <button onclick={async (ev) => {
      ev.stopPropagation()
      const base64pdf = await downloadPdf(true)
      window.localStorage.setItem("b64Pdf",base64pdf as string)
    }}>
      Download
    </button>
  </div>
}
