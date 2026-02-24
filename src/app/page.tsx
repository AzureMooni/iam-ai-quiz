"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Share2, Sparkles } from "lucide-react";

const questions = [
  {
    id: 1,
    text: "상사가 급하게 '업계 트렌드 분석 보고서' 초안을 짜오라고 한다면?",
    options: [
      { text: "한숨을 쉬며 빈 워드 파일을 켜고 구글링을 시작한다.", score: 0 },
      { text: "챗GPT나 클로드를 켜고 프롬프트부터 입력한다.", score: 10 },
    ],
  },
  {
    id: 2,
    text: "해외 커뮤니티에서 난리 난 '영어로 된 최신 AI 툴'을 발견했다면?",
    options: [
      { text: "영어가 너무 많네... 복잡해서 조용히 뒤로 가기를 누른다.", score: 0 },
      { text: "어떻게든 번역기를 돌려서라도 내 업무에 적용해 본다.", score: 10 },
    ],
  },
  {
    id: 3,
    text: "당신의 하루 업무 중 '단순 반복 작업(복붙, 엑셀 정리)'의 비중은?",
    options: [
      { text: "솔직히 절반 이상이다. 퇴근하고 싶다.", score: 0 },
      { text: "이미 AI 자동화 툴로 대부분 없애버렸다.", score: 10 },
    ],
  }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-3: Questions, 4: Result
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleAnswer = (points: number) => {
    setScore(prev => prev + points);
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(4);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "I AM AI - 직장 생존 계급 테스트",
          text: "나의 직장 생존 계급은? 충격적인 팩폭 결과를 확인하세요.",
          url: "https://iam-ai.kr",
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText("https://iam-ai.kr");
        setToastMessage("링크 복사완료!");
        setTimeout(() => setToastMessage(null), 2500);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  const currentQuestionIndex = currentStep > 0 && currentStep <= 3 ? currentStep - 1 : 0;
  const currentQuestion = questions[currentQuestionIndex];

  // Result Setup
  let resultEmoji = "";
  let resultTitle = "";
  let dangerGaugeText = "";
  let dangerGaugePercent = 0;
  let hashtags = "";
  let resultBody = "";
  let resultColorClass = "";
  let borderClass = "";
  let gaugeColorClass = "";

  if (score <= 10) {
    resultEmoji = "🗿";
    resultTitle = "엑셀 깎는 노인";
    dangerGaugeText = "도태 위험도 99%";
    dangerGaugePercent = 99;
    hashtags = "#Ctrl_C_V_장인 #수동야근 #노안의주범";
    resultBody = "동기들이 AI 비서 시켜서 30분 만에 끝낼 일, 3시간째 눈알 빠지게 엑셀 셀 병합하고 계시네요. 'AI 그거 다 한때야'라며 외면하지만, 사실 조금 쫄려하고 있습니다.";
    resultColorClass = "text-[#ff3366] neon-text-red drop-shadow-[0_0_8px_rgba(255,51,102,0.8)]";
    borderClass = "border-[#ff3366]/40";
    gaugeColorClass = "bg-[#ff3366]";
  } else if (score === 20) {
    resultEmoji = "🦜";
    resultTitle = "어설픈 챗GPT 앵무새";
    dangerGaugeText = "도태 위험도 50%";
    dangerGaugePercent = 50;
    hashtags = "#프롬프트가뭐죠 #남들쓰니까씀 #복붙원툴";
    resultBody = "유행어처럼 AI를 입에 달고 살지만, 정작 쓰는 건 '이거 요약해 줘'가 전부입니다. 엄청난 무기를 손에 쥐고도 망치질만 하고 있네요. 당신의 잠재력을 터뜨릴 1%의 디테일이 부족합니다.";
    resultColorClass = "text-[#ffcc00] neon-text-yellow drop-shadow-[0_0_8px_rgba(255,204,0,0.8)]";
    borderClass = "border-[#ffcc00]/40";
    gaugeColorClass = "bg-[#ffcc00]";
  } else {
    resultEmoji = "👑";
    resultTitle = "생태계 파괴자";
    dangerGaugeText = "도태 위험도 1% 미만";
    dangerGaugePercent = 1;
    hashtags = "#AI조련사 #광속퇴근 #숨은실력자";
    resultBody = "이미 부서 내에서 '쟤는 일 언제 다 했어?'라는 소리를 듣는 1%의 에이스입니다. 하지만 기술은 매일 발전합니다. 여기서 만족하면 언제든 뒤처질 수 있습니다.";
    resultColorClass = "text-[#00f0ff] neon-text-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]";
    borderClass = "border-[#00f0ff]/40";
    gaugeColorClass = "bg-[#00f0ff]";
  }

  // Right to Left Slide Animation
  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative">

      {/* Dynamic Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#00f0ff]/20 backdrop-blur-md border border-[#00f0ff]/50 px-6 py-3 rounded-full text-white font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* STAGE 1: INTRO */}
        {currentStep === 0 && !isLoading && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center max-w-md w-full glass-panel p-8 sm:p-10 rounded-[2rem]"
          >
            <div className="mb-6 h-20 w-20 bg-black/40 rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.15)]">
              <BrainCircuit className="w-10 h-10 text-[#00f0ff]" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black mb-4 tracking-tighter text-neon-cyan">
              I AM AI 🤖
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">
              나의 직장 생존 계급 테스트
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-10 leading-relaxed font-medium break-keep px-2">
              당신은 AI를 지배하는 포식자인가,<br />대체될 원시인인가?<br />
              <span className="inline-block mt-2">10초 만에 확인하세요.</span>
            </p>
            <button
              onClick={handleStart}
              className="btn-neon-primary animate-pulse-cyan w-full py-5 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-xl hover:scale-105 active:scale-95"
            >
              테스트 시작하기 (Start) →
            </button>
          </motion.div>
        )}

        {/* STAGE 2: QUIZ QUESTIONS */}
        {currentStep > 0 && currentStep <= 3 && !isLoading && (
          <motion.div
            key={`question-${currentStep}`}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col items-center justify-center max-w-md w-full"
          >
            <div className="w-full bg-white/5 h-2 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00f0ff] to-[#b026ff]"
                initial={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="glass-panel p-8 rounded-[2rem] w-full">
              <span className="text-[#00f0ff] font-bold text-sm mb-4 block tracking-widest uppercase">
                Question 0{currentStep}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-8 leading-snug tracking-tight text-white drop-shadow-md">
                {currentQuestion.text}
              </h2>

              <div className="flex flex-col gap-4">
                {currentQuestion.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(opt.score)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00f0ff]/50 transition-all shadow-lg group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex-shrink-0 bg-black/40 border border-white/20 flex items-center justify-center text-gray-400 group-hover:text-[#00f0ff] group-hover:border-[#00f0ff] font-black transition-colors">
                        {idx === 0 ? "A" : "B"}
                      </div>
                      <span className="text-gray-200 font-bold text-base leading-relaxed tracking-wide group-hover:text-white transition-colors">
                        {opt.text}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* LOADING STATE */}
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center text-center max-w-sm w-full glass-panel p-10 rounded-[2rem]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8 p-6 rounded-full bg-[#00f0ff]/10 border-2 border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <BrainCircuit className="w-16 h-16 text-[#00f0ff]" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl font-black animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              당신의 AI DNA를<br />분석 중입니다... 🧬
            </h2>
          </motion.div>
        )}

        {/* STAGE 3 & 4: RESULT & CTA */}
        {currentStep === 4 && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex flex-col items-center justify-center max-w-sm w-full"
          >
            {/* The Result Card (Digital ID Card) */}
            <motion.div
              whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
              className={`glass-panel w-full rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center mb-8 relative overflow-hidden border-2 ${borderClass} shadow-2xl backdrop-blur-xl`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Header ID */}
              <div className="absolute top-0 left-0 w-full bg-black/40 py-2 border-b border-white/10 flex justify-center items-center gap-2">
                <Sparkles className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase">I AM AI - 직장 생존 신분증</span>
              </div>

              {/* Avatar Emoji */}
              <div className="mt-10 mb-4 text-[5rem] leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {resultEmoji}
              </div>

              {/* Title / Tier */}
              <h1 className={`text-2xl sm:text-3xl font-black mb-6 leading-tight tracking-tight ${resultColorClass}`}>
                {resultTitle}
              </h1>

              {/* Danger Gauge */}
              <div className="w-full bg-black/50 p-4 rounded-2xl border border-white/5 mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-gray-300 font-bold text-sm">{dangerGaugeText}</span>
                  <span className="text-xs text-gray-500 font-mono">{dangerGaugePercent}%</span>
                </div>
                <div className="w-full bg-gray-800/80 h-3 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dangerGaugePercent}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className={`h-full ${gaugeColorClass} shadow-[0_0_10px_currentColor]`}
                  />
                </div>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {hashtags.split(" ").map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Fact-Bomb */}
              <div className="w-full relative">
                <div className="absolute -top-3 left-4 bg-[#1a1a1a] px-2 text-[10px] font-black tracking-widest text-red-500 uppercase border border-red-500/30 rounded-full">
                  팩폭 Report
                </div>
                <div className="bg-black/40 pt-5 pb-4 px-4 rounded-2xl border border-white/10 w-full text-left">
                  <p className="text-gray-200 font-medium leading-relaxed text-sm sm:text-[15px] whitespace-pre-line">
                    &quot;{resultBody}&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stage 4: Conversion CTA */}
            <div className="w-full space-y-4">
              <a
                href="https://piktai.com/ko"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon-primary animate-pulse-cyan w-full text-center py-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:gap-2 text-white font-black text-lg transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_rgba(0,240,255,0.4)] border border-[#00f0ff]/50 bg-[#00f0ff]/10"
              >
                <span className="flex items-center gap-2">
                  🔒 나를 구원할 비밀 AI 무기 확인하기
                </span>
              </a>

              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-gray-300 font-bold transition-all active:scale-[0.98]"
              >
                <Share2 className="w-5 h-5" />
                📸 내 팩폭 결과 공유하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
