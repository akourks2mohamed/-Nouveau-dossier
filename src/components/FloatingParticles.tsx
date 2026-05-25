import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import cookieImgUrl from '../assets/images/chocolate_cookie_1779672766433.png';
import roseImgUrl from '../assets/images/pink_rose_flower_1779672784761.png';

interface Particle {
  id: number;
  type: 'rose' | 'cookie' | 'heart';
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDist: number;
  rotation: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate scattered falling items with varying starting positions, delays and sizes
    const list: Particle[] = [];
    const types: ('rose' | 'cookie' | 'heart')[] = ['rose', 'cookie', 'heart', 'rose', 'cookie'];
    
    // We create 22 particles to keep performance absolutely pristine on all smartphones
    for (let i = 0; i < 22; i++) {
      list.push({
        id: i,
        type: types[i % types.length],
        left: Math.random() * 100, // percentage horizontal placement
        size: Math.random() * 24 + 20, // 20px to 44px
        duration: Math.random() * 12 + 10, // 10s to 22s for smooth drift
        delay: Math.random() * -18, // negative delay so they spawn dispersed immediately
        swayDist: Math.random() * 40 + 20, // horizontal drift amount
        rotation: Math.random() * 360,
      });
    }
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
      <AnimatePresence>
        {particles.map((p) => {
          let assetUrl = '';
          if (p.type === 'cookie') {
            assetUrl = cookieImgUrl;
          } else if (p.type === 'rose') {
            assetUrl = roseImgUrl;
          }

          return (
            <motion.div
              key={p.id}
              initial={{ y: '-10vh', opacity: 0, rotate: p.rotation }}
              animate={{
                y: '110vh',
                opacity: [0, 0.9, 0.9, 0],
                rotate: p.rotation + 360,
                x: [0, p.swayDist, -p.swayDist, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            >
              {p.type === 'heart' ? (
                // Beautiful glowing vector heart
                <svg
                  className="w-full h-full text-rose-400 drop-shadow-[0_2px_8px_rgba(244,63,94,0.3)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                // Real photorealistic image assets with standard security tags
                <img
                  src={assetUrl}
                  alt={p.type}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.08)] rounded-full"
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
