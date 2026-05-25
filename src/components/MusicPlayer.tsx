import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

interface MusicPlayerProps {
  isPlaying: boolean;
  onPlayerReadyState: (ready: boolean) => void;
  playlistId: string; // Od6LJhVvNOI
}

export default function MusicPlayer({ isPlaying, onPlayerReadyState, playlistId }: MusicPlayerProps) {
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70); // starts comforting
  const [actuallyPlaying, setActuallyPlaying] = useState(false);
  const containerId = "youtube-hidden-player";

  useEffect(() => {
    // 1. Load YouTube IFrame API script
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // 2. Define callback for when script is loaded
    const initPlayer = () => {
      try {
        const newPlayer = new window.YT.Player(containerId, {
          height: '0',
          width: '0',
          videoId: playlistId,
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: playlistId,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
              event.target.setVolume(volume);
              onPlayerReadyState(true);
              
              // If initialized after interaction, start playing immediately
              if (isPlaying) {
                event.target.playVideo();
                setActuallyPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              // YT.PlayerState.PLAYING resolves to 1
              if (event.data === 1) {
                setActuallyPlaying(true);
              } else {
                setActuallyPlaying(false);
              }
            }
          }
        });
      } catch (err) {
        console.error("Error creating YT Player", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      // Clean up callback if any
      if (window.onYouTubeIframeAPIReady === initPlayer) {
        window.onYouTubeIframeAPIReady = undefined;
      }
    };
  }, [playlistId]);

  // Synchronize playing state with host interactions and auto-unlock playback on first gesture
  useEffect(() => {
    if (!player) return;

    const tryPlay = () => {
      if (isPlaying) {
        try {
          player.playVideo();
          setActuallyPlaying(true);
        } catch (e) {
          console.warn("Auto-play failed", e);
        }
      }
    };

    // Initial attempt
    tryPlay();

    // Browser policy bypass: listen to first click or touch on the document to trigger audio
    const handleGlobalInteraction = () => {
      tryPlay();
      // Remove listeners once activated
      document.removeEventListener('click', handleGlobalInteraction);
      document.removeEventListener('touchstart', handleGlobalInteraction);
      document.removeEventListener('scroll', handleGlobalInteraction);
    };

    document.addEventListener('click', handleGlobalInteraction);
    document.addEventListener('touchstart', handleGlobalInteraction);
    document.addEventListener('scroll', handleGlobalInteraction);

    return () => {
      document.removeEventListener('click', handleGlobalInteraction);
      document.removeEventListener('touchstart', handleGlobalInteraction);
      document.removeEventListener('scroll', handleGlobalInteraction);
    };
  }, [isPlaying, player]);

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
      {/* Invisible YouTube Player placeholder required by API */}
      <div id={containerId} className="hidden absolute w-0 h-0 overflow-hidden pointer-events-none"></div>

      {/* Styled Physical Music Widget Panel */}
      <div className="bg-white/80 backdrop-blur-md border border-amber-100/60 shadow-[0_10px_30px_-5px_rgba(139,92,26,0.12)] rounded-3xl p-3 md:p-4 flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse max-w-[290px] md:max-w-[340px] transition-all duration-500 hover:shadow-[0_12px_35px_-4px_rgba(139,92,26,0.18)]">
        
        {/* Decorative Spinning Disc Vinyl look */}
        <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
          <div className={`w-full h-full rounded-full bg-stone-900 border-2 border-stone-800 shadow-md flex items-center justify-center relative overflow-hidden transition-transform ${actuallyPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
            {/* Center golden sticker */}
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-100 border-4 border-amber-600/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-900"></div>
            </div>
            {/* Vinyl record grooves */}
            <div className="absolute inset-2 border border-stone-800/40 rounded-full"></div>
            <div className="absolute inset-4 border border-stone-800/20 rounded-full"></div>
          </div>
          {/* Note visualizer spikes when playing */}
          {actuallyPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          )}
        </div>

        {/* Content & Action details */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] md:text-xs font-mono text-amber-800 tracking-wider">على أنغام الموسيقى 🎵</p>
          <p className="text-xs md:text-sm font-semibold text-stone-800 truncate">أهواك - عبد الحليم حافظ</p>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1.5">
            {/* Play Button */}
            <button
              id="music-play-pause-btn"
              onClick={handlePlayPause}
              className="p-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer"
              title={actuallyPlaying ? "إيقاف مؤقت" : "تشغيل الموسيقى"}
            >
              {actuallyPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>

            {/* Restart Button */}
            <button
              id="music-restart-btn"
              onClick={handleRestart}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              title="إعادة الأغنية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Mute Button */}
            <button
              id="music-mute-btn"
              onClick={handleMuteToggle}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              title={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Slim Volume Slider */}
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
