/* ==========================================================================
   Bad Dad Games - Main Application Script
   (Sound effects removed, Game Video + Info Popup & Demos enabled)
   ========================================================================== */

// --- 1. Games Catalog & Details Data ---
const gamesData = {
  weed_bush: {
    id: 'weed_bush',
    title: 'Weed Bush',
    category: 'Mine Game',
    image: 'assets/weed_bush.png',
    video: 'assets/weed_bush_preview.mp4',
    maxMultiplier: 'x20.00',
    rtp: '96.80% - 99.20%',
    volatility: 'High / Electric',
    betRange: '$0.10 - $100.00',
    tagline: 'Mow wild patches, evade skulls & hit electric multipliers!',
    description: `Guide Bad Dad on his souped-up electric lawnmower through overgrown patches of green. Every fresh patch cut reveals surging cash multipliers, but watch your throttle! Hit a breakdown skull and your mower blows a gasket. Cash out anytime before disaster strikes to pocket your winnings.`,
    features: [
      'Configurable mine density & multiplier curve',
      'Instant cashout on every successful mow',
      'High-voltage x20 max multiplier triggers',
      'Certified Provably Fair SHA-256 seed generation'
    ]
  },
  plinko_koko: {
    id: 'plinko_koko',
    title: 'Plinko Koko',
    category: 'Plinko Physics',
    image: 'assets/plinko_koko.png',
    video: 'assets/plinko_koko_preview.mp4',
    maxMultiplier: 'x25.00',
    rtp: '97.50% - 99.10%',
    volatility: 'Medium - High',
    betRange: '$0.10 - $100.00',
    tagline: 'Crazy hen dropping rainbow eggs down high-stakes peg pyramids!',
    description: `Watch Bad Dad's lunatic barnyard hen drop golden and rainbow eggs through brass pin mazes. Every peg collision deflects your egg toward extreme multiplier crates at the bottom. Land in the outer rainbow pockets to unlock maximum multipliers!`,
    features: [
      'Real-time deterministic physics simulation',
      'Rainbow egg bonus multiplier drops',
      'Adjustable risk rows & payout spreads',
      'Certified Provably Fair RNG'
    ]
  },
  bad_darts: {
    id: 'bad_darts',
    title: 'Bad Darts',
    category: 'Crash Target',
    image: 'assets/bad_darts.png',
    video: 'assets/bad_darts_preview.mp4',
    maxMultiplier: 'x50.00',
    rtp: '96.00% - 98.80%',
    volatility: 'High',
    betRange: '$0.10 - $50.00',
    tagline: 'Dive bar accuracy! Hit the x50 bullseye before the tavern clock crashes.',
    description: `Step inside Bad Dad's favorite smoky roadside dive bar. Aim true and throw darts at the spinning multiplier target before the tavern clock runs out. Hit the x50 bullseye while Bad Dad cheers you on with a cold brew. Fast, intense, and deeply satisfying.`,
    features: [
      'x50 Bullseye progressive multiplier jackpot',
      'High-tension crash mechanics with manual release',
      'Authentic roadside bar tavern lore & soundless visual flair',
      'Instant cryptographic round verification'
    ]
  },
  moonshine_run: {
    id: 'moonshine_run',
    title: 'Moonshine Run',
    category: 'Crash',
    image: 'assets/hero_banner.jpg',
    video: 'assets/Header.webm',
    maxMultiplier: 'x100.00',
    rtp: '97.00% - 99.00%',
    volatility: 'Extreme',
    betRange: '$0.20 - $100.00',
    tagline: 'Speed the rusty pickup down the ridge before the sheriff catches up!',
    description: `Bad Dad loaded up the bed of his rusted blue pickup with moonshine jugs. Put pedal to the metal down winding mountain backroads as the payout multiplier climbs rapidly. Bail out before the sheriff siren sounds!`,
    features: [
      'Rising multiplier curve up to x100.00',
      'Dual bet placement & auto cashout',
      'High-speed chase animation pacing',
      'Mobile-first portrait HUD'
    ]
  },
  porch_slots: {
    id: 'porch_slots',
    title: 'Porch Dog Deluxe',
    category: 'Slots',
    image: 'assets/weed_bush.png',
    video: 'assets/weed_bush_preview.mp4',
    maxMultiplier: 'x500.00',
    rtp: '96.50% - 98.50%',
    volatility: 'Medium',
    betRange: '$0.20 - $50.00',
    tagline: '5x3 reels with sleeping hound wilds and exploding beer can scatters.',
    description: `Spin across 25 paylines on the porch deck. When the sleeping hound wakes up, sticky full-reel wilds take over the screen. Hit 3 beer coolers to enter the Backyard Free Spins bonus round.`,
    features: [
      '25 fixed paylines with tumbling reels',
      'Sleeping Dog expanding sticky wilds',
      'Beer Cooler Free Spins multiplier ladder',
      'Bonus Buy option available'
    ]
  },
  lawnmower_mayhem: {
    id: 'lawnmower_mayhem',
    title: 'Lawnmower Mayhem',
    category: 'Mine',
    image: 'assets/weed_bush.png',
    video: 'assets/weed_bush_preview.mp4',
    maxMultiplier: 'x40.00',
    rtp: '96.90% - 99.00%',
    volatility: 'Very High',
    betRange: '$0.10 - $100.00',
    tagline: 'High volatility terrain sweeper with double turbo boost triggers.',
    description: `An extreme variance edition of Weed Bush for high-rollers. Featuring double nitro canisters, chained multipliers, and explosive skull zones.`,
    features: [
      'Turbo nitro multiplier boosts up to x40.00',
      'Dynamic grid sizing (3x3 to 7x7)',
      'Provably Fair seed hash viewer',
      'Instant payout engine'
    ]
  }
};

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
}

