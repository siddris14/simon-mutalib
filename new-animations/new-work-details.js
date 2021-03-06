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
	initWorkDetailsPageAnimation();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Title Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function titleReveal() {
	const title = select("#work-title");
	const year = select("#work-year");
	const brief = select(".work-temp-desc-text");

	const briefSplit = new SplitText(brief, { type: "lines", linesClass: "briefChild" });
	new SplitText(brief, { type: "lines", linesClass: "briefParent" });

	gsap.set(".new-work-temp-content", { autoAlpha: 1 });

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(title, { y: 233 });
	tl.from(year, { y: 233 }, "<0.13");
	tl.from(briefSplit.lines, { y: 89, stagger: 0.13 }, "<");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hero Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function heroImageReveal() {
	const image = select(".work-temp-image");
	const imageMask = select(".work-temp-image-wrap");

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(image, { xPercent: 110, scale: 1.3, opacity: 0 });
	tl.from(imageMask, { xPercent: -101 }, "<");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Summary Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function summaryReveal() {
	const summary = select(".temp-summary-text");

	const summarySplit = new SplitText(summary, { type: "lines", linesClass: "summaryChild" });
	new SplitText(summary, { type: "lines", linesClass: "summaryParent" });

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(summarySplit.lines, { y: 233, stagger: 0.13 });

	ScrollTrigger.create({ trigger: summary, start: "top 100%", animation: tl });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge & Solution Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function challengeSolution() {
	const challenges = selectAll(".temp-app-details-text");

	challenges.forEach((line) => {
		const lineSplit = new SplitText(line, { type: "lines", linesClass: "lineChild" });
		new SplitText(line, { type: "lines", linesClass: "lineParent" });

		const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

		tl.from(lineSplit.lines, { y: 233, stagger: 0.13 });

		ScrollTrigger.create({ trigger: line, start: "top 95%", animation: tl });
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// View CTA Hover Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function viewProjectCtaHover() {
	const cta = select(".temp-view-cta-mask");
	const bgPurple = selectAll(".temp-view-cta");

	gsap.set(bgPurple, { yPercent: 101 });

	cta.addEventListener("mouseenter", () => {
		// cta in
		gsap.to(cta, { scale: 0.8, duration: 0.55, ease: "myEaseSmooth", delay: 0 });
		gsap.to(bgPurple, { yPercent: 0, duration: 0.55, stagger: 0.05, ease: "myEaseSmooth", delay: 0 });
	});

	cta.addEventListener("mouseleave", () => {
		// cta out
		gsap.to(cta, { scale: 1, duration: 0.55, ease: "myEaseSmooth" });
		gsap.to(bgPurple, { yPercent: -101, duration: 0.55, stagger: { from: "end", each: 0.05 }, ease: "myEaseSmooth", delay: 0 });

		gsap.set(bgPurple, { yPercent: 101, duration: 0, delay: 1 });
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Project Image Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function projectImagesReveal() {
	const imagesItem = selectAll(".works-temp-img-item");

	imagesItem.forEach((item) => {
		const image = item.querySelector(".temp-image");

		const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

		tl.from(image, { opacity: 0, y: 233 });

		ScrollTrigger.create({ trigger: image, start: "top 95%", animation: tl });
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stats Pin Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function statsPinReveal() {
	let statsWrap = select(".temp-stats-wrap");
	let statsWrapWidth = statsWrap.offsetWidth;
	let statsHorizontalLength = statsWrapWidth - window.innerWidth;

	const tl = gsap.timeline();

	tl.to(statsWrap, {
		x: -statsHorizontalLength,

		scrollTrigger: {
			trigger: "#stats-section",
			scrub: 1,
			pin: true,
			pinReparent: true,
			start: "top 0%",
			end: statsWrapWidth,
		},
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load all aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initWorkDetailsPageAnimation() {
	setTimeout(function () {
		titleReveal();
		heroImageReveal();
		summaryReveal();
		challengeSolution();
		viewProjectCtaHover();
		projectImagesReveal();
		statsPinReveal();
	}, 1200);
}
