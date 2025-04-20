import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StartQuiz from './pages/StartQuiz';
import AdminDashboard from './Admin/AdminDashboard';
import AllQuestions from './Admin/AllQuestions';
import AddQuestions from './Admin/AddQuestions';
import QuestionByCategory from './Admin/QuestionByCategory';
import UpdateQuestion from './Admin/UpdateQuestion';
import GenerateQuiz from './Admin/GenrateQuiz';
import ViewQuestion from './pages/ViewQuestion';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/play" element={<StartQuiz />} />
        <Route path="/quiz" element={<ViewQuestion />} />
        
        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/all-questions" element={<AllQuestions />} />
          <Route path="/add-question" element={<AddQuestions />} />
          <Route path="/questions-by-category" element={<QuestionByCategory />} />
          <Route path="/update-question/:id" element={<UpdateQuestion />} />
          <Route path="/genrate-quiz" element={<GenerateQuiz />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
