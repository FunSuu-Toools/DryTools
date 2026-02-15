const lines = [
    "Hi, I'm Satyam Pandey — self-taught developer & creator",
    "Student today, lifelong learner always",
    "I build smooth web tools and Telegram bots",
    "Turning curiosity into real projects people use",
    "Poet, thinker, and problem solver",
    "I don't just learn technology — I build with it"
];


let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    let currentLine = lines[lineIndex];
    let display = document.getElementById("typing");

    if (!isDeleting) {
        display.textContent = currentLine.substring(0, charIndex++);

        if (charIndex > currentLine.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200); // wait before erase
            return;
        }

    } else {
        display.textContent = currentLine.substring(0, charIndex--);

        if (charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % lines.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
}

typeEffect();