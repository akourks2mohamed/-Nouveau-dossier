import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, BellRing, Calendar, Music, MailOpen, AlertCircle } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import FloatingParticles from './components/FloatingParticles';
import LetterEnvelope from './components/LetterEnvelope';
import ShootingStars from './components/ShootingStars';
import MessagesCarousel from './components/MessagesCarousel';

// Dynamic asset imports
import bgImgUrl from './assets/images/soft_floral_bg_1779672803924.png';
import cookieImgUrl from './assets/images/chocolate_cookie_1779672766433.png';
import roseImgUrl from './assets/images/pink_rose_flower_1779672784761.png';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Time tracking calculations
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const storyStartDate = new Date('2026-03-04T00:00:00');

  useEffect(() => {
    // Keep clock ticking in real-time
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - storyStartDate.getTime();

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / (1000 * 60)) % 60);
        const s = Math.floor((difference / 1000) % 60);

        setTimeElapsed({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handler to enter site and start music
  const handleEnterSite = () => {
    setHasEntered(true);
    setIsPlayerPlaying(true);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans select-none bg-warm-bg overflow-x-hidden text-warm-text">
      
      {/* BACKGROUND GRAPHIC ELEMENT - ALWAYS ACTIVE */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 blur-xs"
        style={{ backgroundImage: `url(${bgImgUrl})`, opacity: 0.12 }}
      ></div>

      {/* Warm Organic Glowing Orbs in the background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-[5%] w-72 h-72 bg-warm-olive rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-[5%] w-96 h-96 bg-warm-pink rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-warm-accent rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Floating particles background of real roses and cookies */}
      {hasEntered && <FloatingParticles />}
      {hasEntered && <ShootingStars />}

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* ================= INTERACTIVE GESTURE WELCOME SCREEN ================= */
          <motion.div
            key="welcome-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="z-30 w-full max-w-md px-4"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-[40px] border border-warm-border p-8 md:p-10 text-center shadow-2xl shadow-warm-border-dark/50 relative overflow-hidden">
              
              {/* Top flower watermark decorative */}
              <div className="w-16 h-16 mx-auto mb-5 relative">
                <img 
                  src={roseImgUrl} 
                  alt="Rose" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain animate-float-slow"
                />
              </div>

              <p className="text-xs uppercase tracking-[0.2em] text-warm-muted mb-1.5 font-semibold">بوابة تذكارية خاصة</p>
              <h1 className="text-2xl md:text-3xl font-serif text-espresso font-bold tracking-wide">
                أنرتِ غيماً وعطراً... ✨
              </h1>
              
              <p className="text-sm text-warm-text/90 leading-relaxed mt-4 max-w-xs mx-auto">
                مرحباً بكِ سارة... لقد قمتُ بصنع هذه الصفحة خصيصاً كهدية رمزية من أجلكِ للذكرى الطيبة والجميلة التي تجمعنا.
              </p>

              {/* Enter Button that triggers audio playback */}
              <button
                id="enter-site-btn"
                onClick={handleEnterSite}
                className="mt-8 w-full py-4 px-6 rounded-full bg-espresso hover:bg-[#4a342d] text-[#fffcf5] font-medium text-sm md:text-base tracking-widest shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-2.5 rtl:space-x-reverse"
              >
                <span>افتحي الهدية واستمعي 🎵</span>
              </button>

              <div className="mt-5 flex items-center justify-center space-x-1.5 rtl:space-x-reverse text-[10px] text-warm-muted font-mono">
                <AlertCircle className="w-3.5 h-3.5 text-warm-accent" />
                <span>تعمل الأغنية تلقائياً بنقاء صوتي متميز</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ================= MAIN DYNAMIC PAGE ================= */
          <motion.div
            key="main-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="z-20 w-full max-w-3xl px-4 py-8 md:py-16 flex flex-col items-center"
          >
            {/* 1. Header Card with real background decoration */}
            <div className="w-full bg-white/85 backdrop-blur-md rounded-[40px] border border-warm-border shadow-2xl shadow-warm-border-dark/60 p-6 md:p-12 text-center relative overflow-hidden mb-8">
              
              {/* Mini corner floral designs */}
              <div className="absolute -top-3 -right-3 w-16 h-16 opacity-75">
                <img src={roseImgUrl} alt="Rose accent" className="w-full h-full object-contain rotate-12" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-16 h-16 opacity-75">
                <img src={cookieImgUrl} alt="Cookie accent" className="w-full h-full object-contain -rotate-12" referrerPolicy="no-referrer" />
              </div>

              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-warm-accent text-xs tracking-[0.25em] font-mono mb-3 uppercase font-semibold">
                <Sparkles className="w-4 h-4 text-warm-accent animate-pulse" />
                <span>بداية حكايتنا 🤍</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-serif text-espresso font-bold mb-4 tracking-wide">
                مساحة الذكريات الدافئة لـ سارة
              </h1>
              
              <div className="w-16 h-[2px] bg-warm-accent mx-auto mb-6"></div>

              <p className="text-[#4a3a2e] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                في الرابع من مارس لعام ألفين وستة وعشرين، بدأت أجمل صفحات كتاب الأخوة النبيلة والصداقة النقية. أحتفظ بكل ثانية مرت لتكون هذه المساحة شاهداً عذباً على النقاء والوفاء.
              </p>
            </div>

            {/* 2. Live Dynamic Elapsed Counter Widget */}
            <div className="w-full bg-white/60 backdrop-blur-md border border-warm-border rounded-[32px] shadow-lg p-6 md:p-8 mb-8 text-center relative overflow-hidden">
              
              {/* Ambient visual background pattern for widget */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#281e14_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-6 relative z-10">
                <Calendar className="w-5 h-5 text-warm-accent" />
                <h4 className="text-xs md:text-sm font-semibold text-espresso font-serif tracking-wider">
                  الوقت المنصرم على بداية تواصلنا الدافئ (04 مارس 2026):
                </h4>
              </div>

              <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-xl mx-auto relative z-10">
                {/* Days card */}
                <div className="bg-[#fffcf5]/90 border border-warm-border rounded-2xl p-3 md:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                  <span className="text-2xl md:text-5xl font-mono font-bold text-espresso">
                    {timeElapsed.days}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold text-warm-muted mt-1.5">يوم</span>
                </div>

                {/* Hours card */}
                <div className="bg-[#fffcf5]/90 border border-warm-border rounded-2xl p-3 md:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                  <span className="text-2xl md:text-5xl font-mono font-bold text-espresso">
                    {String(timeElapsed.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold text-warm-muted mt-1.5">ساعة</span>
                </div>

                {/* Minutes card */}
                <div className="bg-[#fffcf5]/90 border border-warm-border rounded-2xl p-3 md:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                  <span className="text-2xl md:text-5xl font-mono font-bold text-espresso">
                    {String(timeElapsed.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold text-warm-muted mt-1.5">دقيقة</span>
                </div>

                {/* Seconds card */}
                <div className="bg-[#fffcf5]/50 border border-warm-border rounded-2xl p-3 md:p-5 shadow-inner flex flex-col items-center">
                  <span className="text-2xl md:text-5xl font-mono font-bold text-warm-accent">
                    {String(timeElapsed.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold text-warm-muted mt-1.5">ثانية</span>
                </div>
              </div>

              <p className="text-[10px] font-mono text-warm-muted mt-4 tracking-wider relative z-10">
                يقترب العداد باستمرار محتسباً كل دقيقة تجمعنا بكل رقة وجمال ⏱️
              </p>
            </div>

            {/* 3. Central Interactive Action Area */}
            <div className="my-8 text-center z-20 flex flex-col items-center relative">
              <span className="absolute -top-10 animate-bounce text-warm-accent hover:text-espresso font-semibold text-base">❦</span>

              <button
                id="open-private-letter-btn"
                onClick={() => setIsLetterOpen(true)}
                className="group relative px-10 py-5 md:px-14 md:py-6 bg-espresso hover:bg-[#4a342d] text-[#fffcf5] rounded-full shadow-xl shadow-warm-border-dark font-serif text-base md:text-lg font-medium transition-all duration-300 hover:scale-[1.03] active:scale-98 flex items-center space-x-3.5 rtl:space-x-reverse cursor-pointer border border-[#8b4513]/15"
              >
                <div className="absolute inset-0 w-full h-full rounded-full bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <MailOpen className="w-5 h-5 md:w-6 md:h-6 text-warm-accent" />
                <span className="tracking-wide">افتحي الأبيات والرسالة الخاصة لسارة ✨</span>
              </button>

              <p className="text-xs text-warm-muted mt-4 max-w-xs leading-relaxed font-serif italic">
                احظي بالسكينة والدفء واقرئي ما يخطه الوفاء من عذب الكلمات
              </p>
            </div>

            {/* 4. Beautiful Polaroid Picture Collage with real-looking flower and cookie images */}
            <div className="mt-8 z-10 max-w-sm w-full bg-[#fffdfb] border border-warm-border shadow-xl p-4 pb-6 rounded-[24px] rotate-2 transform hover:rotate-0 hover:scale-103 transition-all duration-500 cursor-default">
              <div className="relative bg-[#fffcf5] h-64 w-full overflow-hidden flex items-center justify-center border border-warm-border rounded-xl">
                
                {/* Visual collage of real assets */}
                <div className="absolute -top-2 -left-3 w-32 h-32 opacity-90 rotate-12">
                  <img src={roseImgUrl} alt="Rose asset" referrerPolicy="no-referrer" className="w-full h-full object-contain filter drop-shadow-md animate-float-slow" />
                </div>
                
                <div className="absolute -bottom-4 -right-2 w-28 h-28 opacity-90 -rotate-12">
                  <img src={cookieImgUrl} alt="Cookie asset" referrerPolicy="no-referrer" className="w-full h-full object-contain filter drop-shadow-md animate-float-medium" />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-warm-pink/80 opacity-60 animate-pulse">
                  <Heart className="w-full h-full fill-warm-pink/20 text-warm-accent" />
                </div>

                {/* High class quote watermark inside the picture frame */}
                <div className="self-end pb-4 px-2 text-center pointer-events-none z-10 w-full">
                  <p className="text-[10px] md:text-xs font-serif text-[#4a3a2e] bg-white/80 backdrop-blur-xs py-1.5 px-3 rounded-full inline-block font-semibold">
                    ورود وكوكيز حقيقية لقلبكِ الدافئ 🌸🍪
                  </p>
                </div>
              </div>

              <div className="text-center mt-4">
                <span className="text-xs md:text-sm text-espresso font-serif font-semibold block">
                  ألبوم الذكريات المشتركة 🐚
                </span>
                <span className="text-[10px] tracking-widest text-[#8b7e74] font-mono mt-1 block">
                  Sara's Album • Spring 2026
                </span>
              </div>
            </div>

            {/* ROTATING MESSAGES CAROUSEL */}
            <MessagesCarousel />

            {/* MUSIC PLAYER CONTROLLER */}
            <MusicPlayer 
              isPlaying={isPlayerPlaying} 
              onPlayerReadyState={setIsPlayerReady}
              playlistId="Od6LJhVvNOI"
            />

            {/* MAIN POETRY ENVELOPE MODAL */}
            <LetterEnvelope 
              isOpen={isLetterOpen} 
              onClose={() => setIsLetterOpen(false)} 
            />

          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative tiny footer */}
      <div className="fixed bottom-4 right-4 text-[10px] text-warm-accent font-mono tracking-widest z-30 select-none hidden md:block">
        مهدى بحب وأخوة لسارة • 2026
      </div>

    </div>
  );
}
