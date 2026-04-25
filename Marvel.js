/* ===========================
   features.js
   Comic Book Mode + Battle Simulator + Team Builder
   =========================== */

/* ==============================
   1. COMIC BOOK MODE
   ============================== */
const comicBtn = document.getElementById("comic-mode-btn");
let comicActive = false;

comicBtn.addEventListener("click", () => {
  comicActive = !comicActive;

  if (comicActive) {
    document.body.classList.add("comic-mode");
    comicBtn.textContent = "✕ COMIC MODE";
    comicBtn.classList.add("comic-btn-active");
    showComicTransition();
  } else {
    document.body.classList.remove("comic-mode");
    comicBtn.textContent = "💥 COMIC MODE";
    comicBtn.classList.remove("comic-btn-active");
  }
});

function showComicTransition() {
  const flash = document.createElement("div");
  flash.className = "comic-flash";
  flash.innerHTML = `<span>POW!</span>`;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 800);
}


/* ==============================
   2. BATTLE SIMULATOR
   ============================== */
const fighters = [
  { name: "Spider-Man",     power: 85, img: "IMG_5049.PNG",    color: "#cc1a1a" },
  { name: "Iron Man",       power: 90, img: "https://i.pinimg.com/1200x/d7/bd/93/d7bd934adc5e5a50da570cb1bc98e946.jpg",      color: "#c9a84c" },
  { name: "Captain America",power: 80, img: "https://i.pinimg.com/736x/ed/b7/fc/edb7fc2ef2f59da57184e48b0d3a50e5.jpg",      color: "#1a6bc4" },
  { name: "Thor",           power: 95, img: "https://i.pinimg.com/1200x/bb/63/d3/bb63d3f6592636b3e5a5c7fa45716d09.jpg",         color: "#6040cc" },
  { name: "Hulk",           power: 98, img: "https://i.pinimg.com/1200x/0b/d2/b0/0bd2b04c816209517e84781b45632226.jpg",         color: "#40a840" },
  { name: "Black Widow",    power: 72, img: "https://i.pinimg.com/736x/34/15/5f/34155fd1f40bfe6d0f6e947843dfca06.jpg",   color: "#e0e0e0" },
  { name: "Doctor Strange", power: 88, img: "https://i.pinimg.com/736x/9b/8d/b4/9b8db4f22394d5ce1da891f8cbb03a88.jpg",      color: "#e8a020" },
  { name: "Black Panther",  power: 82, img: "https://i.pinimg.com/736x/eb/f4/bb/ebf4bbcdc6c411f9df6ed14bb9c7d11a.jpg",      color: "#8040cc" },
  { name: "Deadpool",       power: 78, img: "https://i.pinimg.com/736x/30/c2/59/30c25944a681496c5a2a835fb3a2a970.jpg",     color: "#d01020" },
  { name: "Wolverine",      power: 87, img: "https://i.pinimg.com/736x/cb/e3/ab/cbe3ab44f6ed399c72d8c40278820afe.jpg",    color: "#e8c020" },
  { name: "Thanos",         power: 99, img: "https://i.pinimg.com/736x/01/d3/2d/01d32daf54f996659d20627a5a4664dc.jpg",       color: "#8030a0" },
  { name: "Venom",          power: 86, img: "https://i.pinimg.com/736x/60/e1/fd/60e1fd140bd3cd97f8ace96be442cd50.jpg",        color: "#303030" },
  { name: "Green Goblin",   power: 75, img: "https://i.pinimg.com/736x/a9/1e/68/a91e68a76a28f8fed63525de42501b99.jpg",       color: "#408020" },
  { name: "Doctor Doom",    power: 93, img: "https://i.pinimg.com/736x/a8/fa/55/a8fa55fac22c35e5729a159ff4f8d5ba.jpg",         color: "#508030" },
  { name: "Loki",           power: 83, img: "https://i.pinimg.com/736x/9e/89/93/9e8993be84dbc765292464d74519534a.jpg",         color: "#204080" },
  { name: "Magneto",        power: 91, img: "https://i.pinimg.com/736x/2d/cd/8c/2dcd8c96b3dd286652bc629ef66d819e.jpg",      color: "#c03030" },
];

