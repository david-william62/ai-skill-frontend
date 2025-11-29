import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import { RecruiterProvider } from './context/RecruiterContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StudentProvider>
          <RecruiterProvider>
            <App />
            <Toaster position="top-right" />
          </RecruiterProvider>
        </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);