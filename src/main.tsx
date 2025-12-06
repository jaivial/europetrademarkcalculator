import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// StrictMode helps identify potential problems
// It activates additional checks and warnings for its descendants
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Type-safe DOM access
if (!document.getElementById('root')) {
  throw new Error('Root element not found. Make sure index.html has <div id="root"></div>');
}

// Enable Hot Module Replacement in development
if (import.meta.hot) {
  import.meta.hot.accept();
}
