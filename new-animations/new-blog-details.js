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

	return tl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Title Reveal Aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function heroImageReveal() {
	const image = select(".temp-hero-image");
	const imageMask = select(".new-temp-hero-image");

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.from(image, { yPercent: 110, scale: 1.3, opacity: 0 });
	tl.from(imageMask, { yPercent: -101 }, "<");

	return tl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load all aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initBlogDetailsPage() {
	setTimeout(function () {
		titleReveal();
		heroImageReveal();
	}, 1200);
}

window.addEventListener("load", () => {
	initBlogDetailsPage();
});
