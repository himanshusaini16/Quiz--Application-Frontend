import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${backendUrl}/question-service/questions/allQuestions`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to fetch questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/question-service/questions/deleteQuestion/${id}`);
      toast.success('Question deleted successfully');
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question.');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-question/${id}`);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">All Questions (Admin View)</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {index + 1}. {question.questionTitle}
              </h2>
              <ul className="ml-4 list-disc text-gray-700">
                <li>A: {question.option1}</li>
                <li>B: {question.option2}</li>
                <li>C: {question.option3}</li>
                <li>D: {question.option4}</li>
              </ul>
              <p className="mt-2 font-semibold text-green-600">
                Correct Answer: {question.rightAnswer}
              </p>
              <p className="text-sm text-gray-500 mt-1">Category: {question.category}</p>
              <p className="text-sm text-gray-500">Difficulty: {question.difficulty}</p>

              <div className="mt-4 flex gap-4">
                {/* Update Button */}
                <button
                  onClick={() => handleUpdate(question.id)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Update
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(question.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllQuestions;
