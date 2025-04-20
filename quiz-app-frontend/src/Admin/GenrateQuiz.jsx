import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';

const GenerateQuiz = () => {
  const [category, setCategory] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const {backendUrl} = useContext(AppContext)

  const handleGenerateQuiz = async () => {
    if (!category) {
      toast.error('Please enter a category.');
      return;
    }

    if (!title) {
      toast.error('Please enter a quiz title.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(backendUrl+'/quiz-service/quiz/create', {
        category: category,
        numberOfQuestions: numQuestions,
        title: title,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Quiz generated and saved successfully!');
      } else {
        toast.error('Failed to save the quiz.');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast.error('Failed to generate and save quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8">Generate Quiz</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">Quiz Title</label>
          <input
            type="text"
            id="title"
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Enter quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-semibold">Category</label>
          <input
            type="text"
            id="category"
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numQuestions" className="block text-lg font-semibold">Number of Questions</label>
          <input
            type="number"
            id="numQuestions"
            className="mt-2 p-2 w-full border rounded-md"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            min="1"
            max="20"
          />
        </div>

        <button
          onClick={handleGenerateQuiz}
          className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4 w-full"
          disabled={loading}
        >
          {loading ? 'Generating Quiz...' : 'Generate Quiz'}
        </button>
      </div>

      {title && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-medium">Quiz Title:</h2>
          <p className="text-lg text-gray-700 mt-2">{title}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateQuiz;
