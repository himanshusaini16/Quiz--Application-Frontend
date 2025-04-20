import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Quizzes</h2>
          <p className="text-3xl mt-2 text-blue-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Questions</h2>
          <p className="text-3xl mt-2 text-blue-600">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Users</h2>
          <p className="text-3xl mt-2 text-blue-600">45</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Management</h2>
        <div className="space-y-3">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Add New Quiz
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Add Question
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            View All Quizzes
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            View All Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
