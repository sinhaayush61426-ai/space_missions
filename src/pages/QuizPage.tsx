import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy, Star, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { planetsData } from "@/data/planetsData";
import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import PageTransition from "@/components/PageTransition";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  category: "planet" | "mission" | "fact";
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const planets = planetsData;

  // Q type: How many moons does X have?
  planets.filter(p => p.id !== "earth").forEach(p => {
    const others = planets.filter(o => o.id !== p.id && o.moons !== p.moons);
    if (others.length >= 3) {
      const wrongAnswers = shuffleArray(others).slice(0, 3).map(o => String(o.moons));
      const opts = shuffleArray([String(p.moons), ...wrongAnswers]);
      questions.push({
        question: `How many known moons does ${p.name} have?`,
        options: opts,
        correctIndex: opts.indexOf(String(p.moons)),
        category: "planet",
      });
    }
  });

  // Q type: Which agency launched mission X?
  planets.forEach(p => {
    p.missions.forEach(m => {
      const allAgencies = [...new Set(planets.flatMap(pl => pl.missions.map(mi => mi.agency)))];
      const wrongAgencies = shuffleArray(allAgencies.filter(a => a !== m.agency)).slice(0, 3);
      if (wrongAgencies.length >= 3) {
        const opts = shuffleArray([m.agency, ...wrongAgencies]);
        questions.push({
          question: `Which agency launched the ${m.name} mission to ${p.name}?`,
          options: opts,
          correctIndex: opts.indexOf(m.agency),
          category: "mission",
        });
      }
    });
  });

  // Q type: What is X's distance from the Sun?
  planets.filter(p => p.id !== "earth").forEach(p => {
    const others = planets.filter(o => o.id !== p.id && o.id !== "earth");
    if (others.length >= 3) {
      const wrong = shuffleArray(others).slice(0, 3).map(o => o.distance);
      const opts = shuffleArray([p.distance, ...wrong]);
      questions.push({
        question: `What is ${p.name}'s distance from the Sun?`,
        options: opts,
        correctIndex: opts.indexOf(p.distance),
        category: "planet",
      });
    }
  });

  // Q type: What year did mission X launch?
  planets.forEach(p => {
    p.missions.slice(0, 2).forEach(m => {
      const allYears = [...new Set(planets.flatMap(pl => pl.missions.map(mi => mi.year)))];
      const wrong = shuffleArray(allYears.filter(y => y !== m.year)).slice(0, 3);
      if (wrong.length >= 3) {
        const opts = shuffleArray([m.year, ...wrong]);
        questions.push({
          question: `What year did the ${m.name} mission launch?`,
          options: opts,
          correctIndex: opts.indexOf(m.year),
          category: "mission",
        });
      }
    });
  });

  // Q type: Which planet has diameter X?
  planets.filter(p => p.id !== "earth").forEach(p => {
    const others = planets.filter(o => o.id !== p.id);
    if (others.length >= 3) {
      const wrong = shuffleArray(others).slice(0, 3).map(o => o.name);
      const opts = shuffleArray([p.name, ...wrong]);
      questions.push({
        question: `Which planet has a diameter of ${p.diameter}?`,
        options: opts,
        correctIndex: opts.indexOf(p.name),
        category: "fact",
      });
    }
  });

  return shuffleArray(questions).slice(0, 10);
}

const TOTAL_QUESTIONS = 10;

const QuizPage = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];

  const handleAnswer = useCallback((optIndex: number) => {
    if (answered) return;
    setSelectedAnswer(optIndex);
    setAnswered(true);
    if (optIndex === current.correctIndex) {
      setScore(s => s + 1);
    }
  }, [answered, current]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }, [currentIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  }, []);

  const percentage = useMemo(() => Math.round((score / questions.length) * 100), [score, questions.length]);

  const getResultMessage = () => {
    if (percentage >= 90) return { text: "Space Commander!", emoji: "🚀" };
    if (percentage >= 70) return { text: "Stellar Explorer!", emoji: "⭐" };
    if (percentage >= 50) return { text: "Cosmic Cadet!", emoji: "🌙" };
    return { text: "Keep Exploring!", emoji: "🔭" };
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        <Starfield />
        <Navbar />

        <main className="relative z-10 pt-20 sm:pt-24 pb-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-2xl">
            {/* Back */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <p className="text-primary font-display text-xs tracking-[0.2em] uppercase mb-2">
                Test Your Knowledge
              </p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Space <span className="gold-gradient">Quiz</span>
              </h1>
            </motion.div>

            <AnimatePresence mode="wait">
              {!finished ? (
                <motion.div
                  key={`q-${currentIndex}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Progress */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>Question {currentIndex + 1} / {questions.length}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary" />
                      {score} pts
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full mb-8 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Question card */}
                  <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8 mb-6">
                    <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 capitalize">
                      {current.category}
                    </span>
                    <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-6">
                      {current.question}
                    </h2>

                    <div className="space-y-3">
                      {current.options.map((opt, i) => {
                        const isCorrect = i === current.correctIndex;
                        const isSelected = i === selectedAnswer;
                        let borderClass = "border-border/50 hover:border-primary/50";
                        if (answered) {
                          if (isCorrect) borderClass = "border-green-500 bg-green-500/10";
                          else if (isSelected) borderClass = "border-destructive bg-destructive/10";
                          else borderClass = "border-border/30 opacity-50";
                        }

                        return (
                          <motion.button
                            key={i}
                            whileHover={!answered ? { scale: 1.01 } : {}}
                            whileTap={!answered ? { scale: 0.99 } : {}}
                            onClick={() => handleAnswer(i)}
                            disabled={answered}
                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${borderClass} ${!answered ? "cursor-pointer" : "cursor-default"}`}
                          >
                            <span className="text-sm sm:text-base text-foreground">{opt}</span>
                            {answered && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />}
                            {answered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <Button onClick={handleNext} className="gap-2">
                        {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl bg-card border border-border/50 p-8 sm:p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <Trophy className="w-10 h-10 text-primary" />
                  </motion.div>

                  <p className="text-4xl mb-2">{getResultMessage().emoji}</p>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
                    {getResultMessage().text}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    You scored <span className="text-primary font-bold">{score}</span> out of{" "}
                    <span className="text-foreground font-bold">{questions.length}</span> ({percentage}%)
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button onClick={handleRestart} variant="outline" className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </Button>
                    <Button asChild>
                      <Link to="/" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Explore Planets
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};

export default QuizPage;
