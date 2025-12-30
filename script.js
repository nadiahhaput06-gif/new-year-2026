const question = document.getElementById("question-screen");
const celebration = document.getElementById("celebration-screen");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let petals = [];

const wishes = [
  "May you grow gently",
  "You are loved",
  "May love remain",
  "Find your way slowly",
  "Thank you for staying",
  "May light return",
  "You are enough",
  "Let yourself rest",
  "You are not behind"
];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

yesBtn.onclick = () => {
  question.classList.remove("active");
  celebration.classList.add("active");
  spawnInitialPetals();
};

noBtn.onclick = () => {
  noText.classList.remove("hidden");
};

function spawnInitialPetals() {
  for (let i = 0; i < 60; i++) {
    petals.push(createPetal(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    ));
  }
}

celebration.addEventListener("click", e => {
  for (let i = 0; i < 6; i++) {
    petals.push(createPetal(e.clientX, e.clientY));
  }
});

function createPetal(x, y) {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 2 + 1;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: Math.random() * 6 + 6,
    rot: Math.random() * 0.03 - 0.015,
    angle: Math.random() * Math.PI,
    alpha: 1,
    life: 1,
    delay: Math.random() * 30,
    color: `hsl(${Math.random() * 360},70%,75%)`,
    text: wishes[Math.floor(Math.random() * wishes.length)],
    textOffsetX: Math.random() * 30 - 15,
    textOffsetY: Math.random() * 30 - 15
  };
}

function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);

  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    ctx.rotate(Math.PI * 2 / 5);
    ctx.quadraticCurveTo(0, p.size, p.size / 2, 0);
  }

  ctx.fillStyle = p.color;
  ctx.globalAlpha = p.alpha;
  ctx.fill();
  ctx.restore();

  if (p.life < 0.9) {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = "#ffffff";
    ctx.font = "11px Georgia";
    ctx.fillText(
      p.text,
      p.x + p.textOffsetX,
      p.y + p.textOffsetY
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals = petals.filter(p => p.alpha > 0);

  petals.forEach(p => {
    if (p.delay > 0) {
      p.delay--;
      return;
    }

    p.x += p.vx;
    p.y += p.vy + 0.3;
    p.vx *= 0.98;
    p.vy *= 0.98;

    p.angle += p.rot;
    p.life -= 0.005;
    p.alpha = p.life;

    drawPetal(p);
  });

  requestAnimationFrame(animate);
}

animate();