// Build Battle Simulator overlay HTML
const battleOverlay = document.createElement("div");
battleOverlay.id = "battle-overlay";
battleOverlay.innerHTML = `
  <div class="battle-modal">
    <button class="modal-close" id="battle-close">✕</button>
    <div class="battle-header">
      <p class="battle-eyebrow">MARVEL UNIVERSE</p>
      <h2 class="battle-title">BATTLE SIMULATOR</h2>
      <p class="battle-sub">Choose your fighters — only one survives</p>
    </div>
    <div class="battle-arena">
      <div class="fighter-select-side left-side">
        <p class="side-label">FIGHTER 1</p>
        <div class="fighter-grid" id="fighter-grid-1"></div>
      </div>
      <div class="battle-vs">
        <div class="vs-circle">
          <span>VS</span>
        </div>
        <div class="battle-result" id="battle-result" style="display:none;">
          <div class="result-winner-img">
            <img id="winner-img" src="" alt="Winner">
          </div>
          <p class="result-label">WINNER</p>
          <h3 class="result-name" id="winner-name"></h3>
          <div class="result-bars">
            <div class="result-bar-wrap">
              <span id="f1-result-name">—</span>
              <div class="result-bar-bg">
                <div class="result-bar f1-bar" id="f1-bar"></div>
              </div>
              <span id="f1-result-power"></span>
            </div>
            <div class="result-bar-wrap">
              <span id="f2-result-name">—</span>
              <div class="result-bar-bg">
                <div class="result-bar f2-bar" id="f2-bar"></div>
              </div>
              <span id="f2-result-power"></span>
            </div>
          </div>
          <button class="battle-again-btn" id="battle-again">⚡ FIGHT AGAIN</button>
        </div>
        <button class="fight-btn" id="fight-btn" disabled>⚡ FIGHT!</button>
      </div>
      <div class="fighter-select-side right-side">
        <p class="side-label">FIGHTER 2</p>
        <div class="fighter-grid" id="fighter-grid-2"></div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(battleOverlay);

// Populate fighter grids
function buildFighterGrids() {
  const grid1 = document.getElementById("fighter-grid-1");
  const grid2 = document.getElementById("fighter-grid-2");

  fighters.forEach((fighter, i) => {
    [grid1, grid2].forEach((grid, gridIndex) => {
      const card = document.createElement("div");
      card.className = "fighter-pick-card";
      card.dataset.index = i;
      card.dataset.grid = gridIndex + 1;
      card.style.setProperty("--fighter-color", fighter.color);
      card.innerHTML = `
        <img src="${fighter.img}" alt="${fighter.name}">
        <span>${fighter.name}</span>
      `;
      card.addEventListener("click", () => selectFighter(card, i, gridIndex + 1));
      grid.appendChild(card);
    });
  });
}

let selected = { 1: null, 2: null };

function selectFighter(card, index, gridNum) {
  // Deselect previous in same grid
  document.querySelectorAll(`.fighter-pick-card[data-grid="${gridNum}"]`).forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  selected[gridNum] = index;

  const fightBtn = document.getElementById("fight-btn");
  if (selected[1] !== null && selected[2] !== null) {
    if (selected[1] === selected[2]) {
      fightBtn.disabled = true;
      fightBtn.textContent = "⚠ SAME FIGHTER";
    } else {
      fightBtn.disabled = false;
      fightBtn.textContent = "⚡ FIGHT!";
    }
  }
}

function runBattle() {
  const f1 = fighters[selected[1]];
  const f2 = fighters[selected[2]];

  // Add random factor
  const f1score = f1.power + Math.floor(Math.random() * 20);
  const f2score = f2.power + Math.floor(Math.random() * 20);
  const winner = f1score >= f2score ? f1 : f2;
  const loser  = f1score >= f2score ? f2 : f1;

  // Hide fight button, show result
  document.getElementById("fight-btn").style.display = "none";
  const result = document.getElementById("battle-result");
  result.style.display = "flex";

  document.getElementById("winner-img").src = winner.img;
  document.getElementById("winner-name").textContent = winner.name;

  document.getElementById("f1-result-name").textContent = f1.name;
  document.getElementById("f2-result-name").textContent = f2.name;
  document.getElementById("f1-result-power").textContent = f1score;
  document.getElementById("f2-result-power").textContent = f2score;

  const maxScore = Math.max(f1score, f2score);
  setTimeout(() => {
    document.getElementById("f1-bar").style.width = `${(f1score / maxScore) * 100}%`;
    document.getElementById("f1-bar").style.background = f1.color;
    document.getElementById("f2-bar").style.width = `${(f2score / maxScore) * 100}%`;
    document.getElementById("f2-bar").style.background = f2.color;
  }, 100);

  // Animate winner name
  document.getElementById("winner-name").style.color = winner.color;
  document.getElementById("winner-name").style.textShadow = `0 0 20px ${winner.color}`;
}

document.getElementById("fight-btn").addEventListener("click", runBattle);

document.getElementById("battle-again").addEventListener("click", () => {
  selected = { 1: null, 2: null };
  document.querySelectorAll(".fighter-pick-card").forEach(c => c.classList.remove("selected"));
  document.getElementById("battle-result").style.display = "none";
  document.getElementById("fight-btn").style.display = "block";
  document.getElementById("fight-btn").disabled = true;
  document.getElementById("fight-btn").textContent = "⚡ FIGHT!";
  document.getElementById("f1-bar").style.width = "0%";
  document.getElementById("f2-bar").style.width = "0%";
});

// Open/close battle
document.getElementById("battle-open-btn").addEventListener("click", () => {
  battleOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});
document.getElementById("battle-close").addEventListener("click", () => {
  battleOverlay.classList.remove("active");
  document.body.style.overflow = "";
});
battleOverlay.addEventListener("click", (e) => {
  if (e.target === battleOverlay) {
    battleOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

buildFighterGrids();


/* ==============================
   3. TEAM BUILDER
   ============================== */
const allHeroes = [
  { name: "Spider-Man",      img: "IMG_5049.PNG",    role: "Striker",   color: "#cc1a1a" },
  { name: "Iron Man",        img: "https://i.pinimg.com/736x/ed/b7/fc/edb7fc2ef2f59da57184e48b0d3a50e5.jpg",       role: "Tactician", color: "#c9a84c" },
  { name: "Captain America", img: "https://i.pinimg.com/736x/ed/b7/fc/edb7fc2ef2f59da57184e48b0d3a50e5.jpg",       role: "Leader",    color: "#1a6bc4" },
  { name: "Thor",            img: "https://i.pinimg.com/1200x/bb/63/d3/bb63d3f6592636b3e5a5c7fa45716d09.jpg",          role: "Powerhouse",color: "#6040cc" },
  { name: "Hulk",            img: "https://i.pinimg.com/1200x/0b/d2/b0/0bd2b04c816209517e84781b45632226.jpg",          role: "Powerhouse",color: "#40a840" },
  { name: "Black Widow",     img: "https://i.pinimg.com/736x/34/15/5f/34155fd1f40bfe6d0f6e947843dfca06.jpg",    role: "Spy",       color: "#e0e0e0" },
  { name: "Hawkeye",         img: "https://i.pinimg.com/1200x/e7/7f/04/e77f04560cc604d901c90d4ff2bcb08f.jpg",       role: "Support",   color: "#8060a0" },
  { name: "Doctor Strange",  img: "https://i.pinimg.com/736x/3e/f7/b3/3ef7b3410474b890a082b20e81017720.jpg",       role: "Sorcerer",  color: "#e8a020" },
  { name: "Black Panther",   img: "https://i.pinimg.com/736x/60/60/4a/60604a53d3a1c144d22fac54f085f5fb.jpg",       role: "Warrior",   color: "#8040cc" },
  { name: "Scarlet Witch",   img: "https://i.pinimg.com/736x/e7/da/26/e7da26bcd7140464416ebd185c3ebba9.jpg",         role: "Chaos",     color: "#c03060" },
  { name: "Vision",          img: "https://i.pinimg.com/1200x/d8/8a/ad/d88aadec131acbb718c979d00684ab97.jpg",        role: "Support",   color: "#c8a020" },
  { name: "Deadpool",        img: "https://i.pinimg.com/736x/5f/6d/5c/5f6d5cc5ee95da1aedbb347a89abdb90.jpg",      role: "Wildcard",  color: "#d01020" },
  { name: "Wolverine",       img: "https://i.pinimg.com/736x/a1/d5/e2/a1d5e2d82b31e9413062747833dde50d.jpg",     role: "Berserker", color: "#e8c020" },
  { name: "Captain Marvel",  img: "https://i.pinimg.com/1200x/ff/eb/67/ffeb670b92b66a8db175d067ede8eb59.jpg", role: "Cosmic",    color: "#4060cc" },
  { name: "Ant-Man",         img: "https://i.pinimg.com/1200x/61/db/e6/61dbe6d3211bdf6917dd3284369dee43.jpg",        role: "Support",   color: "#c08020" },
  { name: "Shang-Chi",       img: "https://i.pinimg.com/736x/ad/a9/b7/ada9b7eb33d327355504935717ed8a4f.jpg",      role: "Warrior",   color: "#e06020" },
];

const MAX_TEAM = 6;

// Build Team Builder overlay
const teamOverlay = document.createElement("div");
teamOverlay.id = "team-overlay";
teamOverlay.innerHTML = `
  <div class="team-modal">
    <button class="modal-close" id="team-close">✕</button>
    <div class="team-header">
      <p class="battle-eyebrow">ASSEMBLE YOUR</p>
      <h2 class="battle-title">AVENGERS TEAM</h2>
      <p class="battle-sub">Pick up to 6 heroes — build the ultimate squad</p>
    </div>
    <div class="team-layout">
      <div class="team-roster">
        <p class="roster-label">AVAILABLE HEROES</p>
        <div class="team-hero-grid" id="team-hero-grid"></div>
      </div>
      <div class="team-slots-side">
        <p class="roster-label">YOUR TEAM <span id="team-count">0</span>/6</p>
        <div class="team-slots" id="team-slots">
          ${Array(6).fill(0).map((_, i) => `
            <div class="team-slot empty" id="slot-${i}">
              <div class="slot-empty-icon">+</div>
              <span class="slot-empty-label">EMPTY</span>
            </div>
          `).join("")}
        </div>
        <div class="team-actions">
          <button class="team-clear-btn" id="team-clear">CLEAR TEAM</button>
          <button class="team-save-btn" id="team-save">⚡ ASSEMBLE!</button>
        </div>
        <div class="team-rating" id="team-rating" style="display:none;">
          <p class="rating-label">TEAM POWER RATING</p>
          <div class="rating-bar-bg">
            <div class="rating-bar" id="rating-bar"></div>
          </div>
          <p class="rating-score" id="rating-score"></p>
          <p class="rating-verdict" id="rating-verdict"></p>
        </div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(teamOverlay);

