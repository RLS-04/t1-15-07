import { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, Volume2, VolumeX, Sparkles, Wind, Cake, Star } from 'lucide-react';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
type Scene = 'loading' | 'reveal' | 'wish' | 'cake' | 'cut' | 'distribute' | 'finale';

// Scene type defined above

/* ═══════════════════════════════════════════
   FLOATING HEARTS PARTICLE SYSTEM
   ═══════════════════════════════════════════ */
function FloatingHearts({ count = 15, color = '#ff4d6d' }: { count?: number; color?: string }) {
  const [hearts] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 12 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="particle-heart"
          style={{
            left: `${h.left}%`,
            bottom: '-5%',
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            opacity: h.opacity,
          }}
        >
          <Heart
            size={h.size}
            fill={color}
            color={color}
            style={{ opacity: h.opacity }}
          />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONFETTI SYSTEM
   ═══════════════════════════════════════════ */
function Confetti({ active }: { active: boolean }) {
  const [pieces] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: ['#ff4d6d', '#ffd700', '#ff8fa3', '#ffb6c1', '#ff69b4', '#ffa500'][Math.floor(Math.random() * 6)],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }))
  );

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            borderRadius: '2px',
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCENE 1: LOADING
   ═══════════════════════════════════════════ */
function LoadingScene({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="scene-enter flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-pink-100 via-pink-50 to-white">
      <FloatingHearts count={10} />
      <div className="heart-beat mb-8">
        <Heart size={80} fill="#ff4d6d" color="#ff4d6d" />
      </div>
      <h2 className="text-2xl font-bold text-pink-500 text-glow tracking-wide">
        Loading Love...
      </h2>
      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-pink-400"
            style={{ animation: `bounceIn 0.6s ${i * 0.2}s infinite alternate` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCENE 2: REVEAL (Envelope + First Crush)
   ═══════════════════════════════════════════ */
function RevealScene({ onComplete }: { onComplete: () => void }) {
  const [envelopeClicked, setEnvelopeClicked] = useState(false);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [flyAway, setFlyAway] = useState(false);

  const handleEnvelopeClick = () => {
    if (envelopeClicked) return;
    setEnvelopeClicked(true);
    setFlyAway(true);

    setTimeout(() => setShowText1(true), 600);
    setTimeout(() => setShowText2(true), 1800);
    setTimeout(() => setShowText3(true), 3200);
    setTimeout(onComplete, 5500);
  };

  return (
    <div className="scene-enter relative flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-pink-100 via-rose-50 to-pink-100 overflow-hidden">
      <FloatingHearts count={20} />

      {/* Envelope */}
      {!flyAway && (
        <div
          className={`tap-target z-20 transition-all duration-300 ${envelopeClicked ? 'envelope-fly' : 'hover:scale-105'}`}
          onClick={handleEnvelopeClick}
        >
          <div className="relative">
            <div className="w-48 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-xl border-2 border-amber-300 flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-200 to-amber-300 rounded-t-lg clip-envelope" />
              <Heart size={40} fill="#ff4d6d" color="#ff4d6d" className="relative z-10" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-amber-600 text-sm font-semibold whitespace-nowrap">
              Tap to Open
            </div>
          </div>
        </div>
      )}

      {/* Reveal Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {showText1 && (
          <h1 className="text-reveal text-3xl md:text-4xl font-bold text-gray-700 mb-4 text-center" style={{ animationDelay: '0s' }}>
            Hey there...
          </h1>
        )}
        {showText2 && (
          <div className="text-reveal flex flex-col items-center" style={{ animationDelay: '0s' }}>
            <p className="text-xl text-gray-600 mb-3 text-center">I want you to know something...</p>
            <div className="flex items-center gap-3">
              <Heart size={28} fill="#ff4d6d" color="#ff4d6d" className="heart-beat" />
              <span className="text-3xl md:text-5xl font-bold text-pink-500 text-glow">You are...</span>
              <Heart size={28} fill="#ff4d6d" color="#ff4d6d" className="heart-beat" />
            </div>
          </div>
        )}
        {showText3 && (
          <div className="text-reveal mt-6 flex flex-col items-center" style={{ animationDelay: '0s' }}>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-glow text-center">
              My First Crush
            </h2>
            <div className="mt-4 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} size={24} fill="#ff4d6d" color="#ff4d6d" className="heart-float" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <p className="mt-6 text-lg text-gray-500 text-center italic">
              Forever special in my heart...
            </p>
          </div>
        )}
      </div>

      <style>{`
        .clip-envelope {
          clip-path: polygon(0 0, 50% 70%, 100% 0);
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCENE 3: WISH INPUT
   ═══════════════════════════════════════════ */
function WishScene({ onComplete, userWish, setUserWish }: {
  onComplete: () => void;
  userWish: string;
  setUserWish: (w: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowIntro(true), 300);
    setTimeout(() => setShowKeyboard(true), 1000);
  }, []);

  const handleSubmit = () => {
    if (userWish.trim()) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setTimeout(onComplete, 500);
      }, 3000);
    }
  };

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ];

  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      setUserWish(userWish.slice(0, -1));
    } else if (userWish.length < 100) {
      setUserWish(userWish + key);
    }
  };

  return (
    <div className="scene-enter relative flex flex-col h-full w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/bg-garden.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <FloatingHearts count={12} color="#ffb6c1" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
        {/* Intro Text */}
        {showIntro && (
          <div className="text-reveal text-center mt-8">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              It's Your 22nd Birthday!
            </h2>
            <p className="text-lg text-white/90 mt-2 drop-shadow">
              Make a wish, beautiful...
            </p>
          </div>
        )}

        {/* Wish Display */}
        <div className="flex-1 flex items-center justify-center w-full px-4">
          <div className="wish-card w-full max-w-md rounded-2xl p-6 text-center">
            <Sparkles className="mx-auto mb-3 text-yellow-300" size={28} />
            <p className="text-white text-lg min-h-[3rem] font-medium">
              {userWish || <span className="text-white/50">Type your birthday wish...</span>}
              <span className="typewriter-cursor" />
            </p>
          </div>
        </div>

        {/* Virtual Keyboard */}
        {showKeyboard && (
          <div className="slide-up w-full max-w-lg">
            <div className="glass rounded-2xl p-3">
              {keys.map((row, ri) => (
                <div key={ri} className="flex justify-center gap-1 mb-1.5">
                  {row.map((key) => (
                    <button
                      key={key}
                      className="key-btn flex-1 max-w-[40px] text-sm py-2.5"
                      onClick={() => handleKeyPress(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <button
                  className="key-btn flex-1 py-3 text-sm bg-pink-100 border-pink-300"
                  onClick={() => handleKeyPress(' ')}
                >
                  Space
                </button>
                <button
                  className="key-btn px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white border-0 shadow-lg"
                  onClick={handleSubmit}
                >
                  <Heart size={20} fill="white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Wish Modal */}
      {showModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="modal-enter wish-card rounded-3xl p-8 max-w-sm mx-4 text-center">
            <div className="heart-beat mb-4">
              <Heart size={60} fill="#ff4d6d" color="#ff4d6d" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Your Wish</h3>
            <p className="text-white/90 text-lg italic">"{userWish}"</p>
            <p className="text-white/60 mt-4 text-sm">May all your dreams come true...</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCENE 4: CAKE WITH BLOWABLE CANDLES
   ═══════════════════════════════════════════ */
function CakeScene({ onComplete }: { onComplete: () => void }) {
  const [blown, setBlown] = useState(false);
  const [smokeProgress, setSmokeProgress] = useState(0);
  const [showCake, setShowCake] = useState(true);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);

    // Animate smoke filling screen
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setSmokeProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setShowCake(false);
        setTimeout(onComplete, 300);
      }
    }, 30);
  };

  return (
    <div className="scene-enter relative flex flex-col items-center justify-center h-full w-full overflow-hidden">
      {/* Night Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#1a1a4e] to-[#2d1b69]" />

      {/* Stars */}
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            '--duration': `${2 + Math.random() * 3}s`,
            '--min-opacity': `${0.2 + Math.random() * 0.3}`,
          } as React.CSSProperties}
        />
      ))}

      {/* Moon */}
      <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 glow-gold">
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0a0a2e] to-[#1a1a4e]" style={{ marginLeft: '8px', marginTop: '-4px' }} />
      </div>

      {showCake && (
        <>
          {/* Title */}
          <div className="relative z-10 text-center mb-8">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              Make a Wish...
            </h2>
            <p className="text-white/70 mt-1">and blow out the candles!</p>
          </div>

          {/* 3D Cake */}
          <div className="relative z-10 cake-3d">
            <div className="relative">
              {/* Cake Plate */}
              <div className="w-64 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full mx-auto shadow-xl" />

              {/* Cake Bottom Layer */}
              <div className="w-56 h-24 bg-gradient-to-b from-pink-400 to-pink-500 rounded-lg mx-auto -mt-2 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                {/* Decorative dots */}
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-white/40"
                    style={{ left: `${10 + i * 12}%`, top: '60%' }}
                  />
                ))}
              </div>

              {/* Cake Top Layer */}
              <div className="w-44 h-20 bg-gradient-to-b from-pink-300 to-pink-400 rounded-lg mx-auto -mt-16 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                {/* Icing drip */}
                <div className="absolute top-0 left-0 right-0 flex justify-around">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="w-6 bg-gradient-to-b from-white/80 to-pink-200/50 rounded-b-full"
                      style={{ height: `${12 + Math.random() * 16}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* Cake Top Surface */}
              <div className="w-44 h-6 bg-gradient-to-b from-pink-200 to-pink-300 rounded-[50%] mx-auto -mt-24 shadow-sm" />

              {/* Candles */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Flame */}
                    {!blown && (
                      <div className={`candle-flame mb-1`} style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="w-4 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full shadow-lg"
                          style={{ boxShadow: '0 0 10px #ffa500, 0 0 20px #ff8c00' }}
                        />
                      </div>
                    )}
                    {blown && (
                      <div className="flame-extinguish mb-1">
                        <div className="w-4 h-6 bg-gradient-to-t from-gray-400 to-gray-200 rounded-full" />
                      </div>
                    )}
                    {/* Candle body */}
                    <div className="w-3 h-12 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm shadow-md" />
                  </div>
                ))}
              </div>

              {/* Strawberries decoration */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-10">
                {[0, 1].map((i) => (
                  <div key={i} className={`${i === 0 ? '-ml-8' : 'ml-8'}`}>
                    <div className="w-5 h-5 bg-gradient-to-b from-red-400 to-red-600 rounded-full shadow-md">
                      <div className="w-2 h-2 bg-green-400 rounded-full -mt-1 mx-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blow Button */}
          {!blown && (
            <button
              onClick={handleBlow}
              className="tap-target relative z-10 mt-10 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-xl glow-pink flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Wind size={24} />
              Make a Wish & Blow!
            </button>
          )}

          {blown && (
            <div className="relative z-10 mt-10 text-center">
              <p className="text-white text-xl font-bold animate-pulse">Wish Made!</p>
            </div>
          )}

          {/* Smoke Effect Overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-gray-300 via-gray-200 to-white transition-opacity duration-100"
            style={{ opacity: smokeProgress / 100 }}
          />
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCENE 5: CUT THE CAKE
   ═══════════════════════════════════════════ */
function CutScene({ onComplete }: { onComplete: () => void }) {
  const [cutProgress, setCutProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cutComplete, setCutComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => setIsDragging(true);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || cutComplete) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    // Check if following the cut line (roughly diagonal)
    const expectedY = 20 + (x / 100) * 60;
    if (Math.abs(y - expectedY) < 20 && x > cutProgress) {
      setCutProgress(x);
      if (x > 90) {
        setCutComplete(true);
        setTimeout(onComplete, 1500);
      }
    }
  }, [isDragging, cutComplete, cutProgress, onComplete]);

  const handleDragEnd = () => setIsDragging(false);

  return (
    <div className="scene-enter relative flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50">
      <FloatingHearts count={8} color="#ffa500" />

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Cut the Cake!</h2>
        <p className="text-gray-500 mt-1">Drag the knife along the dotted line</p>
      </div>

      {/* Cake Container */}
      <div
        ref={containerRef}
        className="relative w-72 h-72 select-none"
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Top-down Cake */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Cake base */}
          <circle cx="100" cy="100" r="90" fill="#f4a460" stroke="#d2691e" strokeWidth="3" />
          <circle cx="100" cy="100" r="85" fill="#fdbcb4" />
          <circle cx="100" cy="100" r="75" fill="#ffb6c1" />

          {/* Icing decorations */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 100 + 65 * Math.cos(angle);
            const y = 100 + 65 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="6" fill="white" opacity="0.8" />;
          })}

          {/* Center decoration */}
          <circle cx="100" cy="100" r="15" fill="#ff69b4" />
          <circle cx="100" cy="100" r="10" fill="#ffb6c1" />
          <circle cx="100" cy="100" r="5" fill="white" />

          {/* Cut line (dotted) */}
          {!cutComplete && (
            <line
              x1="30" y1="50" x2="170" y2="150"
              stroke="#ff4d6d"
              strokeWidth="3"
              strokeDasharray="8 8"
              className="cut-line"
              opacity={0.7}
            />
          )}

          {/* Cut progress line (solid) */}
          {cutProgress > 0 && (
            <line
              x1="30" y1="50"
              x2={30 + (cutProgress / 100) * 140}
              y2={50 + (cutProgress / 100) * 100}
              stroke="#ff4d6d"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}

          {/* Complete cut */}
          {cutComplete && (
            <>
              <line x1="30" y1="50" x2="170" y2="150" stroke="#ff4d6d" strokeWidth="3" />
              <line x1="30" y1="150" x2="170" y2="50" stroke="#ff4d6d" strokeWidth="3" opacity="0.5" />
            </>
          )}
        </svg>

        {/* Draggable Knife */}
        {!cutComplete && (
          <div
            className="absolute tap-target cursor-grab active:cursor-grabbing"
            style={{
              left: `${15 + (cutProgress / 100) * 70}%`,
              top: `${20 + (cutProgress / 100) * 40}%`,
              transform: 'translate(-50%, -50%) rotate(-30deg)',
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <div className="relative">
              <div className="w-4 h-16 bg-gradient-to-b from-gray-300 to-gray-500 rounded-sm shadow-lg" />
              <div className="w-6 h-8 bg-gradient-to-b from-amber-700 to-amber-900 rounded-sm -mt-2 -ml-1 shadow-md" />
            </div>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mt-6 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-400 to-rose-500 progress-fill rounded-full"
          style={{ width: `${cutProgress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">{Math.round(cutProgress)}%</p>

      {cutComplete && (
        <div className="mt-4 text-center bounce-in">
          <p className="text-xl font-bold text-pink-500">Perfect Cut!</p>
          <p className="text-gray-500">Now let's share with everyone...</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCENE 6: DISTRIBUTE CAKE SLICES
   ═══════════════════════════════════════════ */
function DistributeScene({ onComplete }: { onComplete: () => void }) {
  const [distributed, setDistributed] = useState<boolean[]>([false, false, false, false, false]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [animatingSlice, setAnimatingSlice] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => setShowIntro(false), 2000);
  }, []);

  const recipients = [
    { name: "Father", image: "/images/father-photo.jpg", position: "top", message: "For you, always in our hearts..." },
    { name: "Mother", image: "/images/mother.jpg", position: "left", message: "For the loving mother..." },
    { name: "Brother", image: "/images/brother.jpg", position: "right", message: "For the caring brother..." },
    { name: "Kitty", image: "/images/kitty.jpg", position: "bottom-left", message: "For the adorable kitty..." },
    { name: "Me", image: "/images/crush.jpg", position: "bottom-right", message: "And this one is for me!" },
  ];

  const handleGiveSlice = () => {
    if (currentIndex >= 5 || animatingSlice !== null) return;

    setAnimatingSlice(currentIndex);

    setTimeout(() => {
      const newDistributed = [...distributed];
      newDistributed[currentIndex] = true;
      setDistributed(newDistributed);
      setAnimatingSlice(null);
      setCurrentIndex(currentIndex + 1);

      if (currentIndex === 4) {
        setTimeout(onComplete, 2500);
      }
    }, 1200);
  };

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top': return 'top-4 left-1/2 -translate-x-1/2';
      case 'left': return 'top-1/2 left-4 -translate-y-1/2';
      case 'right': return 'top-1/2 right-4 -translate-y-1/2';
      case 'bottom-left': return 'bottom-24 left-8';
      case 'bottom-right': return 'bottom-24 right-8';
      default: return '';
    }
  };

  return (
    <div className="scene-enter relative flex flex-col h-full w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/bg-dining.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

      {/* Intro Overlay */}
      {showIntro && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
          <div className="modal-enter text-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Time to Share!</h2>
            <p className="text-white/80 mt-2">Give cake slices to everyone...</p>
          </div>
        </div>
      )}

      {/* Recipient Nodes */}
      {recipients.map((recipient, i) => (
        <div
          key={i}
          className={`absolute z-10 ${getPositionClasses(recipient.position)}`}
        >
          <div className="flex flex-col items-center">
            {/* Recipient Image */}
            <div className={`relative w-20 h-20 rounded-full overflow-hidden border-4 shadow-xl transition-all duration-500 ${
              distributed[i] ? 'border-pink-400 scale-110 glow-pink' : 'border-white/50'
            }`}>
              <img
                src={recipient.image}
                alt={recipient.name}
                className="w-full h-full object-cover"
              />
              {distributed[i] && (
                <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                  <Heart size={24} fill="white" color="white" />
                </div>
              )}
            </div>

            {/* Name Label */}
            <span className={`mt-1 text-xs font-bold px-2 py-0.5 rounded-full ${
              distributed[i] ? 'bg-pink-500 text-white' : 'bg-black/40 text-white/80'
            }`}>
              {recipient.name}
            </span>

            {/* Slice Animation Target */}
            {animatingSlice === i && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 slice-give">
                <Cake size={32} fill="#ffb6c1" color="#ff69b4" />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Center - Cake Slices */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          {/* Remaining Slices */}
          <div className="flex gap-2 justify-center mb-4">
            {Array.from({ length: 5 - currentIndex }, (_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 ${animatingSlice !== null && i === 0 ? 'scale-0' : 'bounce-in'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 relative">
                  <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
                    <path d="M25 5 L45 40 Q25 35 5 40 Z" fill="#ffb6c1" stroke="#ff69b4" strokeWidth="2" />
                    <path d="M25 5 L45 40 Q25 35 5 40 Z" fill="url(#cakeGradient)" opacity="0.8" />
                    <defs>
                      <linearGradient id="cakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffb6c1" />
                        <stop offset="50%" stopColor="#fdbcb4" />
                        <stop offset="100%" stopColor="#f4a460" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Current Recipient Message */}
          {currentIndex < 5 && !showIntro && (
            <div className="text-reveal mb-4">
              <p className="text-white text-lg font-medium drop-shadow-lg">
                {recipients[currentIndex].message}
              </p>
            </div>
          )}

          {/* Give Button */}
          {currentIndex < 5 && !showIntro && (
            <button
              onClick={handleGiveSlice}
              disabled={animatingSlice !== null}
              className="tap-target px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-xl glow-pink hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 flex items-center gap-2 mx-auto"
            >
              <Heart size={20} fill="white" />
              Give to {recipients[currentIndex].name}
            </button>
          )}

          {currentIndex >= 5 && (
            <div className="bounce-in text-center">
              <p className="text-2xl font-bold text-white drop-shadow-lg">Everyone got their share!</p>
              <p className="text-white/80 mt-2">Full of love and sweetness...</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {recipients.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              distributed[i] ? 'bg-pink-500 scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCENE 7: FINALE
   ═══════════════════════════════════════════ */
function FinaleScene({ userWish }: { userWish: string }) {
  const [showContent, setShowContent] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showTheEnd, setShowTheEnd] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
    setTimeout(() => setShowMessage(true), 1500);
    setTimeout(() => setShowTheEnd(true), 3000);
  }, []);

  return (
    <div className="scene-enter relative flex flex-col items-center justify-center h-full w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-pink-100 to-rose-100" />

      <FloatingHearts count={25} />
      <Confetti active={showContent} />

      {/* Sparkles */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="sparkle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          <Star size={12 + Math.random() * 12} fill="#ffd700" color="#ffd700" />
        </div>
      ))}

      {/* Main Content */}
      {showContent && (
        <div className="relative z-10 flex flex-col items-center px-6 max-w-md">
          {/* Family Portrait */}
          <div className="modal-enter mb-6">
            <div className="relative">
              <div className="w-64 h-44 rounded-2xl overflow-hidden shadow-2xl glow-pink family-glow border-4 border-white">
                <img
                  src="/images/family-portrait.jpg"
                  alt="Family"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative hearts around */}
              <div className="absolute -top-3 -left-3 heart-float">
                <Heart size={24} fill="#ff4d6d" color="#ff4d6d" />
              </div>
              <div className="absolute -top-2 -right-2 heart-float" style={{ animationDelay: '0.5s' }}>
                <Heart size={20} fill="#ff8fa3" color="#ff8fa3" />
              </div>
              <div className="absolute -bottom-2 -left-2 heart-float" style={{ animationDelay: '1s' }}>
                <Heart size={18} fill="#ffb6c1" color="#ffb6c1" />
              </div>
            </div>
          </div>

          {/* Wish Card */}
          {showMessage && (
            <div className="text-reveal text-center">
              <div className="wish-card rounded-2xl p-6 mb-4">
                <Sparkles className="mx-auto mb-2 text-yellow-300" size={24} />
                <p className="text-white/80 text-sm mb-1">Your wish was:</p>
                <p className="text-white text-lg italic font-medium">"{userWish || 'Happy Birthday!'}"</p>
              </div>

              <div className="text-reveal" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                  Happy 22nd Birthday!
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  May your days be filled with love, joy, and all the happiness you deserve.
                  Your family is always with you, watching over you with love.
                </p>
              </div>

              <div className="text-reveal mt-4" style={{ animationDelay: '0.6s' }}>
                <p className="text-pink-500 font-medium">
                  You will always be my First Crush...
                </p>
              </div>
            </div>
          )}

          {/* The End */}
          {showTheEnd && (
            <div className="text-reveal mt-8 text-center" style={{ animationDelay: '0s' }}>
              <div className="heart-beat inline-block mb-2">
                <Heart size={40} fill="#ff4d6d" color="#ff4d6d" />
              </div>
              <p className="text-gray-400 text-sm tracking-widest uppercase">The End</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   AUDIO TOGGLE
   ═══════════════════════════════════════════ */
function AudioToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full glass flex items-center justify-center tap-target"
    >
      {enabled ? (
        <Volume2 size={20} className="text-white" />
      ) : (
        <VolumeX size={20} className="text-white/60" />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
function App() {
  const [scene, setScene] = useState<Scene>('loading');
  const [userWish, setUserWish] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(false);

  const goToScene = (nextScene: Scene) => {
    setScene(nextScene);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      {/* Audio Toggle */}
      <AudioToggle enabled={audioEnabled} onToggle={() => setAudioEnabled(!audioEnabled)} />

      {/* Scene Renderer */}
      {scene === 'loading' && (
        <LoadingScene onComplete={() => goToScene('reveal')} />
      )}

      {scene === 'reveal' && (
        <RevealScene onComplete={() => goToScene('wish')} />
      )}

      {scene === 'wish' && (
        <WishScene
          onComplete={() => goToScene('cake')}
          userWish={userWish}
          setUserWish={setUserWish}
        />
      )}

      {scene === 'cake' && (
        <CakeScene onComplete={() => goToScene('cut')} />
      )}

      {scene === 'cut' && (
        <CutScene onComplete={() => goToScene('distribute')} />
      )}

      {scene === 'distribute' && (
        <DistributeScene onComplete={() => goToScene('finale')} />
      )}

      {scene === 'finale' && (
        <FinaleScene userWish={userWish} />
      )}
    </div>
  );
}

export default App;
