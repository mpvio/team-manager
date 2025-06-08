import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Main() {
  useEffect(() => {
    // Simulate loading critical resources
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100); // Adjust timing as needed
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="loading-indicator">Loading...</div>
      <App />
    </>
  );
}

root.render(<Main />);