// Hero power ratings
const heroPower = {
  "Spider-Man": 85, "Iron Man": 90, "Captain America": 80,
  "Thor": 95, "Hulk": 98, "Black Widow": 72, "Hawkeye": 68,
  "Doctor Strange": 88, "Black Panther": 82, "Scarlet Witch": 94,
  "Vision": 80, "Deadpool": 78, "Wolverine": 87,
  "Captain Marvel": 96, "Ant-Man": 70, "Shang-Chi": 82,
};

let teamSlots = Array(MAX_TEAM).fill(null);

function buildTeamGrid() {
  const grid = document.getElementById("team-hero-grid");
  allHeroes.forEach((hero, i) => {
    const card = document.createElement("div");
    card.className = "team-hero-card";
    card.dataset.index = i;
    card.style.setProperty("--hero-color", hero.color);
    card.innerHTML = `
      <img src="${hero.img}" alt="${hero.name}">
      <div class="team-card-info">
        <span class="team-card-name">${hero.name}</span>
        <span class="team-card-role">${hero.role}</span>
      </div>
      <div class="team-card-check">✓</div>
    `;
    card.addEventListener("click", () => toggleHero(hero, card));
    grid.appendChild(card);
  });
}

function toggleHero(hero, card) {
  const alreadyIdx = teamSlots.findIndex(s => s && s.name === hero.name);

  if (alreadyIdx !== -1) {
    // Remove from team
    teamSlots[alreadyIdx] = null;
    card.classList.remove("in-team");
    updateSlots();
  } else {
    // Add to team
    const emptyIdx = teamSlots.findIndex(s => s === null);
    if (emptyIdx === -1) return; // team full
    teamSlots[emptyIdx] = hero;
    card.classList.add("in-team");
    updateSlots();
  }
}

