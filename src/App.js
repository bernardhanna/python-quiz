/**
 * @Author: Bernard Hanna
 * @Date:   2023-12-02 15:41:10
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-12-03 16:17:32
 */
import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

//QUESTIONS
import basicQuestions from './questions/basic.json';
import inputQuestions from './questions/inputs.json';
import functionsQuestions from './questions/functions.json';
import controlQuestions from './questions/control.json';
import stringsQuestions from './questions/strings.json';
import pytestsQuestions from './questions/pytests.json';
import fileinputQuestions from './questions/fileinput.json';
import datastructureQuestions from './questions/datastructure.json';
import datetimeQuestions from './questions/datetime.json';
import exceptionsQuestions from './questions/exceptions.json';
import matplotlibQuestions from './questions/matplotlib.json';

import q1Questions from './questions/q1.json';
import q2Questions from './questions/q2.json';
import q3Questions from './questions/q3.json';

function App() {
    // Combine imported questions
    const [questions, setQuestions] = useState([
      ...basicQuestions, 
      ...inputQuestions, 
      ...functionsQuestions, 
      ...controlQuestions,
      ...stringsQuestions, 
      ...pytestsQuestions, 
      ...datastructureQuestions,
      ...datetimeQuestions,
      ...fileinputQuestions,
      ...exceptionsQuestions,
      ...matplotlibQuestions,
      ...q1Questions,
      ...q2Questions,
      ...q3Questions,
    ]);

    // Add new state variables for isShuffled and isFiltered
    const [isShuffled, setIsShuffled] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    
   // Shuffle function to randomize questions
   const shuffleQuestions = () => {
    const shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    setQuestions(shuffledQuestions);
    setIsShuffled(true); // Set to true after shuffling
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);

  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    if (selectedCategories.length > 0) {
      setIsFiltered(false); // Set isFiltered to false if new categories are selected
    }
  }, [selectedCategories]);
  
  const handleCategoryChange = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    }
    // Update isFiltered based on the checked status of the category
    setIsFiltered(isChecked);
  };

  const filterQuestionsByCategories = () => {
    const filteredQuestions = questions.filter(q => selectedCategories.includes(q.category));
    setQuestions(filteredQuestions);
    setCurrentQuestion(0); // Reset current question index
    setIsFiltered(true); 
  };

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
    return code.toLowerCase().replace(/\s+/g, '').trim();
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
        <div>
          <div className="w-full max-w-[440px] flex justify-between mx-auto px-8 items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:w-full md:w-auto h-[56px]" onClick={startQuiz}>
              Start Quiz
            </button>
            <button className={`${isShuffled ? "bg-green-500" : "bg-red-500"} hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-[56px]`} onClick={shuffleQuestions}>
            Randomize Questions First
          </button>
          </div>
          <div className="w-full max-w-[440px] flex flex-wrap justify-between mx-auto px-8 items-center mt-4">
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('Basic', e.target.checked)} />
            <span>Basic</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('Inputs', e.target.checked)} />
            <span>Inputs</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('Functions', e.target.checked)} />
            <span>Functions</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('Control Structure', e.target.checked)} />
            <span>Control Structure</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('Strings', e.target.checked)} />
            <span>Strings</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('Pytests', e.target.checked)} />
            <span>Pytests</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('Data Structures', e.target.checked)} />
            <span>Data Structures</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('datetime', e.target.checked)} />
            <span>Date Time</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('File Input', e.target.checked)} />
            <span>File Input</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('Exceptions', e.target.checked)} />
            <span>Exception Handling</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" onChange={(e) => handleCategoryChange('matplotlib', e.target.checked)} />
            <span>Matplotlib</span>
          </label>

          <label class="flex space-x-2 text-left">
            <input type="checkbox" onChange={(e) => handleCategoryChange('q1', e.target.checked)} />
            <span>Question 1: Control Structures, Functions, DocStrings, PyTest</span>
          </label>
          <label class="flex space-x-2 text-left">
            <input type="checkbox" onChange={(e) => handleCategoryChange('q2', e.target.checked)} />
            <span>Question 2: Data Structures, datetime</span>
          </label>
          <label class="flex space-x-2 text-left">
            <input type="checkbox" onChange={(e) => handleCategoryChange('q3', e.target.checked)} />
            <span>Question 3: File Input, Exception Handling and matplotlib</span>
          </label>
          
            {selectedCategories.length > 0 && !isFiltered && filterQuestionsByCategories()}
              {/* Conditional rendering for Filter Questions button */}
              {!isFiltered && selectedCategories.length > 0 && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={filterQuestionsByCategories}
                >
                  Filter Questions
                </button>
              )}
          </div>
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