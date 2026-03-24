// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animation Timeline
const tl = gsap.timeline();

// ===== FLOWER GROWTH ANIMATION =====
const flowerAnim = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-section",
        start: "top center",
        end: "center center",
        scrub: 1,
        markers: false
    }
});

// Flower grows from 0 to 1 on scroll
flowerAnim.fromTo(
    ".flower",
    {
        scale: 0.3,
        opacity: 0.5
    },
    {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.inOut"
    },
    0
);

// Subtle rotation during growth for dynamic effect
flowerAnim.to(
    ".flower",
    {
        rotate: 5,
        duration: 2,
        ease: "sine.inOut"
    },
    0
);

// ===== PIGEON 1 LANDING ANIMATION =====
const pigeon1Timeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-section",
        start: "center center",
        end: "80% center",
        scrub: 1,
        markers: false
    }
});

pigeon1Timeline
    .fromTo(
        ".pigeon1",
        {
            x: -400,
            y: -300,
            opacity: 0,
            rotate: 45
        },
        {
            x: -120,
            y: 80,
            opacity: 1,
            rotate: -5,
            duration: 2,
            ease: "power2.out"
        },
        0
    )
    .to(
        ".pigeon1",
        {
            y: 100,
            rotate: -8,
            duration: 0.5,
            ease: "back.out"
        },
        1.5
    );

// ===== PIGEON 2 LANDING ANIMATION =====
const pigeon2Timeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-section",
        start: "center center",
        end: "80% center",
        scrub: 1,
        markers: false
    }
});

pigeon2Timeline
    .fromTo(
        ".pigeon2",
        {
            x: 400,
            y: -350,
            opacity: 0,
            rotate: -45
        },
        {
            x: 120,
            y: 90,
            opacity: 1,
            rotate: 5,
            duration: 2,
            ease: "power2.out"
        },
        0.2
    )
    .to(
        ".pigeon2",
        {
            y: 110,
            rotate: 8,
            duration: 0.5,
            ease: "back.out"
        },
        1.7
    );

// ===== POOP ANIMATION =====
const poopTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-section",
        start: "75% center",
        end: "100% center",
        scrub: 1,
        markers: false
    }
});

poopTimeline
    .to("#poop1", { opacity: 1, y: 10, duration: 0.5 }, 0)
    .to("#poop2", { opacity: 1, y: 8, duration: 0.5 }, 0.1)
    .to("#poop3", { opacity: 1, y: 12, duration: 0.5 }, 0.2)
    .to("#poop4", { opacity: 1, y: 9, duration: 0.5 }, 0.3);

// ===== WIND EFFECT (CONTINUOUS) =====
const windEffect = gsap.timeline({ repeat: -1 });

windEffect
    .to(".flower", {
        rotate: 2,
        duration: 3,
        ease: "sine.inOut"
    }, 0)
    .to(".flower", {
        rotate: -2,
        duration: 3,
        ease: "sine.inOut"
    }, 3)
    .to(".pigeon1", {
        rotate: -8,
        x: -125,
        duration: 2.5,
        ease: "sine.inOut"
    }, 0.5, "<")
    .to(".pigeon1", {
        rotate: -2,
        x: -115,
        duration: 2.5,
        ease: "sine.inOut"
    }, 3);

// Pause wind effect during scroll animations, resume after
ScrollTrigger.create({
    trigger: ".scroll-section",
    start: "center center",
    end: "80% center",
    onUpdate: (self) => {
        if (self.isActive && windEffect.paused() === false) {
            windEffect.pause();
        }
    }
});

ScrollTrigger.create({
    trigger: ".scroll-section",
    start: "85% center",
    onUpdate: (self) => {
        if (self.isActive && windEffect.paused() === true) {
            windEffect.resume();
        }
    }
});

// ===== LANDSCAPE SCROLL EFFECT =====
gsap.to(".sunset-gradient", {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        markers: false
    },
    backgroundPosition: "0 100%",
    ease: "none"
});

// ===== PARALLAX EFFECT FOR GROUND =====
gsap.to(".ground", {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        markers: false
    },
    y: 50,
    ease: "none"
});

console.log("✓ Animation initialized with GSAP & ScrollTrigger");
