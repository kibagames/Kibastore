const canvas =
document.getElementById("bg");

const ctx =
canvas.getContext("2d");

/* CANVAS SIZE */

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

/* FRAME SETTINGS */

const frameCount = 100;

const images = [];

/* LOAD FRAMES */

for(let i = 1; i <= frameCount; i++){

const img = new Image();

img.src =
`assets/frames/ezgif-frame-${String(i).padStart(3,'0')}.png`;

images.push(img);

}

/* DRAW FRAME */

function drawFrame(index){

const img = images[index];

if(!img)return;

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

/* MOBILE */

if(window.innerWidth < 768){

const scale =
Math.max(
canvas.width / img.width,
canvas.height / img.height
);

const newWidth =
img.width * scale;

const newHeight =
img.height * scale;

/* LEFT FOCUS */

ctx.drawImage(
img,
0,
0,
newWidth,
newHeight
);

}

/* DESKTOP */

else{

ctx.drawImage(
img,
0,
0,
canvas.width,
canvas.height
);

}

}

/* FIRST FRAME */

images[0].onload = () => {

drawFrame(0);

};

/* SCROLL ANIMATION */

window.addEventListener("scroll", () => {

const scrollTop =
window.scrollY;

const maxScroll =
document.body.scrollHeight -
window.innerHeight;

const frameIndex =
Math.min(
frameCount - 1,
Math.floor(
(scrollTop / maxScroll)
* frameCount
)
);

drawFrame(frameIndex);

});

/* RESIZE */

window.addEventListener("resize", () => {

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

drawFrame(0);

});

/* INTRO REMOVE */

setTimeout(() => {

const intro =
document.getElementById("intro");

if(intro){

intro.style.display = "none";

}

}, 4500);

/* SMOOTH CARD EFFECT */

const cards =
document.querySelectorAll(".card");

cards.forEach(card => {

card.addEventListener("mousemove", e => {

const rect =
card.getBoundingClientRect();

const x =
e.clientX - rect.left;

const y =
e.clientY - rect.top;

card.style.transform =
`
perspective(1000px)
rotateY(${(x - rect.width / 2) / 20}deg)
rotateX(${-(y - rect.height / 2) / 20}deg)
translateY(-5px)
`;

});

card.addEventListener("mouseleave", () => {

card.style.transform =
"perspective(1000px) rotateY(0deg) rotateX(0deg)";

});

});

/* FLOATING PARTICLES EFFECT */

const particles =
document.querySelector(".particles");

let particleOffset = 0;

function animateParticles(){

particleOffset += 0.1;

if(particles){

particles.style.transform =
`translateY(${Math.sin(particleOffset) * 8}px)`;

}

requestAnimationFrame(animateParticles);

}

animateParticles();
