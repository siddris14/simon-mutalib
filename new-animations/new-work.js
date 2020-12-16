////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Clones Setup
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cloneWorkList(copies = 3) {
	let i = 1;

	while (i < copies) {
		let workList = document.getElementById("new-work-listing");
		let clone = workList.cloneNode(true);

		clone.id = "new-work-listing" + i;
		workList.after(clone);

		i++;
	}
}

cloneWorkList();

window.addEventListener("scroll", () => {
	if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
		cloneWorkList();
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Project Hover Animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function porjectReveal() {
	const titles = selectAll(".new-work-title-h1");
	const cards = selectAll(".new-work-link");
	const workArea = selectAll(".new-work-image-content");

	gsap.set(cards, { autoAlpha: 1 });
	gsap.set(titles, { yPercent: 103 });
	gsap.set(workArea, { autoAlpha: 1 });

	const tl = gsap.timeline({ id: "tlIn", defaults: { duration: 1.34, ease: "myEaseSmooth" } });
	tl.from(workArea, { yPercent: -102, ease: Expo.easeInOut });

	ScrollTrigger.batch([titles], {
		start: "top 108%",
		onEnter: (batch) => {
			gsap.to(batch, { yPercent: 0, duration: 1.34, ease: "myEaseSmooth", stagger: 0.08 });
		},
	});

	return tl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Project Hover Animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function projectHover() {
	let projectLinks = selectAll(".new-work-item");
	projectLinks.forEach((link) => {
		let card = link.querySelector(".new-work-link");
		let title = link.querySelector(".new-work-title-h1");
		let titleHover = link.querySelector(".new-work-title-h1-hover");

		let titleSplit = new SplitText(title, { type: "words chars" });
		let titleHoverSplit = new SplitText(titleHover, { type: "words chars" });

		gsap.set(titleHover, { display: "block" });
		gsap.set(titleHoverSplit.chars, { opacity: 0 });
		gsap.set(".new-work-listing", { autoAlpha: 1 });

		link.addEventListener("mouseenter", () => {

			gsap.to(titleSplit.chars, {
				yPercent: -100,
				rotationX: 90,
				duration: 0.55,
				transformOrigin: "50% 50%",
				stagger: 0.02,
				opacity: 0,
				ease: "myEaseSmooth",
			});

			gsap.to(titleHoverSplit.chars, {
				yPercent: -100,
				rotationX: -0,
				duration: 0.55,
				transformOrigin: "50% 50%",
				stagger: 0.02,
				opacity: 1,
				ease: "myEaseSmooth",
				delay: 0,
			});

			gsap.to(card, { x: 34, duration: 0.55, ease: "myEaseSmooth", delay: 0 });
		});

		link.addEventListener("mouseleave", () => {
			gsap.to(titleHoverSplit.chars, {
				yPercent: 0,
				rotationX: -90,
				duration: 0.55,
				transformOrigin: "50% 50%",
				stagger: 0.02,
				opacity: 0,
				ease: "myEaseSmooth",
			});

			gsap.to(titleSplit.chars, {
				yPercent: 0,
				rotationX: 0,
				duration: 0.55,
				transformOrigin: "50% 50%",
				stagger: 0.02,
				opacity: 1,
				ease: "myEaseSmooth",
				delay: 0,
			});

			gsap.to(card, { x: 0, duration: 0.55, ease: "myEaseSmooth", delay: 0 });
		});
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Project Image Hover Animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function projectImageHover() {
	let projectLinks = selectAll(".new-work-item");
	projectLinks.forEach((link) => {
		let image = link.querySelector(".new-work-image");
		let imageMask = link.querySelector(".new-work-image-wrap");

		gsap.set(image, { scale: 2, xPercent: 200 });
		gsap.set(imageMask, { xPercent: -101 });
		gsap.set(".new-work-image-content", { autoAlpha: 1 });

		link.addEventListener("mouseenter", () => {
			gsap.to(image, { scale: 1, xPercent: 0, duration: 0.89, ease: "myEaseSmooth" });
			gsap.to(imageMask, { xPercent: 0, duration: 0.89, ease: "myEaseSmooth", delay: 0 });
		});

		link.addEventListener("mouseleave", () => {
			gsap.to(image, { scale: 2, xPercent: 200, duration: 0.89, ease: "myEaseSmooth" });
			gsap.to(imageMask, { xPercent: -101, duration: 0.89, ease: "myEaseSmooth", delay: 0 });
		});
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load all aniamtions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initHomeAnimation() {
	setTimeout(function () {
		porjectReveal();
		projectHover();
		projectImageHover();
	}, 1800);
}

window.addEventListener("load", () => {
	initHomeAnimation();
});
