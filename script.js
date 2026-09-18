const header = document.querySelector(".site-header");
const revealTargets = document.querySelectorAll(".reveal");

const updateHeader = () => {
  header.dataset.elevated = window.scrollY > 16 ? "true" : "false";
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
);

revealTargets.forEach((target) => observer.observe(target));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
