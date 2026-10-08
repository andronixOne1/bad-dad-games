/* ==========================================================================
   Bad Dad Games - Dedicated Game Page Controller (game.js)
   Controls game page state, dynamic routing via ?id=, specs, video & demos
   ========================================================================== */

let currentGameId = 'weed_bush';
let currentStageMode = 'video'; // 'video' | 'demo'

// 1. Initialize Page from URL query param
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id') || urlParams.get('game');
  
  if (requestedId && gamesData[requestedId]) {
    currentGameId = requestedId;
  } else {
    currentGameId = 'weed_bush';
  }

  loadGamePage(currentGameId);
});

// 2. Load game data into page
function loadGamePage(gameId) {
  const game = gamesData[gameId] || gamesData['weed_bush'];
  currentGameId = game.id;

  // Update Page Title
  document.getElementById('page-title').textContent = `${game.title} | Bad Dad Games`;

  // Update Header text
  document.getElementById('game-title').textContent = game.title;
  document.getElementById('game-tagline').textContent = game.tagline;
  document.getElementById('game-category-badge').textContent = game.category;
  document.getElementById('game-selector').value = game.id;

  // Update Specs
  document.getElementById('spec-rtp').textContent = game.rtp;
  document.getElementById('spec-max').textContent = game.maxMultiplier;
  document.getElementById('spec-volatility').textContent = game.volatility;
  document.getElementById('spec-bet').textContent = game.betRange;

  // Update Video
  const videoEl = document.getElementById('game-video');
  const srcMp4 = document.getElementById('video-source-mp4');
  const srcWebm = document.getElementById('video-source-webm');
  const maxBadge = document.getElementById('video-max-mult');

  if (maxBadge) maxBadge.textContent = `MAX ${game.maxMultiplier}`;

  if (videoEl && srcMp4 && srcWebm) {
    srcMp4.src = game.video;
    srcWebm.src = game.video;
    videoEl.poster = game.image;
    videoEl.load();
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy handled silently
      });
    }
  }

  // Update Description & Features
  document.getElementById('game-description').textContent = game.description;
  const featuresList = document.getElementById('game-features');
  if (featuresList) {
    featuresList.innerHTML = game.features.map(f => `
      <div class="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border-2 border-black/10 text-xs font-semibold text-gray-800">
        <span class="text-brand-red font-black">✓</span>
        <span>${f}</span>
      </div>
    `).join('');
  }

  // Render Other Games Recommendations
  renderOtherGames(game.id);

  // Default to Video stage mode
  setStageMode('video');

  // Re-create icons
  if (window.lucide) window.lucide.createIcons();
}

// 3. Stage Mode Switcher (Video vs Playable Sandbox)
function setStageMode(mode) {
  currentStageMode = mode;
  const videoContainer = document.getElementById('video-container');
  const sandboxContainer = document.getElementById('sandbox-container');
  const tabVideo = document.getElementById('tab-video');
  const tabDemo = document.getElementById('tab-demo');
  const statusBadge = document.getElementById('stage-status-badge');
  const videoEl = document.getElementById('game-video');

  if (mode === 'video') {
    videoContainer.classList.remove('hidden');
    sandboxContainer.classList.add('hidden');
    
    tabVideo.className = 'comic-btn comic-btn-red text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer';
    tabDemo.className = 'comic-btn comic-btn-light text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer';
    if (statusBadge) statusBadge.textContent = 'HD Gameplay Video';

    if (videoEl) {
      videoEl.play().catch(() => {});
    }
  } else {
    videoContainer.classList.add('hidden');
    sandboxContainer.classList.remove('hidden');

    tabVideo.className = 'comic-btn comic-btn-light text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer';
    tabDemo.className = 'comic-btn comic-btn-red text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer';
    if (statusBadge) statusBadge.textContent = 'Live Interactive Sandbox';

    if (videoEl) {
      videoEl.pause();
    }

    // Mount interactive game
    if (currentGameId === 'plinko_koko') {
      initPlinkoGame(sandboxContainer);
    } else if (currentGameId === 'bad_darts') {
      initBadDartsGame(sandboxContainer);
    } else {
      initWeedBushGame(sandboxContainer);
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

// 4. Quick Game Switch
function switchGame(gameId) {
  const url = new URL(window.location);
  url.searchParams.set('id', gameId);
  window.history.pushState({}, '', url);
  loadGamePage(gameId);
}

// 5. Render other games cards
function renderOtherGames(currentId) {
  const grid = document.getElementById('other-games-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const others = Object.values(gamesData).filter(g => g.id !== currentId).slice(0, 3);
  others.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card group flex flex-col items-center w-full transition-all duration-300';
    card.innerHTML = `
      <div class="relative w-full aspect-square">
        <div class="game-thumb-container w-full h-full rounded-[30px] overflow-hidden cursor-pointer bg-black" onclick="window.location.href='game.html?id=${game.id}'">
          <img src="${game.image}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute bottom-4 left-5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <h3 class="text-xl sm:text-2xl font-black font-comic text-white leading-tight">${game.title}</h3>
            <p class="text-xs sm:text-sm font-semibold text-gray-300 leading-none mt-0.5">${game.category}</p>
          </div>
        </div>
        <a href="game.html?id=${game.id}" class="comic-demo-btn absolute -bottom-3 -right-3 z-30 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl flex items-center gap-2 text-sm sm:text-base font-black uppercase cursor-pointer">
          <span class="text-xs leading-none">►</span>
          <span>DEMO</span>
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}
