import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Form from "./components/form/Form";
import TaskList from "./components/tasklist/TaskList";
import LoginPage from "./components/auth/Login";
import SignupPage from "./components/auth/Signup";
import { TasksProvider, TasksContext } from "./store/TaskContext";
import { useContext, useState } from "react";
import Button from "./components/form/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <TasksProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasklist"
            element={
              <ProtectedRoute>
                <TaskListPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </TasksProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(TasksContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const FormPage = () => {
  const { isAuthenticated, logout, setIsEdit, isEdit } =
    useContext(TasksContext);
  const navigate = useNavigate();

  return (
    <main className="w-full pt-20 pb-12 ">
      <section className="2xl:w-3/5 w-4/6 mx-auto h-50 bg-[#FFFFFFa9] rounded-3xl px-8 pt-10 pb-6 ">
        <header className="mb-12">
          <h1 className="text-2xl text-center font-semibold">
            Adding New Tasks
          </h1>
        </header>
        <Form setIsEdit={setIsEdit} isEdit={isEdit} />
        <div className="flex justify-between flex-col gap-4 mt-4">
          <Button
            className="bg-blue-400 w-full"
            onClick={() => navigate("/tasklist")}
          >
            Go to Task List
          </Button>
          {isAuthenticated && (
            <Button className="bg-red-400 w-full" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </section>
    </main>
  );
};

const TaskListPage = () => {
  const { isAuthenticated, logout, setIsEdit, isEdit } =
    useContext(TasksContext);

  const navigate = useNavigate();

  return (
    <main className="w-full pt-20  pb-12  ">
      <section className="2xl:w-3/5 xl:w-4/6 md:w-5/6 w-full mx-auto h-50 bg-[#FFFFFFa9] rounded-3xl px-8 pt-10 pb-6 ">
        <header className="mb-12">
          <h1 className="text-2xl text-center">Task List Page</h1>
        </header>
        <TaskList setIsEdit={setIsEdit} isEdit={isEdit} />
        <div className="flex justify-between flex-col gap-4 mt-16">
          <Button className="bg-blue-400" onClick={() => navigate("/form")}>
            Go to Form
          </Button>
          {isAuthenticated && (
            <Button className="bg-red-400" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
