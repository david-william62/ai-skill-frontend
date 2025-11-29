import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Play,
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

export default function SkillQuiz() {
  const navigate = useNavigate();
  const { fetchQuiz, submitQuiz, quizData, loading } = useStudent();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  // Sample questions (in real app, these come from API)
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizStarted) {
      handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  const startQuiz = async (category) => {
    setSelectedCategory(category);

    // In real app, fetch from API
    // const data = await fetchQuiz(category.id);

    // Sample questions
    const sampleQuestions = [
      {
        id: 1,
        question: `What is the output of: print(type([]) is list) in ${category.name}?`,
        options: ["True", "False", "Error", "None"],
        correct: 0,
      },
      {
        id: 2,
        question: `Which of the following is used to define a function in ${category.name}?`,
        options: ["function", "def", "func", "define"],
        correct: 1,
      },
      {
        id: 3,
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
        id: 4,
        question: "Which data structure uses LIFO?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: 1,
      },
      {
        id: 5,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        correct: 2,
      },
    ];

    setQuestions(sampleQuestions);
    setTimeLeft(
      category.duration.includes("30")
        ? 1800
        : category.duration.includes("20")
          ? 1200
          : 600,
    );
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };
  const handleSubmitQuiz = async () => {
    setShowConfirm(false);
    setQuizStarted(false);
    // In real app, submit to API
    // await submitQuiz(selectedCategory.id, answers);
    navigate("/student/quiz-results", {
      state: { category: selectedCategory, answers, questions },
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  if (loading) {
    return <Loader />;
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
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedCategory.name} Quiz</h2>
            <div className="flex items-center space-x-4">
              <Clock className="mr-1" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="mb-4">{questions[currentQuestion].question}</p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer
                    ${answers[questions[currentQuestion].id] === index ? "bg-blue-600 border-blue-400" : "bg-gray-700 border-gray-600"}
                  `}
                  onClick={() =>
                    selectAnswer(questions[currentQuestion].id, index)
                  }
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
