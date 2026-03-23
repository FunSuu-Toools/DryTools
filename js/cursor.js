const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
});

// Smooth trailing effect
function animate() {
    outlineX += (mouseX - outlineX) * 0.5;
    outlineY += (mouseY - outlineY) * 0.5;

    outline.style.left = outlineX + "px";
    outline.style.top = outlineY + "px";

    requestAnimationFrame(animate);
}

animate();

// Hover grow effect
document.querySelectorAll("a, .glass-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
        outline.style.transform = "translate(-50%, -50%) scale(1.6)";
    });

    el.addEventListener("mouseleave", () => {
        outline.style.transform = "translate(-50%, -50%) scale(1)";
    });
});

if (window.innerWidth < 768) {
    document.querySelector(".cursor-dot").style.display = "none";
    document.querySelector(".cursor-outline").style.display = "none";
    document.body.style.cursor = "default";
}
