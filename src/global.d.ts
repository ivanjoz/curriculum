/// <reference types="@sveltejs/kit" />

interface Window {
	dataLayer: unknown[];
	gtag: (...args: unknown[]) => void;
}
