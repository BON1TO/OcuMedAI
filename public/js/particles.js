/* ======================================================
   GLOBAL PARTICLE ENGINE — Slow Neon Sparks
   ====================================================== */

const PARTICLE_COUNT =  40;       // total sparks on screen
const particleLayer = document.getElementById("particle-layer");

function createParticle() {
    const dot = document.createElement("div");
    dot.className = "particle";

    // Random starting point
    dot.style.left = Math.random() * window.innerWidth + "px";
    dot.style.top = Math.random() * window.innerHeight + "px";

    // Slight size variance
    const size = 4 + Math.random() * 4;
    dot.style.width = size + "px";
    dot.style.height = size + "px";
    dot.style.animationDuration = 14 + Math.random() * 10 + "s";

    particleLayer.appendChild(dot);

    // respawn when finished
    setTimeout(() => {
        dot.remove();
        createParticle();
    }, 15000);
}

// spawn initial particles
for (let i = 0; i < PARTICLE_COUNT; i++) {
    setTimeout(createParticle, i * 300);
}
