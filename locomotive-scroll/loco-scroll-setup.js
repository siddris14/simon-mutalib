////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//This code comes BEFORE your animations
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const scrollContainer = ".new-simonmutalib";

const locoScroll = new LocomotiveScroll({
	el: document.querySelector(scrollContainer),
	smooth: true,
	lerp: 0.05,
});

// Update ScrollTrigger on scroll
locoScroll.on("scroll", ScrollTrigger.update);

// ScrollTrigger use ScrollProxy Method
ScrollTrigger.scrollerProxy(scrollContainer, {
	scrollTop(value) {
		return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	},

	getBoundingClientRect() {
		return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
	},

	// Pin with Position: Fixed on mobile
	pinType: document.querySelector(scrollContainer).style.transform ? "transform" : "fixed",
});
