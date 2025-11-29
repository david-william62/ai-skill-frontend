import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useStudent } from "../../context/StudentContext";
import Loader from "../../components/common/Loader";

const skillCategories = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    questions: 15,
    duration: "20 min",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "💛",
    questions: 15,
    duration: "20 min",
  },
  {
    id: "react",
    name: "React.js",
    icon: "⚛️",
    questions: 15,
    duration: "20 min",
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: "🤖",
    questions: 20,
    duration: "30 min",
  },
  {
    id: "sql",
    name: "SQL & Databases",
    icon: "🗄️",
    questions: 15,
    duration: "20 min",
  },
  {
    id: "dsa",
    name: "Data Structures",
    icon: "📊",
    questions: 20,
    duration: "30 min",
  },
];

const buildSampleQuestions = (category) => {
  const name = category?.name || "this topic";
  const idPrefix = category?.id || "general";

  return [
    {
      id: `${idPrefix}-1`,
      question: `What is the output of: print(type([]) is list) in ${name}?`,
      options: ["True", "False", "Error", "None"],
      correct: 0,
    },
    {
      id: `${idPrefix}-2`,
      question: `Which keyword is used to define a function in ${name}?`,
      options: ["function", "def", "func", "define"],
      correct: 1,
    },
    {
      id: `${idPrefix}-3`,
      question: "What does OOP stand for?",
      options: [
        "Object Oriented Programming",
        "Object Optional Programming",
        "Optimal Object Programming",
        "None",
      ],
      correct: 0,
    },
    {
      id: `${idPrefix}-4`,
      question: "Which data structure uses LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correct: 1,
    },
    {
      id: `${idPrefix}-5`,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      correct: 2,
    },
  ];
};

const getDurationInSeconds = (label = "") => {
  const match = label.match(/(\d+)/);
  const minutes = match ? parseInt(match[1], 10) : 15;
  return minutes * 60;
};

const formatSeconds = (seconds) => {
  const safeSeconds = Math.max(seconds, 0);
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function SkillQuiz() {
  const navigate = useNavigate();
  const { submitQuiz, loading } = useStudent();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizDuration, setQuizDuration] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  // Sample questions (in real app, these come from API)
  const [questions, setQuestions] = useState([]);

  const handleSubmitQuiz = useCallback(async (autoSubmit = false) => {
    if (!questions.length || !selectedCategory) {
      return;
    }

    setShowConfirm(false);
    setQuizStarted(false);

    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((count, question) => {
      return answers[question.id] === question.correct ? count + 1 : count;
    }, 0);

    const score = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const timeTaken = quizDuration ? quizDuration - timeLeft : 0;
    const resultPayload = {
      category: selectedCategory.name,
      score,
      correct: correctAnswers,
      total: totalQuestions,
      timeTaken: formatSeconds(timeTaken),
    };

    localStorage.setItem("quizResult", JSON.stringify(resultPayload));

    try {
      if (submitQuiz && selectedCategory.id) {
        await submitQuiz(selectedCategory.id, answers);
      }
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }

    navigate("/student/quiz-result", {
      state: resultPayload,
      replace: autoSubmit,
    });
  }, [answers, navigate, questions, quizDuration, selectedCategory, submitQuiz, timeLeft]);

  useEffect(() => {
    if (!quizStarted) {
      return;
    }

    if (timeLeft <= 0) {
      handleSubmitQuiz(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, handleSubmitQuiz]);

  const startQuiz = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setAnswers({});
    setShowConfirm(false);

    const preparedQuestions = buildSampleQuestions(category);
    setQuestions(preparedQuestions);
    const durationSeconds = getDurationInSeconds(category.duration);
    setQuizDuration(durationSeconds);
    setTimeLeft(durationSeconds);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const activeQuestion = quizStarted ? questions[currentQuestion] : null;
  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  if (loading && !quizStarted) {
    return <Loader text="Preparing your personalized quizzes..." />;
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {!quizStarted ? (
        <div>
          <h1 className="text-3xl font-bold mb-6">Select a Skill Quiz</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
                onClick={() => startQuiz(category)}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="mb-1">Questions: {category.questions}</p>
                <p>Duration: {category.duration}</p>
              </div>
            ))}
          </div>
        </div>
      ) : !activeQuestion ? (
        <Loader text="Loading questions..." />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedCategory.name} Quiz</h2>
            <div className="flex items-center space-x-4">
              <Clock className="mr-1" />
              <span>{formatSeconds(timeLeft)}</span>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="mb-4">{activeQuestion.question}</p>
            <div className="space-y-3">
              {activeQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer
                    ${answers[activeQuestion.id] === index ? "bg-blue-600 border-blue-400" : "bg-gray-700 border-gray-600"}
                  `}
                  onClick={() => handleAnswerSelect(activeQuestion.id, index)}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center justify-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg disabled:opacity-40"
              >
                <ChevronLeft className="mr-2" size={18} />
                Previous
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center justify-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
                >
                  Next
                  <ChevronRight className="ml-2" size={18} />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  disabled={!allAnswered}
                  className="flex-1 px-4 py-2 bg-green-500 text-black rounded-lg font-semibold disabled:opacity-40"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center space-y-6">
            <h3 className="text-2xl font-semibold">Submit Quiz?</h3>
            <p className="text-white/70">
              You answered {Object.keys(answers).length} out of {questions.length} questions.
              {allAnswered ? " Ready to see your score?" : " You can still review unanswered questions."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10"
              >
                Keep Practicing
              </button>
              <button
                onClick={() => handleSubmitQuiz()}
                className="flex-1 px-4 py-2 bg-green-500 text-black rounded-lg font-semibold"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
