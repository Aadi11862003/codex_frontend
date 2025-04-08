import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to CodeX</h1>
      <p>A platform to visualize, understand, and test your code</p>
      
      <div className="features">
        <div className="feature-card">
          <h2>Online Compiler</h2>
          <p>Write, run, and test your code directly in the browser</p>
          <Link to="/compiler" className="feature-button">Try Compiler</Link>
        </div>
        
        <div className="feature-card">
          <h2>Code Visualization</h2>
          <p>See how your code executes step by step with our interactive visualizer</p>
          <Link to="/compiler" className="feature-button">Try Visualization</Link>
        </div>
        
        <div className="feature-card">
          <h2>Edge Case Analysis</h2>
          <p>Identify and understand edge cases in your code automatically</p>
          <Link to="/compiler" className="feature-button">Analyze Code</Link>
        </div>
        
        <div className="feature-card">
          <h2>AI Assistant</h2>
          <p>Get help with coding questions and platform usage from our AI assistant</p>
          <Link to="/compiler" className="feature-button">Ask Assistant</Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 