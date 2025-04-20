// src/pages/AddQuestion.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppContext";

const AddQuestions = () => {
  const [formData, setFormData] = useState({
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswer: "",
    difficulty: "",
    category: "",
  });

  const {backendUrl} = useContext(AppContext)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} =await axios.post(backendUrl+'/question-service/questions/addQuestion', formData );
      console.log(data)

      toast.success("Question added successfully!");
      setFormData({
        questionTitle: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        rightAnswer: "",
        difficulty: "",
        category: "",
      });
    } catch (error) {
      toast.error("Failed to add question");
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
    <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Question</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="questionTitle" placeholder="Question Title" value={formData.questionTitle} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="option1" placeholder="Option 1" value={formData.option1} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="option2" placeholder="Option 2" value={formData.option2} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="option3" placeholder="Option 3" value={formData.option3} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="option4" placeholder="Option 4" value={formData.option4} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="rightAnswer" placeholder="Right Answer" value={formData.rightAnswer} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="difficulty" placeholder="Difficulty Level (e.g. EASY, MEDIUM, HARD)" value={formData.difficulty} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestions;
