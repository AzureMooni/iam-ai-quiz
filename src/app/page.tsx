"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Share2, Sparkles, ExternalLink } from "lucide-react";

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
    try {
      await navigator.clipboard.writeText("https://iam-ai.kr");
      setToastMessage("링크 복사완료!");
      setTimeout(() => setToastMessage(null), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const currentQuestionIndex = currentStep > 0 && currentStep <= 3 ? currentStep - 1 : 0;
  const currentQuestion = questions[currentQuestionIndex];

  // Result Setup
  let resultTitle = "";
  let resultBody = "";
  let resultColorClass = "";
  let iconBgClass = "";

  if (score <= 10) {
    resultTitle = "🚨 삐빅- 당신은 [구석기시대 엑셀 원시인]입니다.";
    resultBody = "동기들은 AI 치트키 쓰고 3시간 일찍 퇴근하는데, 혼자 돌도끼를 들고 계시네요. 당장 생존 무기 장착이 시급합니다!";
    resultColorClass = "text-[#ff3366] neon-text-red drop-shadow-[0_0_8px_rgba(255,51,102,0.8)]";
    iconBgClass = "border-[#ff3366] text-[#ff3366] shadow-[0_0_15px_rgba(255,51,102,0.5)]";
  } else if (score === 20) {
    resultTitle = "🦜 당신은 [어설픈 챗GPT 앵무새]입니다.";
    resultBody = "남들이 좋다는 건 대충 써봤지만, 내 직무에 200% 활용은 못 하고 있습니다. 진짜 날카로운 무기를 찾을 때입니다.";
    resultColorClass = "text-[#ffcc00] neon-text-yellow drop-shadow-[0_0_8px_rgba(255,204,0,0.8)]";
    iconBgClass = "border-[#ffcc00] text-[#ffcc00] shadow-[0_0_15px_rgba(255,204,0,0.5)]";
  } else {
    resultTitle = "👑 당신은 [AI 생태계의 최상위 포식자]입니다.";
    resultBody = "이미 상위 1%의 생산성을 가지셨군요. 하지만 방심은 금물, 더 압도적인 격차를 벌릴 무기를 쥐어드릴게요.";
    resultColorClass = "text-[#00f0ff] text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]";
    iconBgClass = "border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.5)]";
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
            <p className="text-gray-300 text-base sm:text-lg mb-10 leading-relaxed font-medium">
              당신은 AI를 지배하는 포식자인가, 대체될 원시인인가?<br />
              10초 만에 확인하세요.
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
            className="flex flex-col items-center justify-center max-w-md w-full"
          >
            {/* The Result Card */}
            <div className="glass-panel w-full rounded-[2rem] p-8 sm:p-10 flex flex-col items-center text-center mb-6 relative overflow-hidden">
              <div className={`mb-6 p-4 rounded-full border-2 bg-black/50 ${iconBgClass}`}>
                <Sparkles className="w-8 h-8" />
              </div>

              <h1 className={`text-2xl sm:text-3xl font-black mb-6 leading-tight tracking-tight ${resultColorClass}`}>
                {resultTitle}
              </h1>

              <div className="bg-black/30 p-5 rounded-2xl border border-white/5 w-full">
                <p className="text-gray-200 font-medium leading-relaxed text-[15px] sm:text-base">
                  {resultBody}
                </p>
              </div>
            </div>

            {/* Stage 4: Conversion CTA */}
            <div className="w-full space-y-4">
              <a
                href="https://piktai.com/ko"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon-primary animate-pulse-cyan w-full text-center py-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:gap-2 text-white font-black text-lg transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-2xl"
              >
                <span>✨ 내 직업에 딱 맞는</span>
                <span className="flex items-center gap-1">
                  'AI 처방전' 무료로 받기 <ExternalLink className="w-5 h-5 opacity-80" />
                </span>
              </a>

              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-gray-300 font-bold transition-all active:scale-[0.98]"
              >
                <Share2 className="w-5 h-5" />
                📢 이 충격적인 결과 공유하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
