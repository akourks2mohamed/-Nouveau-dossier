import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Quote } from 'lucide-react';

const messages = [
  { text: 'الصداقة الحقيقية هي روح واحدة في جسدين', author: 'أرسطو' },
  { text: 'الصديق هو من يعرف أغنية قلبك ويغنيها لك عندما تنسى كلماتها', author: 'غير معروف' },
  { text: 'ليس مهماً أن تعرف شخصاً ما، المهم أن تعرف من يستحق أن يكون صديقاً', author: 'مثل صيني' },
  { text: 'الصديق الحقيقي هو الذي يمشي إليك عندما يبتعد باقي العالم عنك', author: 'والتر وينشل' },
  { text: 'في جنة الصداقة، لا تذبل الأزهار أبداً', author: 'مي زيادة' },
  { text: 'خير الأصدقاء من إذا رأوك ذكرّوك بالله', author: 'حديث شريف' },
  { text: 'الصداقة ليست بطول السنين، بل بصدق المواقف', author: 'حكمة عربية' },
  { text: 'الأصدقاء هم العائلة التي نختارها بأنفسنا', author: 'إدنا بوكانان' },
  { text: 'ربما لا أقولها دائماً، لكن وجودك في حياتي يجعل كل شيء أفضل', author: 'هدية لسارة' },
  { text: 'بعض الأصدقاء كنجوم الليل، لا تراهم في النهار، لكنهم موجودون دائماً', author: 'حكمة' },
];

export default function MessagesCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = messages[index];

  return (
    <div className="w-full max-w-lg mx-auto my-8">
      <div className="bg-white/70 backdrop-blur-md border border-amber-100/60 rounded-[32px] shadow-lg p-6 md:p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#854d0e_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-4">
          <Quote className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-mono text-amber-700 tracking-wider font-semibold">كلمات عن الصداقة</span>
          <Quote className="w-4 h-4 text-amber-500" />
        </div>

        <div className="relative h-24 md:h-20 flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full px-4"
            >
              <p className="text-sm md:text-base text-stone-700 leading-relaxed font-serif italic">
                "{current.text}"
              </p>
              <p className="text-[10px] md:text-xs text-amber-600 mt-2 font-mono">
                — {current.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mt-4">
          {messages.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? 'bg-amber-500 w-4' : 'bg-amber-200 hover:bg-amber-300'
              }`}
              aria-label={`الرسالة ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center space-x-1.5 rtl:space-x-reverse">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          <span className="text-[10px] text-stone-400 font-mono">هدية من القلب لسارة</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
        </div>
      </div>
    </div>
  );
}
