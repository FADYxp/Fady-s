import { useEffect, useRef, useState } from "react";

const SCROLL_PER_SECTION = 1.15;
const SCROLL_EASE = 0.017;
const SNAP_DELAY = 260;
const SNAP_DURATION = 1800;
const SNAP_THRESHOLD = 0.35;
const ENTRY_DIRECTIONS = [
	{ x: 1, y: 0 },
	{ x: -1, y: 0 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
];

function getProgress(scrollPosition, viewportHeight, sectionCount) {
	if (!viewportHeight || sectionCount < 2) return 0;

	return Math.min(
		sectionCount - 1,
		Math.max(0, scrollPosition / (viewportHeight * SCROLL_PER_SECTION)),
	);
}

function LayerContent({ children }) {
	return <div className="relative z-10 min-h-full">{children}</div>;
}

export default function StackSection({ sections }) {
	const layerRefs = useRef([]);
	const backgroundRefs = useRef([]);
	const ledgerRefs = useRef([]);
	const ledgerLabelRefs = useRef([]);
	const targetScroll = useRef(0);
	const easedScroll = useRef(0);
	const activeIndex = useRef(0);
	const [ledgerCompact, setLedgerCompact] = useState(false);
	const [ledgerHovered, setLedgerHovered] = useState(false);

	useEffect(() => {
		if (sections.length < 2) return undefined;

		let frameId;
		let isRunning = true;
		let snapTimer;
		let snapFrame;
		let isSnapping = false;

		const animateSnap = (targetTop) => {
			window.cancelAnimationFrame(snapFrame);
			isSnapping = true;
			const startTop = window.scrollY;
			const startTime = performance.now();

			const step = (now) => {
				const elapsed = Math.min(1, (now - startTime) / SNAP_DURATION);
				const eased = elapsed * elapsed * elapsed * (elapsed * (elapsed * 6 - 15) + 10);
				const nextTop = startTop + (targetTop - startTop) * eased;

				targetScroll.current = nextTop;
				window.scrollTo(0, nextTop);

				if (elapsed < 1) {
					snapFrame = window.requestAnimationFrame(step);
					return;
				}

				targetScroll.current = targetTop;
				isSnapping = false;
			};

			snapFrame = window.requestAnimationFrame(step);
		};

		const interruptSnap = () => {
			if (!isSnapping) return;
			window.cancelAnimationFrame(snapFrame);
			isSnapping = false;
			targetScroll.current = window.scrollY;
		};

		const updateTarget = () => {
			targetScroll.current = window.scrollY;
			if (isSnapping) return;
			setLedgerCompact(false);
			window.clearTimeout(snapTimer);
			snapTimer = window.setTimeout(() => {
				setLedgerCompact(true);
				const sectionDistance = window.innerHeight * SCROLL_PER_SECTION;
				const rawProgress = window.scrollY / sectionDistance;
				const lowerIndex = Math.floor(rawProgress);
				const fraction = rawProgress - lowerIndex;
				const targetIndex = Math.min(
					sections.length - 1,
					fraction > SNAP_THRESHOLD ? lowerIndex + 1 : lowerIndex,
				);
				const targetTop = targetIndex * sectionDistance;

				if (Math.abs(window.scrollY - targetTop) > 2) {
					animateSnap(targetTop);
				}
			}, SNAP_DELAY);
		};

		const render = () => {
			if (!isRunning) return;

			easedScroll.current +=
				(targetScroll.current - easedScroll.current) * SCROLL_EASE;

			const progress = getProgress(
				easedScroll.current,
				window.innerHeight,
				sections.length,
			);
			activeIndex.current = Math.min(
				sections.length - 1,
				Math.max(0, Math.round(progress)),
			);

			layerRefs.current.forEach((layer, index) => {
				if (!layer) return;

				const distance = index - progress;
				const isNearActive = Math.abs(distance) < 0.5;
				const direction = ENTRY_DIRECTIONS[index % ENTRY_DIRECTIONS.length];
				const amount = Math.min(1, Math.abs(distance));
				const directionMultiplier = distance > 0 ? 1 : -1;
				const translateX = direction.x * amount * directionMultiplier * 10;
				const translateY = direction.y * amount * directionMultiplier * 10;
				const layerOpacity = distance <= 0
					? Math.max(0, 1 - amount * 1.8)
					: Math.max(0, 1 - amount);
				const transform = `translate3d(${translateX}%, ${translateY}%, 0) scale(${1 - amount * 0.025})`;
				const filter = `blur(${amount * 0.8}px)`;

				layer.style.transform = transform;
				layer.style.opacity = String(layerOpacity);
				layer.style.filter = "none";
				layer.style.zIndex = String(
					isNearActive ? 100 : distance > 0 ? 80 - index : 20 - index,
				);
				layer.style.pointerEvents = isNearActive ? "auto" : "none";
				layer.dataset.active = isNearActive ? "true" : "false";

				const background = backgroundRefs.current[index];
				if (background) {
					background.style.backdropFilter = filter;
					background.style.webkitBackdropFilter = filter;
				}
			});

			ledgerRefs.current.forEach((item, index) => {
				if (!item) return;
				const isActive = index === activeIndex.current;
				item.style.width = isActive ? "2.75rem" : "1rem";
				item.style.opacity = isActive ? "1" : "0.42";
				const label = ledgerLabelRefs.current[index];
				if (label) label.style.opacity = isActive ? "1" : "0.5";
			});

			frameId = window.requestAnimationFrame(render);
		};

		updateTarget();
		easedScroll.current = targetScroll.current;
		window.addEventListener("scroll", updateTarget, { passive: true });
		window.addEventListener("wheel", interruptSnap, { passive: true });
		window.addEventListener("touchstart", interruptSnap, { passive: true });
		frameId = window.requestAnimationFrame(render);

		return () => {
			isRunning = false;
			window.cancelAnimationFrame(frameId);
			window.cancelAnimationFrame(snapFrame);
			window.clearTimeout(snapTimer);
			window.removeEventListener("scroll", updateTarget);
			window.removeEventListener("wheel", interruptSnap);
			window.removeEventListener("touchstart", interruptSnap);
		};
	}, [sections.length]);

	const scrollToSection = (index) => {
		window.scrollTo({
			top: index * SCROLL_PER_SECTION * window.innerHeight,
			behavior: "smooth",
		});
	};

	return (
		<div
			className="relative"
			style={{ height: `${sections.length * SCROLL_PER_SECTION * 100}vh` }}
		>
			<div
				className="sticky top-0 z-10 h-screen min-h-[100svh] overflow-hidden"
				style={{ isolation: "isolate" }}
			>
				{sections.map((section, index) => (
					<div
						key={section.name}
						id={section.id}
						ref={(layer) => {
							layerRefs.current[index] = layer;
						}}
						data-active={index === 0 ? "true" : "false"}
						className="stack-layer absolute inset-0 h-screen overflow-x-hidden overflow-y-auto will-change-transform [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
						style={{
							transformOrigin: "50% 50%",
							backfaceVisibility: "hidden",
						}}
					>
						<div
							ref={(background) => {
								backgroundRefs.current[index] = background;
							}}
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 z-0 bg-black/10"
							style={{
								backdropFilter: "blur(0px)",
								WebkitBackdropFilter: "blur(0px)",
							}}
						/>
						<LayerContent>
							{section.content}
						</LayerContent>
					</div>
				))}

				<nav
						aria-label="Section navigation"
						className="absolute right-4 top-1/2 z-[1000] flex -translate-y-1/2 flex-col items-end gap-4 md:right-8"
						onMouseEnter={() => setLedgerHovered(true)}
						onMouseLeave={() => {
							setLedgerHovered(false);
						}}
					>
						{sections.map((section, index) => (
							<button
								key={section.name}
								type="button"
								aria-label={`Go to ${section.name}`}
								onClick={() => scrollToSection(index)}
									className="ledger-button group flex min-h-5 origin-right items-center gap-2 text-right"
									style={{
										transform:
											ledgerCompact && !ledgerHovered
												? "translate3d(1.25rem, 0, 0) scale(0.72)"
												: "translate3d(0, 0, 0) scale(1)",
												opacity: ledgerCompact && !ledgerHovered ? 0.5 : 1,
										transition:
											"transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",
										transitionDelay: `${index * 90}ms`,
									}}
							>
								<span
									ref={(label) => {
										ledgerLabelRefs.current[index] = label;
									}}
									className="text-[10px] font-mono uppercase tracking-[0.2em] text-white transition-opacity duration-300 group-hover:opacity-100"
									style={{ opacity: index === 0 ? "1" : "0.5" }}
								>
									{section.name}
								</span>
								<span
									ref={(item) => {
										ledgerRefs.current[index] = item;
									}}
									className="block h-px bg-teal-300 transition-[width,opacity] duration-300"
									style={{ width: index === 0 ? "2.75rem" : "1rem" }}
								/>
							</button>
						))}
				</nav>
			</div>
		</div>
	);
}
