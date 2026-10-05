/* ==========================================================================
   Bad Dad Games - Main Application Script
   ========================================================================== */

// --- 1. Audio Synthesizer (Web Audio API - Zero External Dependencies) ---
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    switch (type) {
      case 'pop':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'ding':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(1300, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;

      case 'win':
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;

      case 'buzz':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
    }
  } catch (e) {
    console.warn('Audio not available', e);
  }
}

function toggleAudio() {
  soundEnabled = !soundEnabled;
  const label = document.getElementById('sound-label');
  const icon = document.getElementById('sound-icon');
  if (soundEnabled) {
    if (label) label.textContent = 'SFX ON';
    playSound('ding');
    showToast('Sound Effects Enabled 🔊');
  } else {
    if (label) label.textContent = 'SFX OFF';
    showToast('Sound Effects Muted 🔇');
  }
}

// --- 2. Floating Dust Particles in Hero ---
function createHeroParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  const count = 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    p.style.animationDuration = `${Math.random() * 4 + 4}s`;
    container.appendChild(p);
  }
}

// --- 3. Toggle Name for Card 3 ("Backgrounddd.png" vs "Bad Darts") ---
let card3Official = false;
function toggleCard3Name(e) {
  if (e) e.stopPropagation();
  card3Official = !card3Official;
  const title = document.getElementById('card-3-title');
  if (title) {
    title.textContent = card3Official ? 'Bad Darts' : 'Backgrounddd.png';
  }
  showToast(card3Official ? 'Showing official name: Bad Darts' : 'Showing mockup name: Backgrounddd.png');
  playSound('pop');
}

// --- 4. Navigation & Mobile Drawer ---
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  const isHidden = menu.classList.contains('hidden');
  if (isHidden) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
  playSound('pop');
}

