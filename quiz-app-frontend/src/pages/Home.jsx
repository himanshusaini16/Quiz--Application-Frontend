import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaPlusCircle, FaListUl, FaLayerGroup, FaPlayCircle, FaClipboardList } from 'react-icons/fa';

const HomePage = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Quiz Application
      </h1>

      {!isAuthenticated && (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="scale-125">  
      <Card
        icon={<FaPlayCircle size={50} className="mx-auto text-green-600" />}
        title="Play"
        description="Start the quiz and test your knowledge."
        link="/play"
        buttonColor="bg-green-500 hover:bg-green-600"
      />
    </div>
  </div>
)}


      
      {isAuthenticated && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          <Card
            icon={<FaListUl size={40} className="mx-auto text-blue-500" />}
            title="See All Questions"
            description="View and manage all questions in the quiz system."
            link="/all-questions"
            buttonColor="bg-blue-500 hover:bg-blue-600"
          />

          <Card
            icon={<FaLayerGroup size={40} className="mx-auto text-green-500" />}
            title="See Questions by Category"
            description="Browse questions based on different categories."
            link="/questions-by-category"
            buttonColor="bg-green-500 hover:bg-green-600"
          />

          <Card
            icon={<FaPlusCircle size={40} className="mx-auto text-yellow-500" />}
            title="Add a New Question"
            description="Add a new question to the quiz system."
            link="/add-question"
            buttonColor="bg-yellow-500 hover:bg-yellow-600"
          />

          <Card
            icon={<FaClipboardList size={40} className="mx-auto text-purple-500" />}
            title="Generate Quiz"
            description="Generate a new quiz based on available questions."
            link="/genrate-quiz"
            buttonColor="bg-purple-500 hover:bg-purple-600"
          />

          <Card
            icon={<FaPlayCircle size={40} className="mx-auto text-green-600" />}
            title="Play"
            description="Start the quiz and test your knowledge."
            link="/play"
            buttonColor="bg-green-500 hover:bg-green-600"
          />

          <Card
            icon={<FaQuestionCircle size={40} className="mx-auto text-red-500" />}
            title="Quiz"
            description="Take or manage quizzes in the system."
            link="/quiz"
            buttonColor="bg-red-500 hover:bg-red-600"
          />
        </div>
      )}

    </div>
  );
};

const Card = ({ icon, title, description, link, buttonColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition w-80">
    {icon}
    <h2 className="text-2xl font-semibold text-center mt-4 mb-2">{title}</h2>
    <p className="text-gray-600 mb-4 text-center">{description}</p>
    <Link
      to={link}
      className={`block ${buttonColor} text-white text-center py-2 rounded-md font-medium`}
    >
      {title}
    </Link>
  </div>
);

export default HomePage;
