// ===== STARS BACKGROUND =====
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
}
createStars();

// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
    }, 800);
}
createFloatingHearts();

// ===== SCENE NAVIGATION =====
function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    document.getElementById(sceneId).classList.add('active');
    window.scrollTo(0, 0);
}

function goToScene2() {
    showScene('scene2');
    document.getElementById('popupOverlay').style.display = 'flex';
    document.getElementById('wishDisplay').style.display = 'none';
}

function goToScene3() {
    showScene('scene3');
}

function goToScene4() {
    showScene('scene4');
}

function goToScene5() {
    showScene('scene5');
    startFireworks();
    startFinalHearts();
}

// ===== SCENE 2: WISH INPUT =====
function submitWish() {
    const wish = document.getElementById('wishInput').value.trim();
    if (!wish) {
        alert('Please write a wish first! 💕');
        return;
    }

    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('wishDisplay').style.display = 'flex';
    document.getElementById('wishText').textContent = wish;
}

// ===== SCENE 3: CANDLE LIGHTING =====
let candlesLit = 0;

function lightCandles() {
    const flames = document.querySelectorAll('.flame');
    const glows = document.querySelectorAll('.glow');
    const lightBtn = document.getElementById('lightBtn');
    const blowBtn = document.getElementById('blowBtn');

    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('lit');
            glows[index].classList.add('lit');
        }, index * 500);
    });

    setTimeout(() => {
        lightBtn.style.display = 'none';
        blowBtn.style.display = 'inline-block';
        blowBtn.style.animation = 'fadeIn 1s ease-out forwards';
    }, 2000);
}

// ===== SCENE 4: CAKE SLICING =====
function sliceCake() {
    const knife = document.getElementById('knife');
    const cake = document.getElementById('cake');
    const sliceBtn = document.getElementById('sliceBtn');
    const slicesContainer = document.getElementById('slicesContainer');
    const serveBtn = document.getElementById('serveBtn');

    knife.classList.add('cutting');

    setTimeout(() => {
        cake.classList.add('sliced');
        sliceBtn.style.display = 'none';
        slicesContainer.style.display = 'flex';
        serveBtn.style.display = 'inline-block';
        serveBtn.style.animation = 'fadeIn 1s ease-out forwards';
    }, 1000);
}

function serveSlices() {
    const serveBtn = document.getElementById('serveBtn');
    const finalBtn = document.getElementById('finalBtn');
    const characters = document.querySelectorAll('.character');

    serveBtn.style.display = 'none';

    // Animate each character getting their slice
    characters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('served');
            // Create a mini cake slice that flies to the character
            createFlyingSlice(char, index);
        }, index * 600);
    });

    setTimeout(() => {
        finalBtn.style.display = 'inline-block';
        finalBtn.style.animation = 'fadeIn 1s ease-out forwards';
    }, characters.length * 600 + 500);
}

function createFlyingSlice(character, index) {
    const slice = document.createElement('div');
    slice.style.cssText = `
        position: fixed;
        width: 30px;
        height: 25px;
        background: linear-gradient(to bottom, #8B4513, #D2691E);
        border-radius: 3px;
        z-index: 1000;
        left: 50%;
        top: 50%;
        transition: all 1s ease-in-out;
    `;
    document.body.appendChild(slice);

    const rect = character.getBoundingClientRect();

    setTimeout(() => {
        slice.style.left = rect.left + rect.width/2 - 15 + 'px';
        slice.style.top = rect.top + 'px';
        slice.style.transform = 'scale(0.5)';
        slice.style.opacity = '0';
    }, 50);

    setTimeout(() => slice.remove(), 1100);
}

// ===== SCENE 5: FIREWORKS =====
function startFireworks() {
    const container = document.getElementById('fireworks');
    const colors = ['#ff6b9d', '#f7c531', '#6bcb77', '#4d96ff', '#ff6b35', '#fff'];

    setInterval(() => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 60 + '%';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        firework.style.boxShadow = `0 0 10px ${firework.style.background}`;
        container.appendChild(firework);

        setTimeout(() => firework.remove(), 1000);
    }, 800);
}

function startFinalHearts() {
    const container = document.querySelector('.floating-hearts-final');
    if (!container) return;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 8000);
    }, 500);
}

// ===== REPLACE NAME PLACEHOLDER =====
// User should replace [HER NAME] with actual name in HTML file
// Or use this function if you want to make it dynamic:
function setHerName(name) {
    document.querySelectorAll('.name-placeholder').forEach(el => {
        el.textContent = name;
    });
}

// Example: setHerName('Her Name');
// Uncomment the line above and replace 'Her Name' with her actual name

// ===== AUTO-PLAY MUSIC (optional) =====
// document.getElementById('bgMusic').volume = 0.3;
// document.getElementById('bgMusic').play();
