const video = document.getElementById("bg-video");
const videoBtn = document.getElementById("video-toggle");

videoBtn.addEventListener("click", () => {

    if (video.paused) {
        video.play();
        videoBtn.textContent = "🎬";
    } else {
        video.pause();
        videoBtn.textContent = "⏸";
    }

});
