<script lang="ts">
	export let className = '';
</script>

<div class={`spinner1 flex ai-center ${className}`}>
	<div class="lds-spinner">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
	<div class="ml-08">
		<slot />
	</div>
</div>

<style>
	.lds-spinner,
	.lds-spinner div,
	.lds-spinner div:after {
		box-sizing: border-box;
	}

	.lds-spinner {
		color: currentColor;
		display: inline-block;
		position: relative;
		width: calc(80px / 1.6);
		height: calc(80px / 1.6);
	}

	.lds-spinner div {
		transform-origin: calc(40px / 1.6) calc(40px / 1.6);
		animation: lds-spinner 1.2s linear infinite;
	}

	.lds-spinner div:after {
		content: ' ';
		display: block;
		position: absolute;
		top: calc(3.2px / 1.6);
		left: calc(36.8px / 1.6);
		width: calc(6.4px / 1.6);
		height: calc(17.6px / 1.6);
		border-radius: calc(16px / 1.6);
		background: currentColor;
	}

	.lds-spinner div:nth-child(1) {
		transform: rotate(0deg);
		animation-delay: -1.1s;
	}

	.lds-spinner div:nth-child(2) {
		transform: rotate(30deg);
		animation-delay: -1s;
	}

	.lds-spinner div:nth-child(3) {
		transform: rotate(60deg);
		animation-delay: -0.9s;
	}

	.lds-spinner div:nth-child(4) {
		transform: rotate(90deg);
		animation-delay: -0.8s;
	}

	.lds-spinner div:nth-child(5) {
		transform: rotate(120deg);
		animation-delay: -0.7s;
	}

	.lds-spinner div:nth-child(6) {
		transform: rotate(150deg);
		animation-delay: -0.6s;
	}

	.lds-spinner div:nth-child(7) {
		transform: rotate(180deg);
		animation-delay: -0.5s;
	}

	.lds-spinner div:nth-child(8) {
		transform: rotate(210deg);
		animation-delay: -0.4s;
	}

	.lds-spinner div:nth-child(9) {
		transform: rotate(240deg);
		animation-delay: -0.3s;
	}

	.lds-spinner div:nth-child(10) {
		transform: rotate(270deg);
		animation-delay: -0.2s;
	}

	.lds-spinner div:nth-child(11) {
		transform: rotate(300deg);
		animation-delay: -0.1s;
	}

	.lds-spinner div:nth-child(12) {
		transform: rotate(330deg);
		animation-delay: 0s;
	}

	.card-c3 {
		background-color: #44495e;
		width: 24rem;
		border-radius: 7px;
		padding: 6px 12px;
		color: white;
	}

	@keyframes lds-spinner {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
</style>
