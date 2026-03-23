const video = document.getElementById("bg-video");
const videoSource = document.getElementById("video-source");
const themeSwitch = document.getElementById("theme-switch");

const DARK_VIDEO = "/assets/videos/background-vid.mp4";
const LIGHT_VIDEO = "/assets/videos/light-theme-background.mp4";

function setTheme(mode) {

    if (mode === "light") {
        document.body.classList.add("light-mode");
        videoSource.src = LIGHT_VIDEO;
        themeSwitch.checked = true;
    } else {
        document.body.classList.remove("light-mode");
        videoSource.src = DARK_VIDEO;
        themeSwitch.checked = false;
    }

    video.load();
    video.play();

    localStorage.setItem("theme", mode);
}

themeSwitch.addEventListener("change", () => {
    setTheme(themeSwitch.checked ? "light" : "dark");
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
});
