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
    const playIcon = `
 <svg width="20px" height="20px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.79062 2.09314C4.63821 1.98427 4.43774 1.96972 4.27121 2.05542C4.10467 2.14112 4 2.31271 4 2.5V12.5C4 12.6873 4.10467 12.8589 4.27121 12.9446C4.43774 13.0303 4.63821 13.0157 4.79062 12.9069L11.7906 7.90687C11.922 7.81301 12 7.66148 12 7.5C12 7.33853 11.922 7.18699 11.7906 7.09314L4.79062 2.09314Z"
                            fill="#111918" />
                    </svg>
`;

    const pauseIcon = `
     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="20px" height="20px" viewBox="0 0 32 32" xml:space="preserve">
                    <path d="M14,6v20c0,1.1-0.9,2-2,2H8c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h4C13.1,4,14,4.9,14,6z M24,4h-4
	c-1.1,0-2,0.9-2,2v20c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V6C26,4.9,25.1,4,24,4z" fill="#111918" />
                </svg>
`;



    videoBtn.onclick = () => {
        if (video.paused) {
            video.play();
            videoBtn.innerHTML = pauseIcon;
        } else {
            video.pause();
            videoBtn.innerHTML = playIcon;
        }
    };

    // THEME SYSTEM
    const DARK_VIDEO = "/assets/videos/background-vid.mp4";
    const LIGHT_VIDEO = "/assets/videos/light-theme-background.mp4";

    // function setTheme(mode) {

    //     if (mode === "light") {
    //         document.body.classList.add("light-mode");
    //         videoSource.src = LIGHT_VIDEO;
    //         themeSwitch.checked = true;
    //     } else {
    //         document.body.classList.remove("light-mode");
    //         videoSource.src = DARK_VIDEO;
    //         themeSwitch.checked = false;
    //     }

    //     video.load();
    //     video.play();
    //     localStorage.setItem("theme", mode);
    // }

    // themeSwitch.onchange = () => {
    //     setTheme(themeSwitch.checked ? "light" : "dark");
    // };

    // setTheme(localStorage.getItem("theme") || "dark");
}
