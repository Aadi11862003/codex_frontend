import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CodeVisualizer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = location.state || {};
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [currentLineNumber, setCurrentLineNumber] = useState(1);

  const highlightColors = [
    'bg-blue-500/20 text-blue-300',
    'bg-green-500/20 text-green-300',
    'bg-yellow-500/20 text-yellow-300',
    'bg-red-500/20 text-red-300',
  ];

  // Generate steps always when code comes in
  useEffect(() => {
    if (!code) {
      alert('No code found. Redirecting to the compiler.');
      navigate('/compiler');
      return;
    }
    const generatedSteps = generateVisualizationSteps(code);
    setSteps(generatedSteps);
    setCurrentStep(0);
    if (generatedSteps.length > 0) {
      setCurrentLineNumber(generatedSteps[0].lineNumber);
    }
  }, [code, navigate]);

  // Update current line number when step changes
  useEffect(() => {
    if (steps[currentStep]) {
      setCurrentLineNumber(steps[currentStep].lineNumber);
    }
  }, [currentStep, steps]);

  // Generate step-by-step highlights
  const generateVisualizationSteps = (code) => {
    const steps = [];
    const lines = code.split('\n');
    lines.forEach((line, idx) => {
      steps.push({
        lineNumber: idx + 1,
        description: `Executing line ${idx + 1}: ${line.trim()}`,
        highlightedCode: highlightCodeLine(code, idx + 1),
      });
    });
    return steps;
  };

  const highlightCodeLine = (code, lineNumber) => {
    const lines = code.split('\n');
    return lines.map((line, index) => ({
      code: line,
      highlighted: index + 1 === lineNumber,
    }));
  };

  // ⬇️ New: Fetch explanation only when user clicks
  const handleStartExplaining = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const response = await fetch('http://localhost:3000/api/compiler/analyze-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setAnalysis(data.analysis || null);
    } catch (error) {
      console.error('Error analyzing code:', error);
      alert('Failed to explain the code');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Code Visualization
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-[70vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Code</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            {steps[currentStep]?.highlightedCode.map((line, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  line.highlighted
                    ? highlightColors[currentStep % highlightColors.length]
                    : ''
                }`}
              >
                <span className="text-gray-500 w-8 text-right pr-4 select-none">
                  {index + 1}
                </span>
                <span>{line.code}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* Explanation Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-[70vh] overflow-y-auto flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Code Explanation</h2>

          {/* Start Explaining Button */}
          {!analysis && (
            <button
              onClick={handleStartExplaining}
              className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Explaining...' : 'Start Explaining'}
            </button>
          )}

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg space-y-4 flex-1">
            {!analysis && !isLoading && (
              <p className="text-gray-400">
                Click <strong>Start Explaining</strong> to analyze the code.
              </p>
            )}

            {analysis?.introduction && (
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">👋 Overview</h3>
                <p>{analysis.introduction}</p>
              </div>
            )}

            {analysis?.lineByLine && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">🔍 Line by Line Explanation</h3>
                {analysis.lineByLine.map((line, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      line.lineNumber === currentLineNumber
                        ? 'bg-blue-500/20 border border-blue-500/50'
                        : 'bg-gray-800'
                    }`}
                  >
                    <div className="font-mono text-sm text-gray-400 mb-2">
                      Line {line.lineNumber}: {line.code}
                    </div>
                    <p>{line.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {analysis?.complexity && (
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">⚡ Complexity Analysis</h3>
                <p>
                  <span className="text-purple-300">Time Complexity:</span> {analysis.complexity.time}
                </p>
                <p>
                  <span className="text-purple-300">Space Complexity:</span> {analysis.complexity.space}
                </p>
              </div>
            )}

            {analysis?.summary && (
              <div className="p-4 bg-green-900/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">🎯 Summary</h3>
                <p>{analysis.summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          disabled={currentStep === steps.length - 1}
          onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CodeVisualizer;
