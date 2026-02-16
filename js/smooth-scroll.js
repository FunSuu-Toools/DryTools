let currentScroll = 0;
let targetScroll = 0;
let ease = 0.06; // smaller = smoother, slower

// Disable default smooth behavior
document.documentElement.style.scrollBehavior = "auto";

// Get max scroll height
function getMaxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

// Mouse wheel support
window.addEventListener("wheel", (e) => {
  targetScroll += e.deltaY;
  targetScroll = Math.max(0, Math.min(targetScroll, getMaxScroll()));
});

// Touch support (mobile)
let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  const touchY = e.touches[0].clientY;
  const delta = touchStartY - touchY;

  targetScroll += delta;
  targetScroll = Math.max(0, Math.min(targetScroll, getMaxScroll()));

  touchStartY = touchY;
});

// Animation loop
function smoothScroll() {
  currentScroll += (targetScroll - currentScroll) * ease;
  window.scrollTo(0, currentScroll);
  requestAnimationFrame(smoothScroll);
}

smoothScroll();