function scrollToGames() {
  const el = document.getElementById('games');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToCatalog() {
  const el = document.getElementById('catalog');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  playSound('pop');
}

// --- 5. Games Library Data & Filter ---
const catalogGames = [
  {
    id: 'weed_bush',
    title: 'Weed Bush',
    category: 'Mine',
    image: 'assets/weed_bush.png',
    maxMultiplier: 'x20',
    desc: 'Mow through wild patches, evade skulls, and hit electrifying multipliers.'
  },
  {
    id: 'plinko_koko',
    title: 'Plinko Koko',
    category: 'Plinko',
    image: 'assets/plinko_koko.png',
    maxMultiplier: 'x25',
    desc: 'Crazy chicken eggs bouncing off brass pins into rainbow treasure buckets.'
  },
  {
    id: 'bad_darts',
    title: 'Bad Darts',
    category: 'Crash',
    image: 'assets/bad_darts.png',
    maxMultiplier: 'x50',
    desc: 'Beer-fueled dive bar precision! Throw darts before the clock crashes out.'
  },
  {
    id: 'moonshine_run',
    title: 'Moonshine Run',
    category: 'Crash',
    image: 'assets/hero_banner.jpg',
    maxMultiplier: 'x100',
    desc: 'Speed the rusty pickup down the ridge before the sheriff catches up!'
  },
  {
    id: 'porch_slots',
    title: 'Porch Dog Deluxe',
    category: 'Slots',
    image: 'assets/weed_bush.png',
    maxMultiplier: 'x500',
    desc: '5x3 reels with sleeping hound wilds and exploding beer can scatters.'
  },
  {
    id: 'lawnmower_mayhem',
    title: 'Lawnmower Mayhem',
    category: 'Mine',
    image: 'assets/weed_bush.png',
    maxMultiplier: 'x40',
    desc: 'High volatility terrain sweeper with double turbo boost triggers.'
  }
];

function renderCatalog(filter = 'all') {
  const grid = document.getElementById('games-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = filter === 'all' ? catalogGames : catalogGames.filter(g => g.category.toLowerCase() === filter.toLowerCase());

  filtered.forEach(game => {
    const card = document.createElement('div');
    card.className = 'group bg-white rounded-3xl p-3 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer';
    card.onclick = () => openGameModal(game.id);

    card.innerHTML = `
      <div class="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100">
        <img src="${game.image}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
        <div class="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">
          ${game.maxMultiplier}
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-gray-900 group-hover:text-brand-red transition-colors text-sm sm:text-base">${game.title}</h4>
          <span class="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">${game.category}</span>
        </div>
        <p class="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">${game.desc}</p>
      </div>
      <button class="w-full mt-3 bg-gray-50 group-hover:bg-brand-red group-hover:text-white text-gray-700 font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5">
        <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
        <span>Try Demo</span>
      </button>
    `;

    grid.appendChild(card);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function filterGames(category) {
  const tabs = document.querySelectorAll('.catalog-filter');
  tabs.forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderCatalog(category);
  playSound('pop');
}

// --- 6. Playable Game Demos Modal ---
function openGameModal(gameId) {
  const modal = document.getElementById('game-modal');
  const title = document.getElementById('modal-game-title');
  const thumb = document.getElementById('modal-game-thumb');
  const badge = document.getElementById('modal-game-badge');
  const content = document.getElementById('modal-content');

  modal.classList.add('active');
  playSound('pop');

  if (gameId === 'plinko_koko') {
    title.textContent = 'Plinko Koko (Playable Sandbox)';
    thumb.src = 'assets/plinko_koko.png';
    badge.textContent = 'Drop Rainbow Eggs!';
    initPlinkoGame(content);
  } else if (gameId === 'weed_bush') {
    title.textContent = 'Weed Bush (Mine Sweeper)';
    thumb.src = 'assets/weed_bush.png';
    badge.textContent = 'Find Multipliers, Avoid The Skull!';
    initWeedBushGame(content);
  } else if (gameId === 'bad_darts') {
    title.textContent = 'Bad Darts (Target Challenge)';
    thumb.src = 'assets/bad_darts.png';
    badge.textContent = 'Hit The x50 Bullseye!';
    initBadDartsGame(content);
  } else {
    title.textContent = 'Bad Dad Games Demo';
    thumb.src = 'assets/bad_dad_logo.png';
    badge.textContent = 'Demo Sandbox';
    content.innerHTML = `<div class="text-center py-12"><p class="text-gray-600 font-bold">Demo ready! Click start to play.</p></div>`;
  }

  if (window.lucide) window.lucide.createIcons();
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  modal.classList.remove('active');
  playSound('pop');
}

// Close on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('game-modal');
  if (e.target === modal) {
    closeGameModal();
  }
});

// --- Mini Game 1: Plinko Koko (HTML5 Canvas Physics) ---
let plinkoAnimId = null;
function initPlinkoGame(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center w-full max-w-md">
      <div class="flex items-center justify-between w-full mb-3 px-2">
        <div class="text-xs font-bold text-gray-700">Bankroll: <span id="plinko-balance" class="text-emerald-600 font-black">$100.00</span></div>
        <div class="text-xs font-bold text-amber-600">Last Win: <span id="plinko-win" class="font-black">$0.00</span></div>
      </div>
      
      <canvas id="plinko-canvas" width="340" height="300" class="w-full max-w-[340px]"></canvas>

      <div class="flex items-center gap-3 mt-4 w-full justify-center">
        <button id="drop-egg-btn" onclick="dropPlinkoEgg()" class="bg-brand-red hover:bg-brand-red-dark text-white font-black text-sm px-6 py-2.5 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2">
          <span>🥚 Drop Rainbow Egg</span>
        </button>
      </div>
      <p class="text-[11px] text-gray-400 mt-2">Click to drop an egg and bounce through the pegs!</p>
    </div>
  `;

  const canvas = document.getElementById('plinko-canvas');
  const ctx = canvas.getContext('2d');

  // Peg layout
  const rows = 6;
  const pegs = [];
  const startY = 50;
  const spacingY = 35;
  const centerX = canvas.width / 2;

  for (let r = 0; r < rows; r++) {
    const count = r + 3;
    const spacingX = 36;
    const startX = centerX - ((count - 1) * spacingX) / 2;
    for (let c = 0; c < count; c++) {
      pegs.push({ x: startX + c * spacingX, y: startY + r * spacingY, r: 4 });
    }
  }

  // Multiplier Buckets at bottom
  const multipliers = [25, 5, 2, 0.5, 2, 5, 25];
  const bucketWidth = canvas.width / multipliers.length;

  window.plinkoState = {
    pegs,
    multipliers,
    bucketWidth,
    balls: [],
    balance: 100
  };

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Pegs
    pegs.forEach(peg => {
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, peg.r, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw Buckets
    multipliers.forEach((mult, i) => {
      const bx = i * bucketWidth;
      const by = canvas.height - 35;
      ctx.fillStyle = mult >= 10 ? '#ef4444' : mult >= 5 ? '#f59e0b' : '#3b82f6';
      ctx.fillRect(bx + 2, by, bucketWidth - 4, 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`x${mult}`, bx + bucketWidth / 2, by + 18);
    });

    // Update Balls
    const balls = window.plinkoState.balls;
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      b.vy += 0.22; // gravity
      b.x += b.vx;
      b.y += b.vy;

      // Peg collisions
      pegs.forEach(peg => {
        const dx = b.x - peg.x;
        const dy = b.y - peg.y;
        const dist = Math.hypot(dx, dy);
        if (dist < b.r + peg.r) {
          // Bounce
          const angle = Math.atan2(dy, dx);
          b.vx = Math.cos(angle) * (1.8 + Math.random() * 0.5);
          b.vy = Math.sin(angle) * 1.5;
          playSound('pop');
        }
      });

      // Wall bounds
      if (b.x < b.r) { b.x = b.r; b.vx *= -0.7; }
      if (b.x > canvas.width - b.r) { b.x = canvas.width - b.r; b.vx *= -0.7; }

      // Bottom Bucket Hit
      if (b.y >= canvas.height - 35) {
        const bucketIndex = Math.min(multipliers.length - 1, Math.max(0, Math.floor(b.x / bucketWidth)));
        const mult = multipliers[bucketIndex];
        const win = 5 * mult;
        window.plinkoState.balance += win;

        document.getElementById('plinko-balance').textContent = `$${window.plinkoState.balance.toFixed(2)}`;
        document.getElementById('plinko-win').textContent = `+$${win.toFixed(2)} (x${mult})`;
        playSound(mult >= 5 ? 'win' : 'ding');
        balls.splice(i, 1);
        continue;
      }

      // Draw Rainbow Egg Ball
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      const grad = ctx.createLinearGradient(b.x - b.r, b.y, b.x + b.r, b.y);
      grad.addColorStop(0, '#ff0000');
      grad.addColorStop(0.33, '#ffff00');
      grad.addColorStop(0.66, '#00ff00');
      grad.addColorStop(1, '#00ffff');
      ctx.fillStyle = grad;
      ctx.fill();
    }

    plinkoAnimId = requestAnimationFrame(update);
  }

  if (plinkoAnimId) cancelAnimationFrame(plinkoAnimId);
  update();
}

function dropPlinkoEgg() {
  if (!window.plinkoState) return;
  if (window.plinkoState.balance < 5) {
    showToast('Insufficient demo coins! Resetting balance to $50.');
    window.plinkoState.balance = 50;
  }
  window.plinkoState.balance -= 5;
  document.getElementById('plinko-balance').textContent = `$${window.plinkoState.balance.toFixed(2)}`;

  const canvas = document.getElementById('plinko-canvas');
  window.plinkoState.balls.push({
    x: canvas.width / 2 + (Math.random() * 20 - 10),
    y: 15,
    vx: (Math.random() - 0.5) * 1.5,
    vy: 1,
    r: 7
  });
  playSound('pop');
}

// --- Mini Game 2: Weed Bush Mine Sweeper ---
let weedState = null;
function initWeedBushGame(container) {
  const totalTiles = 16;
  const mineIndices = new Set();
  while (mineIndices.size < 3) {
    mineIndices.add(Math.floor(Math.random() * totalTiles));
  }

  weedState = {
    totalTiles,
    mineIndices,
    multiplier: 1.0,
    active: true,
    clearedCount: 0
  };

  container.innerHTML = `
    <div class="flex flex-col items-center w-full max-w-sm">
      <div class="flex items-center justify-between w-full mb-3">
        <div class="text-xs font-bold text-gray-700">Mower Multiplier: <span id="weed-mult" class="text-brand-red font-black text-base">x1.00</span></div>
        <button id="weed-cashout" onclick="cashoutWeed()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow opacity-50 cursor-not-allowed" disabled>
          Take Win
        </button>
      </div>

      <div class="grid grid-cols-4 gap-2.5 w-full aspect-square" id="weed-grid"></div>

      <p class="text-[11px] text-gray-400 mt-3 text-center">Click green bushes to mow for multipliers. Don't hit a lawnmower skull!</p>
    </div>
  `;

  const grid = document.getElementById('weed-grid');
  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement('button');
    tile.className = 'mine-tile rounded-2xl flex items-center justify-center font-black text-sm text-white select-none';
    tile.innerHTML = `🌿`;
    tile.onclick = () => revealWeedTile(i, tile);
    grid.appendChild(tile);
  }
}

function revealWeedTile(index, tileEl) {
  if (!weedState || !weedState.active || tileEl.classList.contains('revealed')) return;

  tileEl.classList.add('revealed');

  if (weedState.mineIndices.has(index)) {
    // BOOM
    tileEl.innerHTML = `💀`;
    tileEl.style.backgroundColor = '#ef4444';
    weedState.active = false;
    playSound('buzz');
    showToast('Lawnmower broke down! 💀 Try again!');
    document.getElementById('weed-mult').textContent = 'BUSTED';
    document.getElementById('weed-cashout').disabled = true;
    document.getElementById('weed-cashout').classList.add('opacity-50', 'cursor-not-allowed');
  } else {
    // SAFE
    weedState.clearedCount++;
    weedState.multiplier = parseFloat((weedState.multiplier + 0.45).toFixed(2));
    tileEl.innerHTML = `<span class="text-emerald-700 font-black text-xs">x${weedState.multiplier}</span>`;
    document.getElementById('weed-mult').textContent = `x${weedState.multiplier.toFixed(2)}`;
    playSound('ding');

    const cashoutBtn = document.getElementById('weed-cashout');
    cashoutBtn.disabled = false;
    cashoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }
}

function cashoutWeed() {
  if (!weedState || !weedState.active || weedState.clearedCount === 0) return;
  playSound('win');
  showToast(`Cashed out at x${weedState.multiplier.toFixed(2)} Multiplier! 🎉`);
  weedState.active = false;
  document.getElementById('weed-cashout').disabled = true;
}

// --- Mini Game 3: Bad Darts (Target Throw) ---
let dartsTimer = null;
function initBadDartsGame(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center w-full max-w-sm">
      <div class="text-xs font-bold text-gray-700 mb-3">
        High Score: <span id="darts-score" class="text-brand-red font-black text-base">0 PTS</span>
      </div>

      <div class="relative w-64 h-64 rounded-full dart-target flex items-center justify-center cursor-crosshair overflow-hidden" id="dart-board" onclick="throwDart(event)">
        <!-- Moving Bullseye Indicator -->
        <div id="dart-aim" class="absolute w-6 h-6 border-2 border-yellow-300 rounded-full pointer-events-none transition-all duration-75"></div>
        <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-black text-gray-900 shadow">
          x50
        </div>
      </div>

      <div class="mt-4 flex items-center gap-3">
        <button onclick="throwDartCenter()" class="bg-brand-red hover:bg-brand-red-dark text-white font-bold text-xs px-5 py-2 rounded-full shadow transition-all active:scale-95">
          🎯 Quick Throw
        </button>
      </div>
      <p class="text-[11px] text-gray-400 mt-2 text-center">Click the dartboard to aim for the x50 bullseye multiplier!</p>
    </div>
  `;

  // Random moving reticle
  const aim = document.getElementById('dart-aim');
  if (dartsTimer) clearInterval(dartsTimer);
  dartsTimer = setInterval(() => {
    if (!aim) return;
    const rx = Math.sin(Date.now() / 200) * 50 + 120;
    const ry = Math.cos(Date.now() / 250) * 50 + 120;
    aim.style.left = `${rx}px`;
    aim.style.top = `${ry}px`;
  }, 50);
}

let dartsScore = 0;
function throwDart(event) {
  const board = document.getElementById('dart-board');
  const rect = board.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  const dist = Math.hypot(x, y);

  let mult = 0;
  if (dist < 20) mult = 50;
  else if (dist < 50) mult = 25;
  else if (dist < 80) mult = 10;
  else if (dist < 115) mult = 5;

  if (mult > 0) {
    dartsScore += mult * 10;
    document.getElementById('darts-score').textContent = `${dartsScore} PTS (x${mult} Hit!)`;
    playSound(mult >= 25 ? 'win' : 'ding');
    showToast(`BULLSEYE! x${mult} Multiplier Hit! 🎯`);
  } else {
    playSound('pop');
    showToast('Missed the board! Try again!');
  }
}

function throwDartCenter() {
  const fakeEvent = {
    clientX: window.innerWidth / 2 + (Math.random() * 40 - 20),
    clientY: window.innerHeight / 2 + (Math.random() * 40 - 20)
  };
  throwDart(fakeEvent);
}

// --- 7. Careers & Contact Forms ---
function openApplyModal(roleName) {
  openGameModal('');
  const title = document.getElementById('modal-game-title');
  const badge = document.getElementById('modal-game-badge');
  const content = document.getElementById('modal-content');
  title.textContent = `Apply: ${roleName}`;
  badge.textContent = 'Bad Dad Careers';

  content.innerHTML = `
    <div class="w-full max-w-md p-2">
      <p class="text-xs text-gray-600 mb-4">You are applying for <strong>${roleName}</strong>. Send your portfolio or GitHub below.</p>
      <form onsubmit="handleApplySubmit(event)" class="space-y-3">
        <input type="text" required placeholder="Full Name" class="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red focus:outline-none">
        <input type="email" required placeholder="Email Address" class="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red focus:outline-none">
        <input type="url" required placeholder="Portfolio / GitHub Link" class="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red focus:outline-none">
        <textarea rows="3" placeholder="Tell Bad Dad why you want to build games..." class="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red focus:outline-none"></textarea>
        <button type="submit" class="w-full bg-brand-red text-white font-bold py-2.5 rounded-xl shadow text-xs">Submit Application</button>
      </form>
    </div>
  `;
}

function handleApplySubmit(e) {
  e.preventDefault();
  closeGameModal();
  playSound('win');
  showToast('Application submitted! Bad Dad will review it soon.');
}

function handleContactSubmit(e) {
  e.preventDefault();
  playSound('win');
  showToast('Thanks for reaching out! Bad Dad received your message.');
  e.target.reset();
}

// --- 8. Toast Feedback Helper ---
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-msg');
  if (!toast || !msg) return;
  msg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

// --- 9. Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  createHeroParticles();
  renderCatalog('all');
  
  // Ensure video autoplays smoothly
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, attempt again on user interaction
        document.body.addEventListener('click', () => {
          heroVideo.play();
        }, { once: true });
      });
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
