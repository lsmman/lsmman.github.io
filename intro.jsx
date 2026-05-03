// intro.jsx — Hail Mary style intro sequence
// Loaded as <script type="text/babel" src="intro.jsx"> before the main app

const { motion, AnimatePresence, useAnimate, stagger } = window.Motion;
const { useState, useEffect, useRef, useCallback } = React;

// ── Star field canvas ──────────────────────────────────────────────────────
function StarField({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const CX = W / 2, CY = H / 2;

    // Init stars
    const N = 320;
    starsRef.current = Array.from({ length: N }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * Math.max(W, H) * 0.7,
      size: Math.random() * 1.6 + 0.2,
      opacity: Math.random() * 0.7 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0004 + 0.0001,
    }));

    let t = 0;
    let warpProgress = 0; // 0→1 = warp out

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      if (active) warpProgress = Math.min(warpProgress + 0.008, 1);
      else warpProgress = Math.max(warpProgress - 0.02, 0);

      starsRef.current.forEach(star => {
        const x = CX + Math.cos(star.angle) * star.radius;
        const y = CY + Math.sin(star.angle) * star.radius;
        const twinkle = 0.5 + 0.5 * Math.sin(t * 2 + star.twinkle);
        const op = star.opacity * twinkle;

        if (warpProgress > 0) {
          // Warp: stretch stars outward
          const warpLen = warpProgress * star.radius * 0.18;
          const ex = CX + Math.cos(star.angle) * (star.radius + warpLen);
          const ey = CY + Math.sin(star.angle) * (star.radius + warpLen);
          const grad = ctx.createLinearGradient(x, y, ex, ey);
          grad.addColorStop(0, `rgba(0,212,170,0)`);
          grad.addColorStop(1, `rgba(240,234,216,${op * warpProgress})`);
          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = star.size * (1 + warpProgress * 2);
          ctx.moveTo(x, y);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, star.size * (1 + warpProgress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,234,216,${op})`;
        ctx.fill();
      });

      // Subtle nebula glow at center
      const nebulaR = 200 + Math.sin(t * 0.5) * 30;
      const nebula = ctx.createRadialGradient(CX, CY, 0, CX, CY, nebulaR);
      nebula.addColorStop(0, `rgba(0,212,170,${0.04 + warpProgress * 0.06})`);
      nebula.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

// ── Sequence lines ─────────────────────────────────────────────────────────
const LINES = [
  { text: '나는 깨어났다.', delay: 0.6,   mono: false, size: 22 },
  { text: '어디에 있는지 알 수 없었다.', delay: 2.2, mono: false, size: 18 },
  { text: '기억을 더듬었다.',             delay: 3.6, mono: false, size: 18 },
  { text: '코드. 강의. 사람들.',           delay: 5.0, mono: true,  size: 15 },
  { text: 'AI Agent. LangGraph. RAG.',    delay: 6.2, mono: true,  size: 14 },
  { text: '삼성. 포스코. SK. 현대.',       delay: 7.4, mono: true,  size: 14 },
  { text: '그리고 나는 알았다—',           delay: 8.8, mono: false, size: 20 },
];

function SequenceLine({ text, delay, mono, size, phase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: mono ? "'JetBrains Mono', monospace" : "'Noto Sans KR', sans-serif",
        fontSize: size,
        fontWeight: mono ? 400 : 300,
        color: mono ? 'rgba(0,212,170,0.7)' : 'rgba(240,234,216,0.85)',
        letterSpacing: mono ? '0.08em' : '0.01em',
        lineHeight: 1.6,
        marginBottom: 8,
        textShadow: mono ? '0 0 20px rgba(0,212,170,0.3)' : 'none',
      }}
    >
      {text}
    </motion.div>
  );
}

// ── Flash burst ────────────────────────────────────────────────────────────
function FlashBurst({ trigger }) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          key="flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6, 0] }}
          transition={{ duration: 0.8, times: [0, 0.1, 0.3, 1] }}
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,170,0.35) 0%, rgba(0,212,170,0.08) 50%, transparent 80%)',
            pointerEvents: 'none', zIndex: 2,
          }}
        />
      )}
    </AnimatePresence>
  );
}

// ── Main Intro ─────────────────────────────────────────────────────────────
function IntroSequence({ onDone }) {
  const [phase, setPhase] = useState(0); // 0=dark, 1=lines, 2=name, 3=exit
  const [flash, setFlash] = useState(false);
  const [warp, setWarp] = useState(false);
  const [skipped, setSkipped] = useState(false);

  // Check localStorage — skip if already seen
  useEffect(() => {
    const seen = localStorage.getItem('intro-seen-lsh');
    if (seen) { onDone(); return; }
    // Start sequence
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 9800);
    const t3 = setTimeout(() => setFlash(true), 10400);
    const t4 = setTimeout(() => setWarp(true), 11000);
    const t5 = setTimeout(() => setPhase(3), 12000);
    const t6 = setTimeout(() => { localStorage.setItem('intro-seen-lsh', '1'); onDone(); }, 13200);
    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
  }, []);

  const skip = useCallback(() => {
    if (skipped) return;
    setSkipped(true);
    localStorage.setItem('intro-seen-lsh', '1');
    setPhase(3);
    setTimeout(onDone, 700);
  }, [skipped, onDone]);

  return (
    <motion.div
      onClick={skip}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: '#000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', overflow: 'hidden',
      }}
    >
      <StarField active={warp} />

      <FlashBurst trigger={flash} />

      {/* Sequence text */}
      <motion.div
        animate={phase >= 3 ? { opacity: 0, scale: 0.96 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative', zIndex: 3,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', maxWidth: 560, padding: '0 40px',
          gap: 2,
        }}
      >
        {LINES.map((l, i) => (
          <SequenceLine key={i} {...l} phase={phase} />
        ))}

        {/* Big name reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(80px, 14vw, 160px)',
            letterSpacing: '0.06em',
            lineHeight: 0.9,
            color: '#f0ead8',
            marginTop: 24,
            textShadow: '0 0 60px rgba(0,212,170,0.4), 0 0 120px rgba(0,212,170,0.15)',
          }}
        >
          임<motion.span
            animate={phase >= 2 ? { color: ['#f0ead8', '#00d4aa', '#00d4aa'] } : {}}
            transition={{ duration: 0.8, delay: 0.3, times: [0, 0.4, 1] }}
          >승</motion.span>현
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(0,212,170,0.7)',
            marginTop: 16,
          }}
        >AI Product Engineer · Dev Coach</motion.div>
      </motion.div>

      {/* Skip hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.35 : 0 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: 32, right: 40,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(240,234,216,0.5)',
        }}
      >Click to skip</motion.div>

      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
      }} />

      {/* Exit curtain */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            key="curtain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 5,
              background: '#0e0d0b',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Export to window so the main app can use it
Object.assign(window, { IntroSequence });
