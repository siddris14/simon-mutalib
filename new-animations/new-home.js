////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pre Load Images
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const preloadImages = () => {
	return new Promise((resolve, reject) => {
		imagesLoaded(document.querySelectorAll("img"), resolve);
	});
};
// then
preloadImages().then(() => {
	// remove loader
	document.body.classList.remove("loading");

	// Run the Page Animation
	initMasterAnimation();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page Master Timeline
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initMasterAnimation() {
	const masterTransition = gsap.timeline();

	const loaderAnimation = initLoadingScreen();
	const pageAnimation = initHomeAnimation();

	masterTransition.add(loaderAnimation);
	masterTransition.add(pageAnimation);

	return masterTransition;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Loading Animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initLoadingScreen() {
	const loader = select(".new-loading-content");
	const counter = selectID("new-counter");

	const smTitle = selectID("new-sm-title");
	const smTitleSplit = new SplitText(smTitle);

	const caption = select(".new-load-tag");
	const captionSplit = new SplitText(caption, { type: "chars lines words", linesClass: "loadCaptionChild" });
	new SplitText(caption, { type: "chars lines words", linesClass: "loadCaptionParent" });

	gsap.set(loader, { autoAlpha: 1 });

	// Timeline In
	const tlIn = gsap.timeline({ defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tlIn.from(smTitleSplit.chars, { y: 233, stagger: 0.08 });
	tlIn.from(counter, { y: 233 }, "<.3");
	tlIn.from(captionSplit.chars, { opacity: 0, stagger: { from: "random", each: 0.03 } }, "<.3");

	// Timeline Count
	const tlCount = gsap.timeline({ defaults: { duration: 5, ease: "none" } });

	tlCount.to(counter, { innerText: "100", snap: "innerText" }, "<.2");

	// Timeline Out
	const tlOut = gsap.timeline({ defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tlOut.to(smTitleSplit.chars, { y: -233, stagger: 0.08 }, "<.5");
	tlOut.to(counter, { y: -233, stagger: 0.08 }, "<.3");
	tlOut.to(captionSplit.lines, { y: 144, stagger: 0.05 }, "<");
	tlOut.to(".new-loading-screen", { xPercent: 105, ease: Expo.easeInOut }, "<1");
	tlOut.to(".new-loading-screen", { display: "none" }, "<1");

	// Master Timeline
	const masterTl = gsap.timeline({ id: "masterTl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });
	masterTl.add(tlIn);
	masterTl.add(tlCount);
	masterTl.add(tlOut);

	return masterTl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hero – welcome
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function heroReveal() {
	const logo = select(".new-logo");
	const navLinks = selectAll(".new-nav-link");

	const website = select(".new-footer-text");
	const websiteSplit = new SplitText(website);

	// Home titmeline
	const tl = new gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	gsap.set(".new-navbar", { autoAlpha: 1 });
	gsap.set(".new-footer", { autoAlpha: 1 });

	tl.from(logo, { y: 144 }, "<.1");
	tl.from(navLinks, { y: 144, stagger: 0.13 }, "<.1");
	tl.from(websiteSplit.chars, { y: 144, stagger: 0.02 }, "<");

	return tl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hero Slider
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initSliderHome() {
	gsap.set(".new-hero-container", { autoAlpha: 1 });
	gsap.set(".new-sliders-container", { autoAlpha: 1 });
	gsap.set(".new-slider", { opacity: 0, display: "flex" });

	let currentStep = 1;
	const totalSlides = selectAll(".new-slider").length;

	createTimelineIn("next", currentStep);

	// Timeline IN Animation
	function createTimelineIn(direction, index) {
		const goPrevious = direction === "previous";

		const SLIDER = select("div.slide0" + index);

		const title = SLIDER.querySelectorAll(".new-title-h0");
		const titleBlock = SLIDER.querySelectorAll(".new-slider-title");
		const ctaOpen = SLIDER.querySelectorAll(".new-slider-cta");
		const nextArrow = SLIDER.querySelectorAll(".new-arrow-next-link");
		const previousArrow = SLIDER.querySelectorAll(".new-arrow-previous-link");
		const brief = SLIDER.querySelectorAll(".new-slider-brief");

		const titleSplit = new SplitText(title);
		const brifSplit = new SplitText(brief, { type: "lines", linesClass: "slideBriefChild" });
		new SplitText(brief, { type: "lines", linesClass: "slideBriefParent" });

		const tlIn = gsap.timeline({ id: "tlIn", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

		tlIn.fromTo(SLIDER, { autoAlpha: 0 }, { autoAlpha: 1 }, "<.2");
		tlIn.fromTo(titleBlock, { y: -89, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05 }, "<.1");
		tlIn.fromTo(titleSplit.chars, { y: -144 }, { y: 0, stagger: 0.01 }, "<");
		tlIn.fromTo(brifSplit.lines, { y: 144 }, { y: 0, stagger: 0.13 }, "<");
		tlIn.fromTo(ctaOpen, { scale: 0, rotation: 45 }, { scale: 1, rotation: 0 }, "<.2");
		tlIn.fromTo(nextArrow, { x: -13, opacity: 0 }, { x: 0, opacity: 1 }, "<.1");
		tlIn.fromTo(previousArrow, { x: 13, opacity: 0 }, { x: 0, opacity: 1 }, "<");

		return tlIn;
	}

	//Timeline OUT Animation
	function createTimelineOut(direction, index) {
		const goPrevious = direction === "previous";

		const SLIDER = select("div.slide0" + index);

		const tlOut = gsap.timeline({ id: "tlOut", defaults: { duration: 0.55, ease: "myEaseSmooth" } });

		tlOut.to(SLIDER, { autoAlpha: 0 }, "<");

		// const title = SLIDER.querySelectorAll(".new-title-h0");
		// const titleBlock = SLIDER.querySelectorAll(".new-slider-title");
		// const brief = SLIDER.querySelectorAll(".new-slider-brief");

		// const titleSplit = new SplitText(title);
		// const brifSplit = new SplitText(brief, { type: "lines", linesClass: "slideBriefChild" });
		// new SplitText(brief, { type: "lines", linesClass: "slideBriefParent" });

		// tlOut.to(titleBlock, { y: 89, opacity: 0, duration: 1.34, stagger: { from: "end", axis: "y", each: 0.05 } }, "<");
		// tlOut.to(titleSplit.chars, { y: 144, duration: 1.34, stagger: { from: "end", axis: "y", each: 0.01 } }, "<");
		// tlOut.to(brifSplit.lines, { y: -144, duration: 1.34, stagger: 0.03 }, "<");

		// tlOut.set(titleBlock, { y: -89, opacity: 0 });
		// tlOut.set(titleSplit.chars, { y: -144 });
		// tlOut.set(brifSplit.lines, { y: 144 });

		return tlOut;
	}

	// Get goTo index
	function getGoToIndex(direction, index) {
		let goToIndex = index;

		if (direction === "next") {
			goToIndex = index < totalSlides ? index + 1 : 1;
		} else {
			goToIndex = index > 1 ? index - 1 : totalSlides;
		}

		return goToIndex;
	}

	// Update Current Step
	function updateCurrentStep(goToIndex) {
		currentStep = goToIndex;
	}

	//Master Timeline
	function transition(direction, index) {
		const goToIndex = getGoToIndex(direction, index);

		const tlTransition = gsap.timeline({
			onStart: () => {
				//console.log({ index }, { goToIndex });
				updateCurrentStep(goToIndex);
			},
		});

		const tlOut = createTimelineOut(direction, index);
		const tlIn = createTimelineIn(direction, goToIndex);

		tlTransition.add(tlOut);
		tlTransition.add(tlIn, "<");

		return tlTransition;
	}

	// Is Tweening
	function isTweening() {
		return gsap.isTweening(".new-slider");
	}

	// Next Arrow
	const arrowNext = selectAll(".new-arrow-next-link");

	arrowNext.forEach((arrow) => {
		arrow.addEventListener("click", (e) => {
			e.preventDefault();

			!isTweening() && transition("next", currentStep);
		});
	});

	// Previous Arrow
	const arrowPrevious = selectAll(".new-arrow-previous-link");

	arrowPrevious.forEach((arrow) => {
		arrow.addEventListener("click", (e) => {
			e.preventDefault();

			!isTweening() && transition("previous", currentStep);
		});
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Slider CTA Hover Animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sliderCtaHover() {
	const ctas = selectAll(".new-slider-cta");
	const ctaText = selectAll(".new-cta-text");
	const bgPurple = selectAll(".new-cta-bg-hover");

	const titles = selectAll(".new-slider-titles-wrap");
	const arrows = selectAll(".new-arrows");
	const description = selectAll(".new-slider-brief-wrap");

	const image = selectAll(".slider-image");
	const imageMask = selectAll(".slider-image-mask");
	const imageWrap = selectAll(".new-slider-image-wrap");

	gsap.set(image, { scale: 1.15 });
	gsap.set(imageWrap, { autoAlpha: 1 });
	gsap.set(imageMask, { scale: 1.15, rotationY: -55, opacity: 0 });

	ctas.forEach((cta) => {
		gsap.set(bgPurple, { yPercent: 101 });

		cta.addEventListener("mouseenter", () => {
			// cta in
			gsap.to(cta, { scale: 1.2, duration: 0.55, ease: "myEaseSmooth", delay: 0 });
			gsap.to(ctaText, { scale: 0.8, duration: 0.55, ease: "myEaseSmooth", delay: 0 });
			gsap.to(bgPurple, { yPercent: 0, duration: 0.55, stagger: 0.05, ease: "myEaseSmooth", delay: 0 });

			// titles out
			gsap.to([titles, arrows, description], { opacity: 0, duration: 0.55, ease: "myEaseSmooth", delay: 0 });

			// image in
			gsap.to(image, { scale: 1, duration: 0.89, ease: "myEaseSmooth", delay: 0.1 });
			gsap.to(imageMask, { opacity: 1, rotationY: 0, transformOrigin: "50% 50% -890", duration: 0.89, ease: "myEaseSmooth", delay: 0 });
		});

		cta.addEventListener("mouseleave", () => {
			// cta out
			gsap.to(cta, { scale: 1, duration: 0.55, ease: "myEaseSmooth" });
			gsap.to(ctaText, { scale: 1, duration: 0.55, ease: "myEaseSmooth", delay: 0 });
			gsap.to(bgPurple, { yPercent: 101, duration: 0.55, stagger: 0.05, ease: "myEaseSmooth", delay: 0 });

			// image out
			gsap.to(image, { scale: 1.15, duration: 0.89, ease: "myEaseSmooth", delay: 0 });
			gsap.to(imageMask, { opacity: 0, rotationY: 55, transformOrigin: "50% 50% -890", duration: 0.89, ease: "myEaseSmooth", delay: 0 });

			// titles in
			gsap.fromTo(
				[titles, arrows, description],
				{ x: -144, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.89, ease: "myEaseSmooth", delay: 0.3 }
			);

			// reset image position
			gsap.set(imageMask, { rotationY: -55, opacity: 0, duration: 0, delay: 1 });
		});
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Slider Arrows Hover Animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sliderArrowsHover() {
	// Next Arrow Hover
	function nextArrowHover() {
		const arrowNext = selectAll(".new-arrow-next-link");
		const next = selectAll(".new-arrow-next");

		arrowNext.forEach((arrow) => {
			arrow.addEventListener("mouseenter", (e) => {
				gsap.to(next, { xPercent: 100, duration: 0.55, ease: "myEaseSmooth" });
			});

			arrow.addEventListener("mouseleave", (e) => {
				gsap.to(next, { xPercent: 0, duration: 0.55, ease: "myEaseSmooth" });
			});
		});
	}

	// Previous Arrow Hover
	function previousArrowHover() {
		const arrowPrevious = selectAll(".new-arrow-previous-link");
		const previous = selectAll(".new-arrow-previous");

		arrowPrevious.forEach((arrow) => {
			arrow.addEventListener("mouseenter", (e) => {
				gsap.to(previous, { xPercent: -100, duration: 0.55, ease: "myEaseSmooth" });
			});

			arrow.addEventListener("mouseleave", (e) => {
				gsap.to(previous, { xPercent: 0, duration: 0.55, ease: "myEaseSmooth" });
			});
		});
	}

	nextArrowHover();
	previousArrowHover();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load all aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initHomeAnimation() {
	setTimeout(function () {
		heroReveal();
		initSliderHome();
		sliderCtaHover();
		sliderArrowsHover();
	}, 10000);
}
