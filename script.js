const scenes = [
  {
    id: 'entrance',
    text: '🌟 Ayendri walks onto the stage, glowing with happiness...',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div class="character ayendri entering" id="ayendri" style="opacity:0;">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
        </div>
      `;
      setTimeout(() => {
        document.getElementById('ayendri').style.opacity = '1';
      }, 100);
    }
  },
  {
    id: 'lightCandles',
    text: '🔥 The candles are lit one by one... Make a wish, Ayendri!',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div class="character ayendri" id="ayendri">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
        </div>
        <div class="cake-container">
          <div class="candles">
            <div class="candle" id="c1"></div>
            <div class="candle" id="c2"></div>
            <div class="candle" id="c3"></div>
          </div>
          <div class="cake"></div>
        </div>
      `;
      setTimeout(() => {
        document.getElementById('c1').classList.add('lit');
        setTimeout(() => document.getElementById('c2').classList.add('lit'), 400);
        setTimeout(() => document.getElementById('c3').classList.add('lit'), 800);
      }, 500);
    }
  },
  {
    id: 'makeWish',
    text: '✨ Ayendri closes her eyes and makes a beautiful wish...',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div class="character ayendri" id="ayendri">
          <div class="char-head" style="box-shadow: 0 0 30px rgba(255,215,0,0.5);"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
        </div>
        <div class="cake-container">
          <div class="candles">
            <div class="candle lit" id="c1"></div>
            <div class="candle lit" id="c2"></div>
            <div class="candle lit" id="c3"></div>
          </div>
          <div class="cake"></div>
          <div class="wish-stars show" id="wishStars">
            <span class="star">⭐</span>
            <span class="star">✨</span>
            <span class="star">🌟</span>
          </div>
        </div>
      `;
    }
  },
  {
    id: 'blowCandles',
    text: '🌬️ She blows out the candles! The wish is set in the stars...',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div class="character ayendri" id="ayendri">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
        </div>
        <div class="cake-container">
          <div class="candles">
            <div class="candle" id="c1"></div>
            <div class="candle" id="c2"></div>
            <div class="candle" id="c3"></div>
          </div>
          <div class="cake"></div>
        </div>
      `;
      setTimeout(() => {
        document.getElementById('c1').classList.remove('lit');
        setTimeout(() => document.getElementById('c2').classList.remove('lit'), 200);
        setTimeout(() => document.getElementById('c3').classList.remove('lit'), 400);
      }, 800);
    }
  },
  {
    id: 'cutCake',
    text: '🔪 Ayendri cuts the cake with joy and excitement!',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div class="character ayendri" id="ayendri">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
          <div class="knife show" id="knife">🔪</div>
        </div>
        <div class="cake-container">
          <div class="cake" id="mainCake"></div>
        </div>
      `;
      setTimeout(() => {
        const cake = document.getElementById('mainCake');
        cake.style.transform = 'scale(0.95)';
        setTimeout(() => { cake.style.transform = 'scale(1)'; }, 300);
      }, 1000);
    }
  },
  {
    id: 'serveFather',
    text: '👨‍🦳 First slice served to Father with love and respect...',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 30%;"></div>
        <div class="character father" id="father">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Father</div>
          <div class="plate show" style="right: -60px;">🍰</div>
        </div>
        <div class="character ayendri" id="ayendri" style="margin-left: 40px;">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
        </div>
      `;
    }
  },
  {
    id: 'serveMother',
    text: '👩‍🦳 Second slice served to Mother with gratitude...',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 70%;"></div>
        <div class="character ayendri" id="ayendri">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
        </div>
        <div class="character mother" id="mother" style="margin-left: 40px;">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Mother</div>
          <div class="plate show" style="right: -60px;">🍰</div>
        </div>
      `;
    }
  },
  {
    id: 'serveYou',
    text: '💝 A special slice just for you, her favorite person...',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div class="character you" id="You">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ravindu 💙</div>
          <div class="plate show" style="right: -60px;">🍰</div>
        </div>
        <div class="character ayendri" id="ayendri" style="margin-left: 40px;">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
        </div>
      `;
    }
  },
  {
    id: 'bouquet',
    text: '🌹 You present a beautiful bouquet of Roses & Lavender...',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div class="character you" id="you">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ravindu 💙</div>
        </div>
        <div class="character ayendri" id="ayendri" style="margin-left: 40px;">
          <div class="char-head"></div>
          <div class="char-body"></div>
          <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
          </div>
          <div class="char-label">Ayendri 👑</div>
        </div>
        <div class="bouquet show" id="bouquet" style="left: 50%; bottom: 100px; transform: translateX(-50%);">🌹💐🪻</div>
      `;
      setTimeout(() => { createConfetti(); }, 500);
    }
  },
  {
    id: 'hug',
    text: '🤗 You both share the warmest, most loving hug ever...',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div style="display:flex; align-items:flex-end; gap: 5px;">
          <div class="character you hugging" id="you">
            <div class="char-head"></div>
            <div class="char-body"></div>
            <div class="char-legs">
              <div class="char-leg"></div>
              <div class="char-leg"></div>
            </div>
            <div class="char-label">Ravindu 💙</div>
          </div>
          <div class="character ayendri hugging" id="ayendri">
            <div class="char-head"></div>
            <div class="char-body"></div>
            <div class="char-legs">
              <div class="char-leg"></div>
              <div class="char-leg"></div>
            </div>
            <div class="char-label">Ayendri 👑</div>
          </div>
        </div>
        <div class="bouquet show" style="left: 50%; bottom: 90px; transform: translateX(-50%); font-size: 30px;">🌹💐🪻</div>
      `;
      setTimeout(() => {
        createHeart();
        setTimeout(createHeart, 400);
        setTimeout(createHeart, 800);
      }, 500);
      setTimeout(() => { createConfetti(); }, 1000);
    }
  },
  {
    id: 'end',
    text: 'Happy Birthday Ayendri! 🎂✨Wishing you endless love & joy! <br> mama oyata hemadamath adarei 😊 oyawa mata godak watinawa and oyage future path/plan walata subapathanwa !🤗 * Ravindu',
    setup: (container) => {
      container.innerHTML = `
        <div class="spotlight active" style="left: 50%; transform: translateX(-50%);"></div>
        <div style="text-align:center; font-size: 60px; animation: fadeIn 1s ease;">🎂🎉🥳</div>
        <div style="text-align:center; margin-top: 10px; color: #ffd700; font-family: 'Pacifico', cursive; font-size: 1.5rem;">
          Happy Birthday<br>Ayendri! 🎈
        </div>
      `;
      setInterval(createConfetti, 800);
      setInterval(createHeart, 600);
    }
  }
];

