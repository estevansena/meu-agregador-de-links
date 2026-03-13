/* =========================
   PARTÍCULAS CINEMATOGRÁFICAS
========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = Math.random() * 0.7 + 0.2;
    this.speedX = 0;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.isWhite = Math.random() > 0.7;
  }

  update() {
    this.y -= this.speedY;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
      this.speedX = 0;
    }
    let dx = this.x - mouseX;
    let dy = this.y - mouseY;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      this.speedX += (dx / dist) * 0.5;
    }
    this.speedX *= 0.98;
    this.x += this.speedX;
  }

  draw() {
    if (this.isWhite) {
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    } else {
      ctx.fillStyle = `rgba(255,120,40,${this.opacity})`;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 120; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

