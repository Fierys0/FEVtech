<script>
	import { Canvas } from '@threlte/core';
	import { onMount } from 'svelte';
	import WatchScene from './WatchScene.svelte';

	let { url, interactive = true, autoRotate = true, onLoaded = () => {} } = $props();
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<div class="viewer">
	{#if mounted}
		<Canvas>
			<WatchScene {url} {interactive} {autoRotate} {onLoaded} />
		</Canvas>
	{/if}
</div>

<style>
	.viewer {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
