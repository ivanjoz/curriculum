<script lang="ts">
	import { browser } from '$app/environment';
	import { parseSVG } from '../helpers';

	export let src: string;
	export let className = '';
	export let styleText = '';
	export let prerender = false;
	export let alt = '';

	$: isLoading = !prerender && !browser;
	$: imageSrc = parseSVG(src);
</script>

{#if isLoading}
	<div class={className}>Cargando...</div>
{:else}
	<img class={className} {alt} style={styleText} src={imageSrc} />
{/if}