let currentScene = -1;

function initDots() {
  const dotsContainer = document.getElementById('sceneDots');
  dotsContainer.innerHTML = '';
  scenes.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.id = `dot-${i}`;
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  scenes.forEach((_, i) => {
    const dot = document.getElementById(`dot-${i}`);
    dot.classList.remove('active', 'completed');
    if (i < currentScene) dot.classList.add('completed');
    else if (i === currentScene) dot.classList.add('active');
  });
}

function updateProgress() {
  const bar = document.getElementById('progressBar');
  const pct = ((currentScene + 1) / scenes.length) * 100;
  bar.style.width = pct + '%';
}

function renderScene(index) {
  const container = document.getElementById('sceneVisual');
  const text = document.getElementById('sceneText');

  if (index < 0 || index >= scenes.length) return;

  currentScene = index;
  text.textContent = scenes[index].text;
  scenes[index].setup(container);
  updateDots();
  updateProgress();

  document.getElementById('nextBtn').disabled = (index >= scenes.length - 1);
  document.getElementById('startBtn').textContent = index === 0 ? '🎊 Start Celebration' : '▶️ Continue';
}

function startCelebration() {
  document.getElementById('startBtn').disabled = true;
  document.getElementById('nextBtn').disabled = false;
  renderScene(0);
}

function nextScene() {
  if (currentScene < scenes.length - 1) {
    renderScene(currentScene + 1);
  }
}

function resetCelebration() {
  currentScene = -1;
  document.getElementById('sceneVisual').innerHTML = '';
  document.getElementById('sceneText').textContent = 'Press "Start Celebration" to begin! 🎉';
  document.getElementById('progressBar').style.width = '0%';
  document.getElementById('startBtn').disabled = false;
  document.getElementById('nextBtn').disabled = true;
  document.getElementById('startBtn').textContent = '🎊 Start Celebration';
  initDots();
}

function createConfetti() {
  const widget = document.getElementById('birthdayWidget');
  const colors = ['#ff6b9d', '#9370db', '#ffd700', '#4ecdc4', '#ff8a65', '#81c784'];
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.top = '-10px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    widget.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

function createHeart() {
  const widget = document.getElementById('birthdayWidget');
  const heart = document.createElement('div');
  heart.className = 'heart-float';
  heart.textContent = ['❤️', '💖', '💕', '💗', '💝'][Math.floor(Math.random() * 5)];
  heart.style.left = (30 + Math.random() * 40) + '%';
  heart.style.bottom = '150px';
  heart.style.fontSize = (20 + Math.random() * 15) + 'px';
  widget.appendChild(heart);
  setTimeout(() => heart.remove(), 2500);
}

// Initialize
initDots();
