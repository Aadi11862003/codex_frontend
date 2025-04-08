import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CodeVisualizer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { code } = location.state || {};
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const highlightColors = ['bg-blue-500/20 text-blue-300', 'bg-green-500/20 text-green-300', 'bg-yellow-500/20 text-yellow-300', 'bg-red-500/20 text-red-300'];

    useEffect(() => {
        if (!code) {
            alert('No code found. Redirecting to the compiler.');
            navigate('/compiler');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const generatedSteps = generateVisualizationSteps(code);
            setSteps(generatedSteps);
            setCurrentStep(0);
            setIsLoading(false);
        }, 1000);
    }, [code, navigate]);

    useEffect(() => {
        let timer;
        if (isPlaying && currentStep < steps.length - 1) {
            timer = setTimeout(() => {
                goToNextStep();
            }, 1000 / playbackSpeed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }

        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps, playbackSpeed]);

    const generateVisualizationSteps = (code) => {
        const steps = [];
        const lines = code.split('\n');

        lines.forEach((line, index) => {
            steps.push({
                lineNumber: index + 1,
                description: `Executing line ${index + 1}: ${line.trim()}`,
                highlightedCode: highlightCodeLine(code, index + 1),
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

    const goToNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const goToPrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSpeedChange = (e) => {
        setPlaybackSpeed(parseFloat(e.target.value));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Loading Visualization...
                </h1>
            </div>
        );
    }

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
                                    line.highlighted ? highlightColors[currentStep % highlightColors.length] : ''
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

                {/* Steps Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-[70vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Steps of Code Executing</h2>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                        <ul className="space-y-2">
                            {steps.map((step, index) => (
                                <li
                                    key={index}
                                    className={`p-2 rounded-md ${
                                        index === currentStep ? highlightColors[currentStep % highlightColors.length] : ''
                                    }`}
                                >
                                    {step.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    onClick={goToPrevStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ⏮️ Previous
                </button>
                <button
                    onClick={togglePlayback}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
                <button
                    onClick={goToNextStep}
                    disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next ⏭️
                </button>
                <div className="flex items-center gap-2">
                    <label htmlFor="speed" className="text-gray-300">
                        Speed:
                    </label>
                    <select
                        id="speed"
                        value={playbackSpeed}
                        onChange={handleSpeedChange}
                        className="px-2 py-1 bg-gray-700 text-white rounded-md"
                    >
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="2">2x</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CodeVisualizer;