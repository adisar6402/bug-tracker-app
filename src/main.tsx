// Display credit in browser console
console.log('%cBuilt by Abdulrahman Adisa Amuda', 'color: purple; font-size: 16px; font-weight: bold;');

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);