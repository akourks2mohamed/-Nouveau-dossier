import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, X, Sparkles, BookOpen } from 'lucide-react';

interface LetterEnvelopeProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LetterEnvelope({ isOpen, onClose }: LetterEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);

  // Poetic Arabic verses provided by the user
  const verses = [
    "وَهَيْلٌ مِنْ سَوَادِ الشَّعْرِ يَغْفُو",
    "عَلَى كَتِفَيْكِ مِفْتَاحاً لِصَمْتِي",
    "إِذَا مَا صَوْتُكِ الهَادِئُ تَهَادَى",
    "شَفَا القَلْبَ القَلْبُ لِلقَلِيلِ مِنَ التَّمَنِّي",
    "رَقِيقَةُ القَلْبِ خَطْوٌ فِيكِ الهَمْسُ طَيِّبٌ",
    "وَ نُورُكِ دُونَ إِفْرَاطٍ فَتَنَنِي",
    "طَيْفُكِ فِي السَّمَاءِ يُحَلِّقُ",
    "أَعُدُّ فِي غَيْبَتِكِ الثَّوَانِي وَقْتًا",
    "وَ صَدَاكِ فِي الأَعْمَاقِ يَزْدَهِي",
    "مَا كُنْتُ أَحْلُمُ أَنَّ لِلأَسْمَاءِ سِحْراً",
    "حَتَّى سَمِعْتُكِ فَالحُرُوفُ نُجُومٌ",
    "يَكْفِينِي أَنِّي أَرَاكِ فَأَغْتَنِي"
  ];

  const subQuote = "أَتَعْجَبِينَ بِمُغْرَمٍ هَامَ بِكُمْ أَمْ حُبُّنَا لَمَّا يُصَرّ وَيُوعَدَا؟";

  // When clicking the wax seal to start the sequence
  const handleOpenEnvelope = () => {
    setIsOpened(true);
  };

  const resetEnvelope = () => {
    setIsOpened(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/45 backdrop-blur-md overflow-y-auto">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* SECTION 1: UNOPENED ENVELOPE */
          <motion.div
            key="closed-envelope"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -40 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-lg md:max-w-xl mx-auto cursor-pointer"
            onClick={handleOpenEnvelope}
          >
            {/* Envelope Exterior Layer */}
            <div className="bg-[#f0e6d6] border border-amber-800/20 rounded-2xl shadow-[0_20px_50px_rgba(139,92,26,0.25)] p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center">
              {/* Outer Golden Border frame */}
              <div className="absolute inset-4 border border-amber-700/10 rounded-xl pointer-events-none"></div>
              
              <Mail className="w-14 h-14 text-amber-700/60 mb-4 animate-bounce" />
              
              <h3 className="text-xl md:text-2xl font-serif text-amber-900 tracking-wide font-medium">
                إلى العزيزة سارة
              </h3>
              <p className="text-stone-500 text-xs md:text-sm mt-2 max-w-xs leading-relaxed">
                رسالة تذكارية مفعمة بأهدأ المشاعر الطيبة وصدق الكلمات... اضغطي على الختم لفتحها
              </p>

              {/* Dynamic Golden Wax Seal */}
              <div className="mt-8 relative flex items-center justify-center">
                {/* Pulsing glow ring */}
                <span className="absolute inline-flex h-20 w-20 rounded-full bg-red-600/10 animate-ping"></span>
                
                {/* Physical wax seal look */}
                <button
                  id="open-wax-seal-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEnvelope();
                  }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-amber-700 shadow-[0_4px_15px_rgba(185,28,28,0.4)] border border-red-500 flex items-center justify-center text-amber-100 transition-transform duration-300 hover:scale-115 active:scale-95 cursor-pointer relative z-10"
                >
                  <Heart className="w-8 h-8 fill-amber-100 text-transparent" />
                </button>
              </div>

              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 mt-6 block">
                مفتاح الذكريات والصداقة ✨
              </span>
            </div>
          </motion.div>
        ) : (
          /* SECTION 2: OPENED FULL SCREEN LETTER SHEET */
          <motion.div
            key="opened-parchment"
            initial={{ scale: 0.9, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, delay: 0.1 }}
            className="relative w-full max-w-2xl bg-[#faf5ec] border border-amber-900/10 rounded-3xl shadow-[0_25px_60px_rgba(40,30,20,0.3)] my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Top vintage headers and closes */}
            <div className="sticky top-0 bg-[#faf5ec]/90 backdrop-blur-md px-6 py-4 border-b border-amber-900/5 flex items-center justify-between z-10">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-900 font-serif">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-semibold">باقة أحرف من الروح</span>
              </div>
              <button
                id="close-letter-sheet-btn"
                onClick={resetEnvelope}
                className="p-2 rounded-full hover:bg-stone-200/50 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                title="إغلاق الرسالة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Parchment Body */}
            <div className="p-6 md:p-12 text-center relative selection:bg-amber-100">
              {/* Subtle background flowery decoration watermark */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none bg-[radial-gradient(#854d0e_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse text-amber-600 mb-1">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">رسالة خاصة وأخوية</span>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-amber-950 font-bold mb-3">
                  صديقتي الغالية سارة،
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent mx-auto"></div>
                
                <p className="text-xs md:text-sm text-amber-900/70 max-w-md mx-auto leading-relaxed mt-4">
                  لكل إنسان في هذه الحياة من يؤنس دربه، ويمنفح صمته صوتاً جميلاً دافئاً كعذوبة النوايا الرقيقة. أهدي إليكِ هذه الأبيات بمشاعر الأخوة الطاهرة والوفاء العميق لأثمن الذكريات:
                </p>
              </motion.div>

              {/* Classical Poetry Columns */}
              <div className="space-y-4 md:space-y-6 max-w-lg mx-auto mb-10 text-stone-900 font-serif text-base sm:text-lg md:text-xl leading-relaxed">
                {verses.map((verse, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.12 }}
                    className="py-1 px-4 rounded-xl hover:bg-amber-500/5 transition-colors group cursor-default"
                  >
                    <span className="inline-block relative text-amber-950 group-hover:text-amber-800 transition-colors">
                      {verse}
                      {/* Subtle accent dot on hover */}
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </span>
                  </motion.p>
                ))}
              </div>

              {/* Elegant Ending Line Quote (User specified) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 + verses.length * 0.12 }}
                className="mt-10 p-5 md:p-6 rounded-2xl bg-amber-500/[0.03] border border-amber-950/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/10 rounded-bl-full flex items-center justify-center text-amber-800">✨</div>
                <p className="font-serif text-amber-950 text-base md:text-lg italic font-semibold leading-relaxed">
                  {subQuote}
                </p>
              </motion.div>

              {/* Decorative graphic signatures */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 2.2 }}
                className="mt-8 text-xs text-amber-800/40 font-mono tracking-widest flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <span>صداقتنا الحقيقية</span>
                <span className="text-red-400">♥</span>
                <span>ربيع 2026</span>
              </motion.div>

              {/* Button to close and return to the main dashboard */}
              <motion.button
                id="close-letter-bottom-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                onClick={resetEnvelope}
                className="mt-8 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-[#fffdfa] shadow-md text-xs sm:text-sm transition-all duration-300 transform hover:scale-102 cursor-pointer"
              >
                العودة لصفحة التذكار 🌸
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
