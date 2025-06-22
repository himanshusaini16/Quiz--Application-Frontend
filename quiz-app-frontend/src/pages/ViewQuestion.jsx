import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';

const ViewQuestion = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const { backendUrl } = useContext(AppContext);

  // Fetch all quiz summaries on mount
useEffect(() => {
  const fetchQuizSummaries = async () => {
    try {
      const response = await axios.get(`${backendUrl}/quiz-service/quiz/all-quiz-summaries`);
      console.log("Fetched quizzes:", response.data);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error('Failed to load quiz list');
    }
  };

  fetchQuizSummaries();
}, [backendUrl]);



  const handleFetchQuiz = async () => {
    if (!quizId) {
      toast.error('Please select a Quiz');
      return;
    }

    try {
      const quizResponse = await axios.get(`${backendUrl}/quiz-service/quiz/getQuizDetails/${quizId}`);

      if (quizResponse.status === 200) {
        const { title, questions: questionIds } = quizResponse.data;
        setQuizTitle(title);

        const questionsResponse = await axios.post(
          `${backendUrl}/question-service/questions/getQuestions`,
          questionIds
        );

        if (questionsResponse.status === 200) {
          setQuestions(questionsResponse.data);
          toast.success('Quiz fetched successfully!');
        } else {
          toast.error('Failed to fetch questions.');
        }
      } else {
        toast.error('Invalid Quiz ID');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      toast.error('Failed to fetch quiz.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8">View Quiz Questions</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="quizSelect" className="block text-lg font-semibold">Select Quiz</label>
          <select
            id="quizSelect"
            className="mt-2 p-2 w-full border rounded-md"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
          >
            <option value="">-- Select Quiz --</option>
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                <p>Quiz id: {quiz.id}: Quiz Title:{quiz.title}  </p>
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFetchQuiz}
          className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4 w-full"
        >
          Fetch Quiz
        </button>
      </div>

      {quizTitle && (
        <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            {quizTitle}
          </h2>

          {questions.map((q, index) => (
            <div key={index} className="mb-6 border-b pb-4">
              <h3 className="font-bold text-lg mb-2">Q{index + 1}: {q.questionTitle}</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>A: {q.option1}</li>
                <li>B: {q.option2}</li>
                <li>C: {q.option3}</li>
                <li>D: {q.option4}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewQuestion;