function updateSlots() {
  const count = teamSlots.filter(s => s !== null).length;
  document.getElementById("team-count").textContent = count;
  document.getElementById("team-rating").style.display = "none";

  teamSlots.forEach((hero, i) => {
    const slot = document.getElementById(`slot-${i}`);
    if (hero) {
      slot.className = "team-slot filled";
      slot.style.setProperty("--slot-color", hero.color);
      slot.innerHTML = `
        <img src="${hero.img}" alt="${hero.name}">
        <div class="slot-info">
          <span class="slot-name">${hero.name}</span>
          <span class="slot-role">${hero.role}</span>
        </div>
        <button class="slot-remove" data-name="${hero.name}">✕</button>
      `;
      slot.querySelector(".slot-remove").addEventListener("click", (e) => {
        e.stopPropagation();
        removeHeroByName(hero.name);
      });
    } else {
      slot.className = "team-slot empty";
      slot.style.removeProperty("--slot-color");
      slot.innerHTML = `<div class="slot-empty-icon">+</div><span class="slot-empty-label">EMPTY</span>`;
    }
  });
}

function removeHeroByName(name) {
  const idx = teamSlots.findIndex(s => s && s.name === name);
  if (idx !== -1) {
    teamSlots[idx] = null;
    // uncheck in grid
    document.querySelectorAll(".team-hero-card").forEach(card => {
      const cardName = allHeroes[card.dataset.index].name;
      if (cardName === name) card.classList.remove("in-team");
    });
    updateSlots();
  }
}

