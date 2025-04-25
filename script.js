// script.js
function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission (no page reload)
  const form = document.getElementById("contact-form");
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    headers: {
      "Accept": "application/json"
    },
    body: formData,
  })
  .then(response => {
    if (response.ok) {
      alert(`Thanks, ${email}! Your message has been sent.`);
      form.reset(); // Reset the form fields after submission
    }
    // Removed the error alert to prevent false error messages
  })
  .catch(error => {
    console.error('Error:', error);
    // You can optionally keep this for debugging:
    // alert('There was an error submitting your message. Please try again.');
  });
}

// Add event listener to form
document.getElementById("contact-form").addEventListener('submit', handleSubmit);

// Function to add an animation class when section is in view
function animateOnScroll() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);

// Canvas background animation
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.3;
    this.dx = (Math.random() - 0.5) * 0.5;
    this.dy = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 247, 255, ${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 150; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();
