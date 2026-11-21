<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import * as THREE from 'three';

	let { url, interactive = true, autoRotate = true, onLoaded = () => {} } = $props();

	let loadedGroup = $state(null);
	let loading = $state(true);
	let controlsRef = $state(null);

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
				onLoaded();
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

<T.PerspectiveCamera makeDefault position={[0, 0.35, 2.75]} fov={34}>
	<OrbitControls
		bind:ref={controlsRef}
		{autoRotate}
		autoRotateSpeed={autoRotate ? 1.2 : 0}
		enableZoom={interactive}
		enableRotate={interactive}
		enablePan={false}
		maxDistance={4.5}
		minDistance={1.1}
	/>
</T.PerspectiveCamera>

<!-- Studio Horological Lighting -->
<T.AmbientLight intensity={1.4} />
<T.DirectionalLight position={[5, 8, 5]} intensity={2.4} />
<T.DirectionalLight position={[-4, 5, -3]} intensity={1.4} />
<T.DirectionalLight position={[0, -2, 4]} intensity={0.8} />
<T.PointLight position={[0, 2.5, 3]} intensity={1.1} color="#fff8ee" />
<T.PointLight position={[-2.5, -1, -2]} intensity={0.6} color="#e0f2fe" />

{#if loadedGroup}
	<T is={loadedGroup} />
{/if}
