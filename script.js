/* =======================
   AI Chat Widget
======================= */
let selectedModel = "openai/gpt-4o-mini";

const sendBtn = document.getElementById("send-btn");
if (sendBtn) {
  sendBtn.addEventListener("click", async () => {
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");
    const msg = chatInput.value.trim();
    if (!msg) return;

    // User message
    const userMsg = document.createElement("p");
    userMsg.classList.add("user");
    userMsg.textContent = "You: " + msg;
    chatBody.appendChild(userMsg);

    chatBody.scrollTop = chatBody.scrollHeight;
    chatInput.value = "";

    // AI Placeholder
    const aiMsg = document.createElement("p");
    aiMsg.classList.add("ai");
    aiMsg.textContent = "🤖 Thinking...";
    chatBody.appendChild(aiMsg);

    /* === REAL AI Integration === */
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY_HERE" // <-- Replace this
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [{ role: "user", content: msg }]
        })
      });

      const data = await response.json();
      aiMsg.textContent = "🤖 " + data.choices[0].message.content;
    } catch (error) {
      aiMsg.textContent = "⚠️ Error connecting to AI.";
      console.error(error);
    }

    chatBody.scrollTop = chatBody.scrollHeight;
  });
}

/* =======================
   Model Selection (AI Page)
======================= */
const modelSelect = document.getElementById("model-select");
if (modelSelect) {
  modelSelect.addEventListener("change", () => {
    selectedModel = modelSelect.value;
    console.log("Model switched to:", selectedModel);
  });
}

/* =======================
   Page Transition
======================= */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  const links = document.querySelectorAll("nav ul li a");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");

      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = href;
      }, 500); // match fadeOut animation speed
    });
  });
});

/* =======================
   Subtle Particle Background
======================= */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
const ctx = canvas.getContext("2d");

let particles = [];
const maxParticles = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < maxParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffe0";
  ctx.strokeStyle = "rgba(119,0,255,0.3)";
  ctx.lineWidth = 0.5;

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
}

function animate() {
  drawParticles();
  requestAnimationFrame(animate);
}
animate();