document.getElementById("team-clear").addEventListener("click", () => {
  teamSlots = Array(MAX_TEAM).fill(null);
  document.querySelectorAll(".team-hero-card").forEach(c => c.classList.remove("in-team"));
  updateSlots();
  document.getElementById("team-rating").style.display = "none";
});

document.getElementById("team-save").addEventListener("click", () => {
  const active = teamSlots.filter(s => s !== null);
  if (active.length === 0) return;

  const total = active.reduce((sum, h) => sum + (heroPower[h.name] || 80), 0);
  const avg = Math.round(total / active.length);
  const pct = Math.round((avg / 99) * 100);

  let verdict = "";
  if (avg >= 90) verdict = "UNSTOPPABLE — Thanos himself would flee.";
  else if (avg >= 80) verdict = "FORMIDABLE — Earth is in good hands.";
  else if (avg >= 70) verdict = "CAPABLE — They'll get the job done.";
  else verdict = "UNDERDOG — Heart over power. Could still win.";

  const ratingEl = document.getElementById("team-rating");
  ratingEl.style.display = "block";
  document.getElementById("rating-score").textContent = `POWER: ${avg}/99`;
  document.getElementById("rating-verdict").textContent = verdict;

  setTimeout(() => {
    const bar = document.getElementById("rating-bar");
    bar.style.width = `${pct}%`;
    if (avg >= 90) bar.style.background = "linear-gradient(to right, #c9a84c, #ffdd80)";
    else if (avg >= 80) bar.style.background = "linear-gradient(to right, #1a6bc4, #60a0ff)";
    else if (avg >= 70) bar.style.background = "linear-gradient(to right, #408020, #80c040)";
    else bar.style.background = "linear-gradient(to right, #804020, #c06030)";
  }, 100);
});

