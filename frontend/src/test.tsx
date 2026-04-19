import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Test Portfolio</h1>
      <p>Si vous voyez ce message, React fonctionne correctement.</p>
      <p>URL de l'API: {import.meta.env.VITE_API_URL}</p>
    </div>
  );
};

export default TestApp;
