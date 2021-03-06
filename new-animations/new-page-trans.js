////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page Delay Settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Set Delay Time
let delayTime = 1600;

// Nav Links
$(".new-nav-link").click(function (e) {
	e.preventDefault();
	let goTo = this.getAttribute("href");

	setTimeout(function () {
		window.location = goTo;
	}, delayTime);
});

// Logo Links
$(".new-nav-logo").click(function (e) {
	e.preventDefault();
	let goTo = this.getAttribute("href");

	setTimeout(function () {
		window.location = goTo;
	}, delayTime);
});

// Slider CTA Links
$(".new-slider-cta").click(function (e) {
	e.preventDefault();
	let goTo = this.getAttribute("href");

	setTimeout(function () {
		window.location = goTo;
	}, delayTime);
});

// Blog Cards Links
$(".blog-card").click(function (e) {
	e.preventDefault();
	let goTo = this.getAttribute("href");

	setTimeout(function () {
		window.location = goTo;
	}, delayTime);
});

// Works Cards Links
$(".new-work-link").click(function (e) {
	e.preventDefault();
	let goTo = this.getAttribute("href");

	setTimeout(function () {
		window.location = goTo;
	}, delayTime);
});

// Next Project Links
$(".temp-next-card-wrap").click(function (e) {
	e.preventDefault();
	let goTo = this.getAttribute("href");

	setTimeout(function () {
		window.location = goTo;
	}, delayTime);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Call Transition on Specific Elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function navLinksClick() {
	const navLinks = selectAll(".new-nav-link");

	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			pageTransitionIn();
		});
	});
}

navLinksClick();

function logoLinkClick() {
	const logoLinks = selectAll(".new-nav-logo");

	logoLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			pageTransitionIn();
		});
	});
}

logoLinkClick();

function sliderCtaLink() {
	const logoLinks = selectAll(".new-slider-cta");

	logoLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			pageTransitionIn();
		});
	});
}

sliderCtaLink();

function blogCardClick() {
	const blogCardsLink = selectAll(".blog-card");

	blogCardsLink.forEach((link) => {
		link.addEventListener("click", (e) => {
			pageTransitionIn();
		});
	});
}

blogCardClick();

function workListClick() {
	const blogCardsLink = selectAll(".new-work-link");

	blogCardsLink.forEach((link) => {
		link.addEventListener("click", (e) => {
			pageTransitionIn();
		});
	});
}

workListClick();

function nextProjectClick() {
	const blogCardsLink = selectAll(".temp-next-card-wrap");

	blogCardsLink.forEach((link) => {
		link.addEventListener("click", (e) => {
			pageTransitionIn();
		});
	});
}

nextProjectClick();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page Transition
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function pageTransitionIn() {
	const pageTrans = select(".new-page-transition");
	const making = select(".new-trans-title");
	const arrow = select(".new-trans-arrow");

	const makingSplit = new SplitText(making, { type: "lines", linesClass: "makingChild" });
	new SplitText(making, { type: "lines", linesClass: "makingParent" });

	gsap.set(pageTrans, { yPercent: 103, autoAlpha: 1, display: "flex" });

	const tl = gsap.timeline({ defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.to(pageTrans, { yPercent: 0, ease: Expo.easeInOut });
	tl.from(makingSplit.lines, { y: 233, stagger: 0.08 }, "<.7");
	tl.from(arrow, { yPercent: 105 }, "<");

	return tl;
}

function pageTransitionOut() {
	const pageTrans = select(".new-page-transition");
	const making = select(".new-trans-title");
	const arrow = select(".new-trans-arrow");

	const makingSplit = new SplitText(making, { type: "lines", linesClass: "makingChild" });
	new SplitText(making, { type: "lines", linesClass: "makingParent" });

	gsap.set(pageTrans, { autoAlpha: 1, display: "flex" });

	const tl = gsap.timeline({ defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	tl.to(makingSplit.lines, { y: -233, stagger: 0.08 });
	tl.to(arrow, { yPercent: -105 }, "<");
	tl.to(pageTrans, { yPercent: -103, ease: Expo.easeInOut }, "<");
	tl.set(pageTrans, { autoAlpha: 0 }, "<1");

	tl.set(makingSplit.lines, { y: 0 });
	tl.set(arrow, { yPercent: 0 });

	return tl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", () => {
	setTimeout(function () {
		pageTransitionOut();
	}, 800);
});
