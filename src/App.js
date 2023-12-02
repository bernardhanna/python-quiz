/**
 * @Author: Bernard Hanna
 * @Date:   2023-12-02 15:41:10
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-12-02 17:36:27
 */
import React, { useState } from 'react';
import './App.css';
import './index.css';

function App() {
  const [questions, setQuestions] = useState([
    { question: "Print 'Hello World' to the screen using Python.", answer: "print('Hello World')" },
    { question: "Create a variable 'x' and assign the value 5 to it.", answer: "x = 5" },
    { question: "Write a for loop to print numbers from 1 to 5.", answer: "for i in range(1, 6):\n    print(i)" },
    { question: "How do you create a comment 'This is a comment' in Python?", answer: "# This is a comment" },
    { question: "Define a function in Python called 'my function' that takes no arguments and prints 'Hello'.", answer: "def my_function():\n    print('Hello')" },
    { question: "Define a function in Python called 'validate_username' that takes the argument 'username'.", answer: "def validate_username(username):" },
    { question: "Write a function named 'add' that takes two parameters and returns their sum.", answer: "def add(a, b):\n    return a + b" },
    { question: "How do you call a function named 'greet' in Python?", answer: "greet()" },
    { question: "Create a function 'square' that returns the square of its argument.", answer: "def square(x):\n    return x * x" },
    { question: "Write a Python function that takes a list and returns its length.", answer: "def list_length(lst):\n    return len(lst)" },
    { question: "How do you define a function 'hello' that takes one argument 'name' and prints 'Hello' followed by the name?", answer: "def hello(name):\n    print('Hello', name)" },
    { question: "Create a function named 'max' that takes two numbers and returns the larger of the two.", answer: "def max(a, b):\n    return a if a > b else b" },
    { question: "Write a function 'is_even' that checks if a number is even and returns True or False.", answer: "def is_even(num):\n    return num % 2 == 0" }
  ]);

   // Shuffle function to randomize questions
   const shuffleQuestions = () => {
    const shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    setQuestions(shuffledQuestions);
  };


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSkip = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setUserInput('');
    setFeedback('');
    setShowAnswer(false);
  };

  const checkAnswer = () => {
    const userAnswerNormalized = normalizeCode(userInput);
    const correctAnswerNormalized = normalizeCode(questions[currentQuestion].answer);

    if (userAnswerNormalized === correctAnswerNormalized) {
      setFeedback('Correct!');
      setScore(prevScore => prevScore + 1);
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
      setUserInput('');
      setShowAnswer(false);
    } else {
      if (currentQuestion === 2) {
        const forLoopRegex = /for\s+i\s+in\s+range\(1,\s?6\):\s*print\(i\)/;
        if (forLoopRegex.test(userAnswerNormalized)) {
          setFeedback('Correct!');
          setScore(prevScore => prevScore + 1);
          setCurrentQuestion((prev) => (prev + 1) % questions.length);
          setUserInput('');
          setShowAnswer(false);
          return;
        }
      }
      setFeedback('Try again!');
    }
  };

  const normalizeCode = (code) => {
    return code.toLowerCase().replace(/\s+/g, ' ').trim();
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setUserInput('');
    setFeedback('');
    setShowAnswer(false);
  };

  const endQuiz = () => {
    setQuizStarted(false);
    setFeedback(`Quiz ended. Your score: ${score}/${questions.length}`);
  };

  return (
<div className="App p-6">
      {!quizStarted ? (
       <div className="w-full max-w-[440px] flex justify-between mx-auto px-8 items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:w-full md:w-auto h-[56px]" onClick={startQuiz}>
            Start Quiz
          </button>
          <div className="mt-8 sm:mt-0"></div>
          <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-[56px]" onClick={shuffleQuestions}>
            Randomize Questions First
          </button>
        </div>
      ) : (
        <div className="card bg-white p-6 rounded shadow-lg w-full max-w-[1440px] mx-auto px-8">
          <p className="text-lg font-semibold">{questions[currentQuestion].question}</p>
          <textarea className="mt-4 mb-4 p-2 w-full border rounded" value={userInput} onChange={(e) => setUserInput(e.target.value)} rows="4" />
          <div className="w-full flex flex-row justify-between max-w-[768px] mx-auto">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleShowAnswer}>
              Get Answer
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkAnswer}>
              Submit Answer
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleSkip}>
              Skip
            </button>
          </div>
          {showAnswer && <p className="mt-4 text-gray-700">Answer: {questions[currentQuestion].answer}</p>}
          <p className="mt-4">{feedback}</p>
        </div>
      )}
      {quizStarted && (
        <div>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={endQuiz}>
            End Quiz
          </button>
          <p className="mt-4">Score: {score}</p>
        </div>
      )}
    </div>
  );
}

export default App;