<script lang="ts">
	import style from '../styles/main.module.css';

	export let src: string;
	export let placeHolder: string;
	export let className = '';
	export let alt = '';
</script>

<div class={`${style.image_placeholder_ctn} ${className}`}>
	<img src={placeHolder} loading="lazy" alt="" />
	<img {src} {alt} />
</div>