function scrollToGames() {
  const el = document.getElementById('games');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToCatalog() {
  const el = document.getElementById('catalog');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// --- 5. Games Library Data & Filter ---
function renderCatalog(filter = 'all') {
  const grid = document.getElementById('games-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const allGames = Object.values(gamesData);
  const filtered = filter === 'all' 
    ? allGames 
    : allGames.filter(g => g.category.toLowerCase().includes(filter.toLowerCase()));

  filtered.forEach(game => {
    const card = document.createElement('div');
    card.className = 'group bg-white rounded-3xl p-3 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all duration-300 flex flex-col justify-between cursor-pointer';
    card.onclick = () => window.location.href = `game.html?id=${game.id}`;

    card.innerHTML = `
      <div class="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100 border-2 border-black">
        <img src="${game.image}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
        <div class="absolute top-2.5 right-2.5 bg-black/85 backdrop-blur-sm text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-400/40">
          ${game.maxMultiplier}
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-gray-900 group-hover:text-brand-red transition-colors text-sm sm:text-base">${game.title}</h4>
          <span class="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">${game.category}</span>
        </div>
        <p class="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">${game.tagline}</p>
      </div>
      <a href="game.html?id=${game.id}" class="comic-btn comic-btn-red w-full mt-3 text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-center">
        <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
        <span>Play & View Game</span>
      </a>
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
  if (event && event.target) {
    event.target.classList.add('active');
  }
  renderCatalog(category);
}

// --- 6. Comprehensive Game Popup Modal (Video + Play Demo + RTP + Info) ---
function openGameModal(gameId) {
  const game = gamesData[gameId] || gamesData['weed_bush'];
  const modal = document.getElementById('game-modal');
  const title = document.getElementById('modal-game-title');
  const thumb = document.getElementById('modal-game-thumb');
  const badge = document.getElementById('modal-game-badge');
  const content = document.getElementById('modal-content');

  modal.classList.add('active');

  title.textContent = game.title;
  thumb.src = game.image;
  badge.textContent = `${game.category} • ${game.maxMultiplier} Max Win`;

  // Render Video + Info View
  renderModalOverview(game);

  if (window.lucide) window.lucide.createIcons();
}

function renderModalOverview(game) {
  const content = document.getElementById('modal-content');
  if (!content) return;

  content.innerHTML = `
    <div class="w-full max-w-2xl flex flex-col gap-4 text-left">
      
      <!-- Video Showcase of the Game -->
      <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-gray-200">
        <video 
          id="modal-game-video" 
          autoplay 
          loop 
          muted 
          playsinline 
          poster="${game.image}" 
          class="w-full h-full object-cover"
        >
          <source src="${game.video}" type="video/mp4">
          <source src="${game.video}" type="video/webm">
        </video>
        
        <!-- Live Preview HUD Overlay -->
        <div class="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/10 shadow">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>GAMEPLAY VIDEO</span>
        </div>
        <div class="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-black text-amber-300 border border-amber-400/30">
          MAX ${game.maxMultiplier}
        </div>
      </div>

      <!-- Prominent PLAY DEMO Action Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h4 class="font-bold text-gray-900 text-base flex items-center gap-2">
            <span>${game.title}</span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-brand-red border border-red-200">${game.category}</span>
          </h4>
          <p class="text-xs text-gray-500 mt-0.5">${game.tagline}</p>
        </div>
        <button 
          onclick="launchInteractiveDemo('${game.id}')" 
          class="comic-btn comic-btn-red w-full sm:w-auto text-xs sm:text-sm px-7 py-3 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <i data-lucide="play" class="w-4 h-4 fill-current"></i>
          <span>PLAY DEMO NOW</span>
        </button>
      </div>

      <!-- RTP & Technical Specs Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div class="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-xs">
          <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Certified RTP</div>
          <div class="text-sm sm:text-base font-black text-emerald-600 mt-0.5">${game.rtp}</div>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-xs">
          <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Volatility</div>
          <div class="text-sm sm:text-base font-black text-gray-900 mt-0.5">${game.volatility}</div>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-xs">
          <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Max Win</div>
          <div class="text-sm sm:text-base font-black text-brand-red mt-0.5">${game.maxMultiplier}</div>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-xs">
          <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Fairness</div>
          <div class="text-sm sm:text-base font-black text-amber-600 mt-0.5">Provably Fair</div>
        </div>
      </div>

      <!-- Basic Game Info & Description -->
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Game Info & Mechanics</h5>
        <p class="text-xs sm:text-sm text-gray-700 leading-relaxed">${game.description}</p>
        
        <div class="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
          ${game.features.map(f => `<span class="bg-gray-50 text-gray-600 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-gray-200">✓ ${f}</span>`).join('')}
        </div>
      </div>

    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function launchInteractiveDemo(gameId) {
  const content = document.getElementById('modal-content');
  if (!content) return;

  const game = gamesData[gameId] || gamesData['weed_bush'];

  // Wrap with Back button
  content.innerHTML = `
    <div class="w-full max-w-md flex flex-col items-center">
      <div class="w-full flex items-center justify-between mb-3">
        <button onclick="renderModalOverview(gamesData['${gameId}'])" class="comic-btn comic-btn-light text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer">
          <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
          <span>Back to Video & Info</span>
        </button>
        <span class="text-xs font-bold text-amber-600">Interactive Sandbox</span>
      </div>
      <div id="demo-game-container" class="w-full flex justify-center"></div>
    </div>
  `;

  const container = document.getElementById('demo-game-container');
  if (gameId === 'plinko_koko') {
    initPlinkoGame(container);
  } else if (gameId === 'weed_bush') {
    initWeedBushGame(container);
  } else if (gameId === 'bad_darts') {
    initBadDartsGame(container);
  } else {
    initWeedBushGame(container);
  }

  if (window.lucide) window.lucide.createIcons();
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  modal.classList.remove('active');
  const video = document.getElementById('modal-game-video');
  if (video) {
    video.pause();
  }
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
        <button id="drop-egg-btn" onclick="dropPlinkoEgg()" class="comic-btn comic-btn-red text-sm px-7 py-3 rounded-full flex items-center gap-2 cursor-pointer">
          <span>🥚 Drop Rainbow Egg</span>
        </button>
      </div>
      <p class="text-[11px] text-gray-400 mt-2">Click to drop an egg and bounce through the pegs!</p>
    </div>
  `;

  const canvas = document.getElementById('plinko-canvas');
  const ctx = canvas.getContext('2d');

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
      b.vy += 0.22;
      b.x += b.vx;
      b.y += b.vy;

      pegs.forEach(peg => {
        const dx = b.x - peg.x;
        const dy = b.y - peg.y;
        const dist = Math.hypot(dx, dy);
        if (dist < b.r + peg.r) {
          const angle = Math.atan2(dy, dx);
          b.vx = Math.cos(angle) * (1.8 + Math.random() * 0.5);
          b.vy = Math.sin(angle) * 1.5;
        }
      });

      if (b.x < b.r) { b.x = b.r; b.vx *= -0.7; }
      if (b.x > canvas.width - b.r) { b.x = canvas.width - b.r; b.vx *= -0.7; }

      if (b.y >= canvas.height - 35) {
        const bucketIndex = Math.min(multipliers.length - 1, Math.max(0, Math.floor(b.x / bucketWidth)));
        const mult = multipliers[bucketIndex];
        const win = 5 * mult;
        window.plinkoState.balance += win;

        const balEl = document.getElementById('plinko-balance');
        const winEl = document.getElementById('plinko-win');
        if (balEl) balEl.textContent = `$${window.plinkoState.balance.toFixed(2)}`;
        if (winEl) winEl.textContent = `+$${win.toFixed(2)} (x${mult})`;
        balls.splice(i, 1);
        continue;
      }

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
  const balEl = document.getElementById('plinko-balance');
  if (balEl) balEl.textContent = `$${window.plinkoState.balance.toFixed(2)}`;

  const canvas = document.getElementById('plinko-canvas');
  if (!canvas) return;
  window.plinkoState.balls.push({
    x: canvas.width / 2 + (Math.random() * 20 - 10),
    y: 15,
    vx: (Math.random() - 0.5) * 1.5,
    vy: 1,
    r: 7
  });
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
        <button id="weed-cashout" onclick="cashoutWeed()" class="comic-btn comic-btn-green text-xs px-4 py-2 rounded-xl opacity-50 cursor-not-allowed" disabled>
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
    tileEl.innerHTML = `💀`;
    tileEl.style.backgroundColor = '#ef4444';
    weedState.active = false;
    showToast('Lawnmower broke down! 💀 Try again!');
    const multEl = document.getElementById('weed-mult');
    const cashEl = document.getElementById('weed-cashout');
    if (multEl) multEl.textContent = 'BUSTED';
    if (cashEl) {
      cashEl.disabled = true;
      cashEl.classList.add('opacity-50', 'cursor-not-allowed');
    }
  } else {
    weedState.clearedCount++;
    weedState.multiplier = parseFloat((weedState.multiplier + 0.45).toFixed(2));
    tileEl.innerHTML = `<span class="text-emerald-700 font-black text-xs">x${weedState.multiplier}</span>`;
    const multEl = document.getElementById('weed-mult');
    if (multEl) multEl.textContent = `x${weedState.multiplier.toFixed(2)}`;

    const cashoutBtn = document.getElementById('weed-cashout');
    if (cashoutBtn) {
      cashoutBtn.disabled = false;
      cashoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}

function cashoutWeed() {
  if (!weedState || !weedState.active || weedState.clearedCount === 0) return;
  showToast(`Cashed out at x${weedState.multiplier.toFixed(2)} Multiplier! 🎉`);
  weedState.active = false;
  const cashEl = document.getElementById('weed-cashout');
  if (cashEl) cashEl.disabled = true;
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
        <div id="dart-aim" class="absolute w-6 h-6 border-2 border-yellow-300 rounded-full pointer-events-none transition-all duration-75"></div>
        <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-black text-gray-900 shadow">
          x50
        </div>
      </div>

      <div class="mt-4 flex items-center gap-3">
        <button onclick="throwDartCenter()" class="comic-btn comic-btn-red text-xs px-6 py-2.5 rounded-full cursor-pointer">
          🎯 Quick Throw
        </button>
      </div>
      <p class="text-[11px] text-gray-400 mt-2 text-center">Click the dartboard to aim for the x50 bullseye multiplier!</p>
    </div>
  `;

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
  if (!board) return;
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
    const scoreEl = document.getElementById('darts-score');
    if (scoreEl) scoreEl.textContent = `${dartsScore} PTS (x${mult} Hit!)`;
    showToast(`BULLSEYE! x${mult} Multiplier Hit! 🎯`);
  } else {
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
  const modal = document.getElementById('game-modal');
  const title = document.getElementById('modal-game-title');
  const badge = document.getElementById('modal-game-badge');
  const content = document.getElementById('modal-content');
  modal.classList.add('active');
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
        <button type="submit" class="comic-btn comic-btn-red w-full text-xs py-3 rounded-xl cursor-pointer">Submit Application</button>
      </form>
    </div>
  `;
}

function handleApplySubmit(e) {
  e.preventDefault();
  closeGameModal();
  showToast('Application submitted! Bad Dad will review it soon.');
}

function handleContactSubmit(e) {
  e.preventDefault();
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
  
  // Ensure hero video autoplays smoothly
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
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
