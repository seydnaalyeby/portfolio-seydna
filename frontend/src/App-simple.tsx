import React from 'react';
import './index.css';

const SimpleApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Portfolio Seydna Aly Eby</h1>
      <p className="text-gray-300">Test simple du portfolio</p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Sections:</h2>
        <ul className="space-y-2">
          <li>✅ Hero</li>
          <li>✅ About</li>
          <li>✅ Skills</li>
          <li>✅ Projects</li>
          <li>✅ Education</li>
          <li>✅ Strengths</li>
          <li>✅ Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleApp;
