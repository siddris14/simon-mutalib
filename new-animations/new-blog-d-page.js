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
	initBlogDetailsPage();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Title Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function titleReveal() {
	const title = select(".temp-title");
	const date = select(".temp-date");
	const category = select(".temp-category");

	const dateSplit = new SplitText(date);
	const categorySplit = new SplitText(category);

	const titleSplit = new SplitText(title, { type: "chars lines words", linesClass: "titleChild" });
	new SplitText(title, { type: "chars lines words", linesClass: "titleParent" });

	gsap.set(".new-temp-content", { autoAlpha: 1 });

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(titleSplit.lines, { y: 233, stagger: 0.13 });
	tl.from(dateSplit.chars, { y: 144, stagger: 0.02 }, "<");
	tl.from(categorySplit.chars, { y: 144, stagger: 0.02 }, "<.2");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hero Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function heroImageReveal() {
	const image = select(".temp-hero-image");
	const imageMask = select(".new-temp-hero-image");

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(image, { yPercent: 110, scale: 1.3, opacity: 0 });
	tl.from(imageMask, { yPercent: -101 }, "<");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Paragraph Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function heroParaReveal() {
	const para = select(".temp-h4-para");
	const trigger = select(".temp-h4-para-wrap");

	const paraSplit = new SplitText(para, { type: "chars lines words", linesClass: "paraChild" });
	new SplitText(para, { type: "chars lines words", linesClass: "paraParent" });

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(paraSplit.lines, { y: 144, stagger: 0.13 });

	ScrollTrigger.create({ trigger: trigger, start: "top 90%", animation: tl });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Image 1 Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function introImageOne() {
	const image = select(".temp-mid-image");
	const imageMask = select(".temp-mid-image-wrap");

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(image, { xPercent: 110, scale: 1.3, opacity: 0 });
	tl.from(imageMask, { xPercent: -101 }, "<");

	ScrollTrigger.create({ trigger: imageMask, start: "top 85%", animation: tl });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Image 2 Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function introImageTwo() {
	const image = select(".temp-last-image");
	const imageMask = select(".temp-last-image-wrap");

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(image, { xPercent: 110, scale: 1.3, opacity: 0 });
	tl.from(imageMask, { xPercent: -101 }, "<");

	ScrollTrigger.create({ trigger: imageMask, start: "top 85%", animation: tl });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Related Image Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function blogImageReveal() {
	const images = selectAll(".blog-thumb-image");
	const imagesMask = selectAll(".blog-image-wrap");

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(images, { xPercent: 110, scale: 1.3, opacity: 0, stagger: 0.08 });
	tl.from(imagesMask, { xPercent: -101, stagger: 0.08 }, "<");

	ScrollTrigger.create({ trigger: imagesMask, start: "top 85%", animation: tl });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load all aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initBlogDetailsPage() {
	setTimeout(function () {
		titleReveal();
		heroImageReveal();
		heroParaReveal();
		introImageOne();
		introImageTwo();
		blogImageReveal();
	}, 1200);
}
