import { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  angle: number;
  duration: number;
  delay: number;
}

export default function ShootingStars() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  );

  const [shootingStars] = useState<ShootingStar[]>(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: Math.random() * 40,
      left: Math.random() * 100,
      angle: Math.random() * 30 + 20,
      duration: Math.random() * 2 + 1.5,
      delay: i * 5 + Math.random() * 3,
    }))
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255,255,255,0.1)`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animation: `shoot ${s.duration}s linear ${s.delay}s infinite`,
          }}
        >
          <div
            className="h-0.5 rounded-full bg-gradient-to-l from-transparent via-white to-white"
            style={{
              width: '100px',
              transform: `rotate(-${s.angle}deg)`,
              transformOrigin: 'right center',
              boxShadow: '0 0 6px 2px rgba(255,255,255,0.4)',
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes shoot {
          0% { transform: translate(0, 0); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translate(-300px, 300px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
