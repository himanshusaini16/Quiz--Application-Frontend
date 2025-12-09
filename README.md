# 📘 Quiz Application

A simple and efficient Quiz Application built using Spring Boot Microservices (Quiz-Service & Question-Service) with a React frontend and a PostgreSQL database.
The system supports Admin-only question management and public quiz playing without login.

## 🚀 Features
#### 👨‍💼 Admin Features

**Admins can:**

1.➕ Add Questions

2.🗂 View All Questions

3.🧹 Manage Questions

4.❌ Delete Questions

5.📝 Generate Quizzes based on selected categories/topics

6.🔐 Login Authentication using JWT

## 👤 User Features

**Normal users can:**

🎮 Play Quizzes

📊 See Results Immediately

❌ No login required — fully public access for quiz playing

## 🛠️ Tech Stack
#### Backend

Spring Boot

Microservice Architecture

question-service

quiz-service

api-gateway

eureka-server

PostgreSQL

Eureka Service Registry

JWT Authentication for Admin Dashboard

## Frontend

React + Vite

Axios for API calls

Tailwind CSS (optional)

Admin Dashboard UI + User Quiz UI

# 📂 Project Structure
QuizApplication/
 ├── backend/
 │    ├── question-service/
 │    ├── quiz-service/
 │    ├── api-gateway/
 │    └── eureka-server/
 ├── frontend/
 │    └── quiz-react/
 └── README.md

🔑 Admin Login

Only admins can access the dashboard & manage questions.

JWT token used for authentication

Example Endpoints:

Endpoint	Method	Description
/admin/login	POST	Admin login
/question/add	POST	Add a new question
/question/all	GET	Fetch all questions
/question/delete/{id}	DELETE	Delete a question
/quiz/generate	POST	Generate quiz based on category/topic

🎮 How Users Play Quiz

Users do not need to sign up or login.

Open the quiz UI → choose category → start quiz.

After submitting answers → score is shown instantly.

🧪 API Flow

Add Question: question-service handles question creation.

Generate Quiz: quiz-service fetches questions and creates quiz set.

Play Quiz: Frontend fetches quiz → shows MCQs → evaluates score.




**Run microservices in this order:**

Eureka Server

API Gateway

Question-Service

Quiz-Service






Admin Login


Add Question Page

Manage Questions

Play Quiz UI



🏁 Conclusion

This project demonstrates a clean microservice architecture with a user-friendly frontend.
Admins can manage quizzes, while users can freely play quizzes without login — making the application simple, fast, and accessible.
