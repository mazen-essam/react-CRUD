import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const TasksContext = createContext();

const parseTasks = (tasks) =>
  tasks.map((task) => ({
    ...task,
    date: new Date(task.date),
  }));

export const TasksProvider = ({ children }) => {
    const [isEdit, setIsEdit] = useState();

  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? parseTasks(JSON.parse(storedTasks)) : [];
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await api.fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  // Load tasks for the current user when they log in
  useEffect(() => {
    if (currentUser) {
      const storedTasks = localStorage.getItem(`tasks_${currentUser.id}`);
      setTasks(storedTasks ? parseTasks(JSON.parse(storedTasks)) : []);
    } else {
      setTasks([]);
    }
  }, [currentUser]);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(tasks));
    }
  }, [tasks, currentUser]);

  // Function to add a new task
  const addTask = (name, description, date, isComplete = false) => {
    const newTask = {
      id: Date.now(),
      name,
      description,
      status: isComplete,
      date: new Date(date),
    };
    setTasks([...tasks, newTask]);
  };

  // Function to edit an existing task by id
  const editTask = (
    id,
    updatedName,
    updatedDescription,
    updatedStatus,
    updatedDate
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              name: updatedName,
              description: updatedDescription,
              status: updatedStatus,
              date: new Date(updatedDate),
            }
          : task
      )
    );
  };

  // Function to delete a task by id
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle login
  const login = (username, password) => {
    const user = JSON.parse(localStorage.getItem(`user_${username}`));
    if (user && user.password === password) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      const storedTasks = localStorage.getItem(`tasks_${user.id}`);
      setTasks(storedTasks ? parseTasks(JSON.parse(storedTasks)) : []);
    }
  };

  // Handle signup
  const signup = (username, password) => {
    const user = { id: uuidv4(), username, password };
    localStorage.setItem(`user_${username}`, JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  // Handle logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setTasks([]);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        isAuthenticated,
        login,
        signup,
        logout,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
