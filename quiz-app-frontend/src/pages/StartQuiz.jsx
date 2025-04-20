import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';

const StartQuiz = () => {
  const [quizId, setQuizId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);
  const [step, setStep] = useState('input');
  const {backendUrl} = useContext(AppContext)

  const handleFetchQuiz = async () => {
    try {
      const res = await axios.post(`${backendUrl}/quiz-service/quiz/getQuiz/${quizId}`);
      setQuestions(res.data);
      setScore(null);
      setResponses({});
      setStep('instructions');
      toast.success('Quiz loaded!');
    } catch (error) {
      toast.error('Failed to fetch quiz.');
    }
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(responses).length !== questions.length) {
      toast.error('Please answer all questions.');
      return;
    }

    const payload = questions.map((q) => ({
      id: q.id,
      response: responses[q.id],
    }));

    try {
      const res = await axios.post(
        `${backendUrl}/quiz-service/quiz/submitQuiz/${quizId}`,
        payload
      );
      setScore(res.data);
      toast.success(`Quiz submitted! Your score: ${res.data}`);
    } catch (error) {
      toast.error('Failed to submit quiz.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-6">Play Quiz</h1>

      {step === 'input' && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <label className="block mb-2 font-medium text-lg">Enter Quiz ID:</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            placeholder="Quiz ID"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
          />
          <button
            onClick={handleFetchQuiz}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
          >
            Load Quiz
          </button>
        </div>
      )}

      {step === 'instructions' && (
        <div className="bg-white max-w-2xl mx-auto p-6 mt-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">📋 Quiz Instructions</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
            <li>This quiz contains multiple-choice questions.</li>
            <li>Each correct answer gives you 1 point.</li>
            <li>There is no negative marking.</li>
            <li>Ensure you answer all questions before submitting.</li>
          </ul>
          <button
            onClick={() => setStep('quiz')}
            className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Start Quiz
          </button>
        </div>
      )}

      {step === 'quiz' && questions.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Answer the Questions</h2>
          {questions.map((q, index) => (
            <div key={q.id} className="mb-6">
              <p className="font-medium mb-2">Q{index + 1}. {q.questionTitle}</p>
              {['option1', 'option2', 'option3', 'option4'].map((optKey) => (
                <div key={optKey} className="mb-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={q[optKey]}
                      checked={responses[q.id] === q[optKey]}
                      onChange={() => handleOptionChange(q.id, q[optKey])}
                      className="mr-2"
                    />
                    {q[optKey]}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={handleSubmitQuiz}
            className="bg-green-600 text-white py-2 px-4 rounded mt-4"
          >
            Submit Quiz
          </button>

          {score !== null && (
            <div className="mt-6 text-xl font-bold text-center text-green-700">
              🎉 Your Score: {score} / {questions.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
