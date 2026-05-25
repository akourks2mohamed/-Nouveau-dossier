import { useEffect, useRef, useState, ChangeEvent, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Disc3 } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

interface MusicPlayerProps {
  isPlaying: boolean;
  onPlayerReadyState: (ready: boolean) => void;
  playlistId: string;
}

export default function MusicPlayer({ isPlaying, onPlayerReadyState, playlistId }: MusicPlayerProps) {
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [actuallyPlaying, setActuallyPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const playerReadyRef = useRef(false);
  const containerId = "youtube-hidden-player";

  // Load YouTube IFrame API in the <head> for reliability
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }
    if (window.onYouTubeIframeAPIReady) return;

    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true);
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onerror = () => setError(true);
      document.head.appendChild(tag);
    }

    return () => {
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = undefined;
      }
    };
  }, []);

  // Initialize player when API is ready and container exists
  useEffect(() => {
    if (!apiReady) return;

    const el = document.getElementById(containerId);
    if (!el) return;

    try {
      const newPlayer = new window.YT.Player(containerId, {
        height: '0',
        width: '0',
        videoId: playlistId,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: playlistId,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume);
            playerReadyRef.current = true;
            setPlayer(event.target);
            onPlayerReadyState(true);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setActuallyPlaying(true);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setActuallyPlaying(false);
            } else {
              setActuallyPlaying(false);
            }
          },
          onError: () => setError(true),
        },
      });
      return () => {
        if (newPlayer && newPlayer.destroy) {
          newPlayer.destroy();
        }
      };
    } catch {
      setError(true);
    }
  }, [apiReady]);

  const tryPlay = useCallback(() => {
    if (!player || !playerReadyRef.current) return;
    try {
      player.playVideo();
      setActuallyPlaying(true);
    } catch {
      // Browser may block autoplay
    }
  }, [player]);

  // Play when parent triggers isPlaying
  useEffect(() => {
    if (!isPlaying || !player) return;
    tryPlay();
  }, [isPlaying, player, tryPlay]);

  // Fallback: listen to any user gesture to unlock audio
  useEffect(() => {
    const unlock = () => {
      if (!player || actuallyPlaying) return;
      tryPlay();
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
    };
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
    return () => {
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
    };
  }, [player, actuallyPlaying, tryPlay]);

  const handlePlayPause = () => {
    if (!player) return;
    if (actuallyPlaying) {
      player.pauseVideo();
      setActuallyPlaying(false);
    } else {
      player.playVideo();
      setActuallyPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (player) {
      player.setVolume(val);
      if (val > 0 && isMuted) {
        player.unMute();
        setIsMuted(false);
      }
    }
  };

  const handleRestart = () => {
    if (!player) return;
    player.seekTo(0);
    player.playVideo();
    setActuallyPlaying(true);
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40">
      {/* YouTube player container - must be visible in DOM, not display:none */}
      <div
        id={containerId}
        className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      ></div>

      <div className="bg-white/80 backdrop-blur-md border border-amber-100/60 shadow-[0_10px_30px_-5px_rgba(139,92,26,0.12)] rounded-3xl p-3 md:p-4 flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse max-w-[290px] md:max-w-[340px] transition-all duration-500 hover:shadow-[0_12px_35px_-4px_rgba(139,92,26,0.18)]">

        <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
          <div className={`w-full h-full rounded-full bg-stone-900 border-2 border-stone-800 shadow-md flex items-center justify-center relative overflow-hidden transition-transform ${actuallyPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-100 border-4 border-amber-600/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-900"></div>
            </div>
            <div className="absolute inset-2 border border-stone-800/40 rounded-full"></div>
            <div className="absolute inset-4 border border-stone-800/20 rounded-full"></div>
          </div>
          {actuallyPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {error ? (
            <p className="text-[10px] md:text-xs font-mono text-rose-600 tracking-wider">تعذر تشغيل الموسيقى</p>
          ) : (
            <p className="text-[10px] md:text-xs font-mono text-amber-800 tracking-wider">على أنغام الموسيقى 🎵</p>
          )}
          <p className="text-xs md:text-sm font-semibold text-stone-800 truncate">أهواك - عبد الحليم حافظ</p>

          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1.5">
            <button
              id="music-play-pause-btn"
              onClick={handlePlayPause}
              className="p-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer disabled:opacity-50"
              title={actuallyPlaying ? "إيقاف مؤقت" : "تشغيل الموسيقى"}
              disabled={!player}
            >
              {actuallyPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>

            <button
              id="music-restart-btn"
              onClick={handleRestart}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer disabled:opacity-50"
              title="إعادة الأغنية"
              disabled={!player}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              id="music-mute-btn"
              onClick={handleMuteToggle}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer disabled:opacity-50"
              title={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}
              disabled={!player}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <input
              id="music-volume-slider"
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 md:w-20 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
