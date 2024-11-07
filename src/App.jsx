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

function App() {
  return (
    <TasksProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </TasksProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(TasksContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const TasksPage = () => {
  const { isAuthenticated, logout } = useContext(TasksContext);
  const [isEdit, setIsEdit] = useState();
  return (
    <main className="w-full pt-20">
      <section className="2xl:w-3/5 w-4/5 mx-auto h-50 bg-slate-200 px-10 pt-10 pb-6">
        <header className="mb-12">
          <h1 className="text-2xl text-center">
            Welcome to My React CRUD System
          </h1>
        </header>
        <Form setIsEdit={setIsEdit} isEdit={isEdit} />
        <TaskList setIsEdit={setIsEdit} isEdit={isEdit} />
        <div className="text-end">
          {isAuthenticated && (
            <Button className={"mt-12 bg-red-400 "} onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </section>
    </main>
  );
};

export default App;