const audio = document.getElementById("audio");
const fileInput = document.getElementById("fileInput");
const playlistDiv = document.getElementById("playlist");
const nowPlaying = document.getElementById("nowPlaying");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const fileCount = document.getElementById("fileCount");

let songs = [];
let currentSong = 0;
let shuffle = false;
let repeat = false;

fileInput.addEventListener("change", function () {
    songs = Array.from(this.files);
    playlistDiv.innerHTML = "";

    fileCount.innerText = songs.length
        ? `${songs.length} file${songs.length > 1 ? "s" : ""} selected`
        : "No files selected";

    songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "song";
        div.innerText = song.name;

        div.onclick = () => {
            playSong(index);
        };

        playlistDiv.appendChild(div);
    });

    if (songs.length > 0) {
        playSong(0);
    }
});

function playSong(index) {
    if (songs.length === 0) return;

    currentSong = index;
    const song = songs[index];

    audio.src = URL.createObjectURL(song);
    audio.play();

    nowPlaying.innerText = song.name;
    updateActive();
    updatePlayPauseButton();
}

function playPause() {
    if (!audio.src) return;

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    updatePlayPauseButton();
}

const playSVG = `
<svg width="32px" height="32px" viewBox="0 0 7.00 7.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#F5F5F5"> <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.014000000000000002"></g> <g id="SVGRepo_iconCarrier"> <title>play [#1003]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke-width="0.00007" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-347.000000, -3766.000000)" fill="#F5F5F5"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322" id="play-[#1003]"> </path> </g> </g> </g> </g> </svg>
`;

const pauseSVG = `
<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.163 3.819C5 4.139 5 4.559 5 5.4v13.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .656-.656c.163-.32.163-.74.163-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C8.861 3 8.441 3 7.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zm9 0C14 4.139 14 4.559 14 5.4v13.2c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656c.164-.32.164-.74.164-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C17.861 3 17.441 3 16.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.655.656z" fill="#F5F5F5"></path></g></svg>`;

function updatePlayPauseButton() {
    playPauseBtn.innerHTML = audio.paused ? playSVG : pauseSVG;
}

function nextSong() {
    if (songs.length === 0) return;

    if (shuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (songs.length > 1 && randomIndex === currentSong);
        currentSong = randomIndex;
    } else {
        currentSong++;
        if (currentSong >= songs.length) currentSong = 0;
    }

    playSong(currentSong);
}

function prevSong() {
    if (songs.length === 0) return;

    currentSong--;
    if (currentSong < 0) currentSong = songs.length - 1;

    playSong(currentSong);
}

function toggleShuffle() {
    shuffle = !shuffle;
    shuffleBtn.classList.toggle("active-btn", shuffle);
}

function toggleRepeat() {
    repeat = !repeat;
    repeatBtn.classList.toggle("active-btn", repeat);
}

function skipBackward() {
    if (!audio.src) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function skipForward() {
    if (!audio.src) return;
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
}

audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.innerText = formatTime(audio.duration);
});

audio.addEventListener("play", updatePlayPauseButton);
audio.addEventListener("pause", updatePlayPauseButton);

progressBar.addEventListener("click", (e) => {
    if (!audio.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration;
    audio.currentTime = newTime;
});

audio.addEventListener("ended", () => {
    if (repeat) {
        playSong(currentSong);
    } else {
        nextSong();
    }
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function updateActive() {
    const allSongs = document.querySelectorAll(".song");
    allSongs.forEach(song => song.classList.remove("active"));

    if (allSongs[currentSong]) {
        allSongs[currentSong].classList.add("active");
    }
}