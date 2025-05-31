import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add global styles for accessibility
const style = document.createElement('style');
style.textContent = `
  .high-contrast {
    --bg-color: white;
    --text-color: black;
    --link-color: #0000EE;
    --visited-link-color: #551A8B;
    --focus-outline-color: #000000;
  }
  
  .high-contrast .text-gray-600 {
    color: #000000 !important;
  }
  
  .high-contrast a {
    color: var(--link-color) !important;
    text-decoration: underline !important;
  }
  
  .high-contrast a:visited {
    color: var(--visited-link-color) !important;
  }
  
  .high-contrast button, 
  .high-contrast a, 
  .high-contrast input, 
  .high-contrast select, 
  .high-contrast textarea {
    outline: 2px solid transparent;
  }
  
  .high-contrast button:focus, 
  .high-contrast a:focus, 
  .high-contrast input:focus, 
  .high-contrast select:focus, 
  .high-contrast textarea:focus {
    outline: 3px solid var(--focus-outline-color) !important;
    outline-offset: 2px !important;
  }
  
  /* For reduced motion preference */
  .reduced-motion * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
  
  /* Enhanced focus styles for keyboard navigation */
  :focus-visible {
    outline: 3px solid #2563EB !important;
    outline-offset: 2px !important;
  }
  
  /* Add keyboard-only focused element styles */
  .keyboard-focused {
    outline: 3px solid #2563EB !important;
    outline-offset: 2px !important;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);