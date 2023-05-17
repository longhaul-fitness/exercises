<script>
	import './global.css';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	let ReloadPrompt;
	onMount(async () => {
		pwaInfo && (ReloadPrompt = (await import('$lib/components/ReloadPrompt.svelte')).default);
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}<!-- eslint-disable-line svelte/no-at-html-tags -->
</svelte:head>
<main class="u-container">
	<slot />
</main>

{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
