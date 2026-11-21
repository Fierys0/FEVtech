<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import * as THREE from 'three';

	let { url, interactive = false } = $props();

	let loadedGroup = $state(null);
	let loading = $state(true);

	const loader = new GLTFLoader();

	$effect(() => {
		if (!url) return;
		let active = true;
		loading = true;
		loadedGroup = null;

		loader.load(
			url,
			(gltf) => {
				if (!active) return;
				const scene = gltf.scene;

				// Calculate bounding box and bounding sphere
				const box = new THREE.Box3().setFromObject(scene);
				const sphere = new THREE.Sphere();
				box.getBoundingSphere(sphere);

				// Target visual radius in scene units: 1.25 gives a prominent, large, zoomed-in look
				const targetRadius = 1.25;
				const s = sphere.radius > 0 ? targetRadius / sphere.radius : 1;

				// Center the model relative to the group origin
				scene.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);

				// Wrap in a group and scale to standard visual size
				const group = new THREE.Group();
				group.add(scene);
				group.scale.set(s, s, s);

				loadedGroup = group;
				loading = false;
			},
			undefined,
			(error) => {
				console.error('Error loading watch model:', url, error);
				loading = false;
			}
		);

		return () => {
			active = false;
		};
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0.35, 2.6]} fov={35}>
	<OrbitControls
		autoRotate
		autoRotateSpeed={interactive ? 0.8 : 1.6}
		enableZoom={interactive}
		enableRotate={interactive}
		enablePan={false}
		maxDistance={4.5}
		minDistance={0.8}
	/>
</T.PerspectiveCamera>

<!-- Studio Lighting for Watches -->
<T.AmbientLight intensity={1.5} />
<T.DirectionalLight position={[5, 8, 5]} intensity={2.2} />
<T.DirectionalLight position={[-4, 5, -3]} intensity={1.2} />
<T.DirectionalLight position={[0, -2, 4]} intensity={0.6} />
<T.PointLight position={[0, 2, 2.5]} intensity={0.8} color="#fff8ea" />

{#if loadedGroup}
	<T is={loadedGroup} />
{/if}