// Open/close team builder
document.getElementById("team-open-btn").addEventListener("click", () => {
  teamOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});
document.getElementById("team-close").addEventListener("click", () => {
  teamOverlay.classList.remove("active");
  document.body.style.overflow = "";
});
teamOverlay.addEventListener("click", (e) => {
  if (e.target === teamOverlay) {
    teamOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

buildTeamGrid();
/* ===========================
   Marvel.js — Full Rewrite
   =========================== */

/* ---- Countdown Clock ---- */
const TARGET_DATE = new Date("December 18, 2026 00:00:00").getTime();

function pad(n) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function updateClock() {
  const now = Date.now();
  const distance = TARGET_DATE - now;

  if (distance <= 0) {
    ["months","days","hours","minutes","seconds"].forEach(id => {
      document.getElementById(id).innerText = "00";
    });
    return;
  }

  const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
  const months    = Math.floor(totalDays / 30);
  const days      = totalDays % 30;
  const hours     = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes   = Math.floor((distance / (1000 * 60)) % 60);
  const seconds   = Math.floor((distance / 1000) % 60);

  document.getElementById("months").innerText  = pad(months);
  document.getElementById("days").innerText    = pad(days);
  document.getElementById("hours").innerText   = pad(hours);
  document.getElementById("minutes").innerText = pad(minutes);
  document.getElementById("seconds").innerText = pad(seconds);
}

updateClock();
setInterval(updateClock, 1000);


/* ---- Header scroll effect ---- */
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.style.borderBottomColor = "rgba(201,168,76,0.35)";
    header.style.background = "rgba(7,8,10,0.97)";
  } else {
    header.style.borderBottomColor = "rgba(201,168,76,0.15)";
    header.style.background = "rgba(7,8,10,0.92)";
  }
});


/* ---- Parallax on Doomsday bg ---- */
const doomsdayBg = document.querySelector(".doomsday-bg");
if (doomsdayBg) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.25;
    doomsdayBg.style.transform = `scale(1.05) translateY(${rate}px)`;
  });
}


/* ---- Scroll-reveal for sections ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  ".card, .spiderman-actor-card, .ff-card, .captain-portrait, .doom-portrait-frame"
).forEach(el => {
  el.classList.add("reveal-ready");
  revealObserver.observe(el);
});


/* ---- Spider shield rings subtle rotation ---- */
const shieldRings = document.querySelectorAll(".shield-ring");
let shieldAngle = 0;
function animateShield() {
  shieldAngle += 0.008;
  shieldRings.forEach((ring, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    ring.style.transform = `translate(-50%, -50%) rotate(${shieldAngle * dir * (i + 1) * 8}deg)`;
  });
  requestAnimationFrame(animateShield);
}
if (shieldRings.length) animateShield();


/* ---- Active nav highlight ---- */
const sections = document.querySelectorAll("section[id], div[id]");
const navLinks = document.querySelectorAll(".site-nav a");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = "";
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.style.color = "var(--gold)";
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));