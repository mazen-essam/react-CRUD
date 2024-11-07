import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TasksProvider } from './store/TaskContext';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <TasksProvider>
    <App />
  </TasksProvider>,
)
