import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const QuestionByCategory = () => {
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(AppContext); // Fix typo here

  const fetchQuestions = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${backendUrl}/question-service/questions/category/${category}`);

      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setQuestions(response.data);
      } else {
        setError('No questions found for this category.');
      }
    } catch (err) {
      setError('An error occurred while fetching questions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={fetchQuestions} className="mb-4">
        <label className="block mb-2 font-bold text-lg">Enter Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 w-full rounded mb-2"
          placeholder="e.g. Java, C++, etc."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Questions
        </button>
      </form>

      {loading && <p className="text-gray-500">Fetching questions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && questions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Questions for "{category}"</h2>
          <ul className="space-y-4">
            {questions.map((question) => (
              <li key={question.id} className="border p-4 rounded shadow">
                <h4 className="font-bold">{question.questionTitle}</h4>
                <p className="text-sm text-gray-600">Category: {question.category}</p>
                <p className="text-sm text-gray-600">Difficulty: {question.difficulty}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionByCategory;
