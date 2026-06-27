// Edit this file to add your own projects and technologies.
const projects = [
  {
    name: "Nexa Commerce",
    description: "A fast, conversion-focused storefront with seamless discovery, checkout, and inventory management.",
    status: "live",
    url: "https://example.com",
    tags: ["Next.js", "TypeScript", "Stripe"],
    background: "#1f352f",
    orb: "radial-gradient(circle at 35% 30%, #d9ff4f, #56745f 46%, #253f37 70%)"
  },
  {
    name: "Clarity AI",
    description: "An intelligent workspace that turns scattered research into clear, actionable summaries.",
    status: "live",
    url: "https://example.com",
    tags: ["React", "Python", "OpenAI"],
    background: "#2c2736",
    orb: "radial-gradient(circle at 35% 30%, #e3c8ff, #795e96 48%, #3f344d 72%)"
  },
  {
    name: "Orbit Finance",
    description: "A calmer way for independent teams to understand cash flow, forecast runway, and make confident decisions.",
    status: "progress",
    url: "#contact",
    tags: ["Product Design", "Node.js", "PostgreSQL"],
    background: "#303934",
    orb: "radial-gradient(circle at 35% 30%, #ffbd70, #ae684c 47%, #425049 73%)"
  }
];

const stack = {
  "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  "Backend & Data": ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
  "Tools & Practice": ["Git", "Figma", "Docker", "Vercel", "Testing"]
};

const grid = document.querySelector("#project-grid");
const labels = { live: "Live project", progress: "In progress" };

function renderProjects(filter = "all") {
  grid.innerHTML = projects.map((project, index) => `
    <a class="project-card reveal ${filter !== "all" && project.status !== filter ? "hide" : ""}"
       href="${project.url}" ${project.url.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}
       style="--card-bg:${project.background};--orb:${project.orb}" aria-label="View ${project.name}">
      <div class="orb" aria-hidden="true"></div>
      <div class="project-top"><span class="project-status">${labels[project.status]}</span><span class="project-arrow">↗</span></div>
      <div class="project-info"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div></div>
    </a>`).join("");
  observeReveals();
}

function renderStack() {
  document.querySelector("#stack-list").innerHTML = Object.entries(stack).map(([title, items]) => `
    <div class="stack-group"><h3>${title.toUpperCase()}</h3><div class="stack-items">${items.map(item => `<span>${item}</span>`).join("")}</div></div>`).join("");
}

function observeReveals() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}

document.querySelectorAll(".filters button").forEach(button => button.addEventListener("click", () => {
  document.querySelector(".filters .active").classList.remove("active");
  button.classList.add("active");
  renderProjects(button.dataset.filter);
}));

document.querySelector("#year").textContent = new Date().getFullYear();
renderProjects();
renderStack();
observeReveals();
