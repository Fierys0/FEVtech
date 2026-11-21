<script>
	import { Canvas } from '@threlte/core';
	import WatchScene from './WatchScene.svelte';

	let { url, interactive = false } = $props();
</script>

<div class="viewer">
	<Canvas>
		<WatchScene {url} {interactive} />
	</Canvas>
</div>

<style>
	.viewer {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
