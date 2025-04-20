import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Quiz App
        </Link>

        <ul className="flex space-x-6 text-white font-medium items-center">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/play" className="hover:text-gray-200">Play Quiz</Link>
          </li>
          <li>
            <Link to="/quiz" className="hover:text-gray-200">View Quiz</Link>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <Link to="/add-question" className="hover:text-gray-200">Add Question</Link>
              </li>
              <li>
                <Link to="/genrate-quiz" className="hover:text-gray-200">Add Quiz</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-200 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {!isAuthenticated && (
            <li>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
