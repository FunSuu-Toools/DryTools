function initNavbarButtons() {

    const settingsBtn = document.getElementById("settings-btn");
    const popup = document.getElementById("settings-popup");
    const closeBtn = document.getElementById("close-settings");

    const video = document.getElementById("bg-video");
    const videoSource = document.getElementById("video-source");
    const videoBtn = document.getElementById("video-toggle");
    const themeSwitch = document.getElementById("theme-switch");

    if (!settingsBtn || !popup) return;

    // OPEN POPUP
    settingsBtn.onclick = () => popup.classList.add("active");
    closeBtn.onclick = () => popup.classList.remove("active");

    // VIDEO TOGGLE
    videoBtn.onclick = () => {
        if (video.paused) {
            video.play();
            videoBtn.textContent = "⏸";
        } else {
            video.pause();
            videoBtn.textContent = "▶";
        }
    };

    // THEME SYSTEM
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

    themeSwitch.onchange = () => {
        setTheme(themeSwitch.checked ? "light" : "dark");
    };

    setTheme(localStorage.getItem("theme") || "dark");
}
