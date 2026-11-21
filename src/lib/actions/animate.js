/**
 * Scroll-triggered reveal animation (Svelte action)
 * Usage: <div use:reveal={{ delay: 200, y: 30 }}>
 */
export function reveal(node, options = {}) {
	const {
		delay = 0,
		duration = 700,
		y = 30,
		x = 0,
		once = true,
		threshold = 0.1,
		scale = 1
	} = typeof options === 'number' ? { delay: options } : options;

	if (typeof window === 'undefined') return { destroy() {} };

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		return { destroy() {} };
	}

	const startScale = scale !== 1 ? scale : 1;
	node.style.opacity = '0';
	node.style.transform = `translate(${x}px, ${y}px) scale(${startScale})`;
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
	node.style.willChange = 'opacity, transform';

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translate(0, 0) scale(1)';
					if (once) observer.unobserve(node);
					setTimeout(() => {
						node.style.willChange = 'auto';
					}, duration + delay + 100);
				}
			});
		},
		{ threshold, rootMargin: '0px 0px -40px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}

/**
 * Parallax scroll effect (Svelte action)
 * Usage: <div use:parallax={0.08}>
 */
export function parallax(node, speed = 0.08) {
	if (typeof window === 'undefined') return { destroy() {} };

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return { destroy() {} };

	let ticking = false;

	function update() {
		const scrollY = window.scrollY;
		node.style.transform = `translateY(${scrollY * -speed}px)`;
		ticking = false;
	}

	function handleScroll() {
		if (!ticking) {
			requestAnimationFrame(update);
			ticking = true;
		}
	}

	window.addEventListener('scroll', handleScroll, { passive: true });

	return {
		destroy() {
			window.removeEventListener('scroll', handleScroll);
		}
	};
}

