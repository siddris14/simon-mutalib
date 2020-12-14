////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page Enterance Animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function contactEnter() {
	const address = select(".new-contact-address");
	const email = select(".new-contact-email");
	const image = select(".new-contact-image");
	const imageMask = select(".new-contact-image-wrap");

	const addressSplit = new SplitText(address, { type: "chars lines words", linesClass: "addressChild" });
	new SplitText(address, { type: "chars lines words", linesClass: "addressParent" });

	const emailSplit = new SplitText(email);

	const tl = gsap.timeline({ id: "tl", defaults: { duration: 1.34, ease: "myEaseSmooth" } });

	gsap.set(".new-contact-content", { autoAlpha: 1 });

	tl.from(addressSplit.chars, { y: 144, opacity: 0, rotationX: 90, transformOrigin: "10% bottom", stagger: 0.02 });
	tl.from(emailSplit.chars, { y: 144, stagger: 0.02 }, "<.2");
	tl.from(image, { xPercent: -130, scale: 1.3 }, "<.1");
	tl.from(imageMask, { xPercent: 101 }, "<");

	return tl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Email Hover Animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function emailHover() {
	//
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load all aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initContactReveal() {
	setTimeout(function () {
		contactEnter();
		emailHover();
	}, 1200);
}

window.addEventListener("load", () => {
	initContactReveal();
});
