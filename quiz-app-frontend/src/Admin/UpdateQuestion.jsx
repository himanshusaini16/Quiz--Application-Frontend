// src/pages/UpdateQuestionPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [question, setQuestion] = useState({
    id: id,
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    category: '',
    difficulty: '',
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${backendUrl}/question-service/questions/getQuestion/${id}`);
        setQuestion(res.data);
      } catch (err) {
        toast.error('Failed to load question details');
      }
    };
    fetchQuestion();
  }, [id, backendUrl]);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendUrl}/question-service/questions/updateQuestion`, question);
      toast.success('Question updated successfully!');
      setTimeout(() => navigate('/all-questions'), 2000);
    } catch (err) {
      toast.error('Failed to update question');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Update Question</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto"
      >
        <input
          type="text"
          name="questionTitle"
          value={question.questionTitle}
          onChange={handleChange}
          placeholder="Question Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option1"
          value={question.option1}
          onChange={handleChange}
          placeholder="Option 1"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option2"
          value={question.option2}
          onChange={handleChange}
          placeholder="Option 2"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option3"
          value={question.option3}
          onChange={handleChange}
          placeholder="Option 3"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option4"
          value={question.option4}
          onChange={handleChange}
          placeholder="Option 4"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="rightAnswer"
          value={question.rightAnswer}
          onChange={handleChange}
          placeholder="Correct Answer"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={question.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="difficulty"
          value={question.difficulty}
          onChange={handleChange}
          placeholder="Difficulty"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Update Question
        </button>
      </form>
    </div>
  );
};

export default UpdateQuestion;
