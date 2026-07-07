<script lang="ts">
	import { onMount } from 'svelte';
	import { downloadPdf, generateSVGChart } from '../../handlers/pdf-maker';

	onMount(async () => {
		if (window.location.search.includes('accion=download')) {
			const base64pdf = await downloadPdf(true);
			window.localStorage.setItem('b64Pdf', base64pdf as string);
		}
	});
</script>

<svelte:head>
	<title>Generador PDF - Ivan J. Angulo</title>
	<meta name="robots" content="noindex,follow" />
</svelte:head>

<div class="p-4">
	<h1 class="mb-4 text-2xl font-semibold">Generador PDF</h1>
	<div id="svg-container"></div>
	<div class="mt-4 flex gap-2">
		<button
			class="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
			onclick={(event) => {
				event.stopPropagation();
				generateSVGChart();
			}}
		>
			Generar SVG
		</button>
		<button
			class="rounded-md bg-[#62528b] px-3 py-2 text-sm font-semibold text-white hover:bg-[#514373]"
			onclick={async (event) => {
				event.stopPropagation();
				const base64pdf = await downloadPdf(true);
				window.localStorage.setItem('b64Pdf', base64pdf as string);
			}}
		>
			Download
		</button>
	</div>
</div>
