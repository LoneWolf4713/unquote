// Animate main sections (.section-with-divider)
gsap.utils.toArray('.section-with-divider').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

gsap.from(".heading", {
  opacity: 0,
  y: -80,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".heading",
    start: "top 90%",
    toggleActions: "play none none reverse"
  }
});
