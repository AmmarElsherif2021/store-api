import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StrictMode } from 'react';
//import reportWebVitals from './reportWebVitals';
const root: HTMLElement | null = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Element with ID "root" not found.');
}

//reportWebVitals();
