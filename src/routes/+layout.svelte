<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};
		window.gtag('js', new Date());
		window.gtag('config', 'G-ZBPJ4G8EN7');

		if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
			const script = document.createElement('script');
			script.async = true;
			script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZBPJ4G8EN7';
			document.head.appendChild(script);
		}
	});
</script>

<svelte:head>
	<title>Ivan J. Angulo Reyna - Software Developer</title>
</svelte:head>

<slot />
