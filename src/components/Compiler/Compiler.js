import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMaximize, FiDownload, FiSave, FiSun, FiMoon } from 'react-icons/fi';

const Compiler = () => {
    const navigate = useNavigate();
    const mainClassTemplate = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;
    const [code, setCode] = useState(mainClassTemplate);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [timeComplexity, setTimeComplexity] = useState('');
    const [spaceComplexity, setSpaceComplexity] = useState('');
    const [showInput, setShowInput] = useState(false); // Toggle for custom input section
    const [isDarkTheme, setIsDarkTheme] = useState(false); // Theme toggle
    const [executionResult, setExecutionResult] = useState(null); // Store execution result for visualization
    

    const handleRunCode = async () => {
        setOutput('');
        setError('');
        setExecutionResult(null); // Clear previous execution result
        setTimeComplexity(''); // Clear time complexity
        setSpaceComplexity(''); // Clear space complexity
        try {
            const response = await fetch('http://localhost:3000/api/compiler/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, input }),
            });
            const data = await response.json();
            if (data.success) {
                setOutput(data.output);
                setExecutionResult(data); // Save execution result for visualization
            } else {
                setError(data.message || 'Compilation failed');
            }
        } catch (err) {
            setError('Failed to connect to the server');
        }
    };

    const handleClear = () => {
        setCode(mainClassTemplate); // Reset code to the Main class template
        setOutput(''); // Clear output
        setError(''); // Clear error
        setTimeComplexity(''); // Clear time complexity
        setSpaceComplexity(''); // Clear space complexity
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        alert('Code copied to clipboard!');
    };

    const handleDownloadCode = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Main.java';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleVisualizeCode = () => {
        if (executionResult) {
            navigate('/visualize/code', { state: { code, executionResult } });
        } else {
            alert('Please run the code first to visualize it.');
        }
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const handleFindComplexity = async () => {
        setTimeComplexity('');
        setSpaceComplexity('');
        try {
            const response = await fetch('http://localhost:3000/api/compiler/timeComplexity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const response2 = await fetch('http://localhost:3000/api/compiler/spaceComplexity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const data = await response.json();
            const data2 = await response2.json();
            if (data.complexity) {
                setTimeComplexity(data.complexity);
                setSpaceComplexity(data2.complexity);
            } else {
                alert(data.message || 'Failed to calculate complexity');
            }
        } catch (err) {
            alert('Failed to connect to the server');
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 p-8 ${
                isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            } flex flex-col`}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-300">
                <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    CodeX Compiler
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300 transition-all"
                    >
                        {isDarkTheme ? <FiSun /> : <FiMoon />}
                        {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
                    </button>
                    <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                        <FiSave />
                        Save Code
                    </button>
                    <button
                        onClick={handleDownloadCode}
                        className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                    >
                        <FiDownload />
                        Download Code
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mb-6">
                <button
                    onClick={handleRunCode}
                    className="py-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all"
                >
                    Run Code
                </button>
                <button
                    onClick={handleClear}
                    className=" py-4 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all"
                >
                    Clear Code
                </button>
                <button
                    onClick={handleVisualizeCode}
                    className="py-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-all"
                >
                    Visualize Code
                </button>
                <button
                    onClick={handleFindComplexity}
                    className="py-4 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-700 transition-all"
                >
                    Find Complexity
                </button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                {/* Code Editor */}
                <div
                    className={`relative rounded-lg overflow-hidden shadow-lg ${
                        isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                >
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your Java code here..."
                        className={`w-full h-full p-4 ${
                            isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
                        } border-none font-mono text-sm leading-6 resize-none focus:outline-none`}
                    />
                </div>

                {/* Output Section */}
                <div
                    className={`relative rounded-lg overflow-hidden shadow-lg ${
                        isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                >
                    {showInput ? (
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Provide custom input here..."
                            className={`w-full h-full p-4 ${
                                isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
                            } border-none font-mono text-sm leading-6 resize-none focus:outline-none`}
                        />
                    ) : (
                        <div className="p-4 h-full overflow-y-auto">
                            {output && (
                                <pre
                                    className={`p-4 rounded-lg border ${
                                        isDarkTheme
                                            ? 'bg-green-900 text-green-300 border-green-700'
                                            : 'bg-green-100 text-green-800 border-green-300'
                                    }`}
                                >
                                    {output}
                                </pre>
                            )}
                            {error && (
                                <pre
                                    className={`p-4 rounded-lg border ${
                                        isDarkTheme
                                            ? 'bg-red-900 text-red-300 border-red-700'
                                            : 'bg-red-100 text-red-800 border-red-300'
                                    }`}
                                >
                                    {error}
                                </pre>
                            )}
                            {(timeComplexity || spaceComplexity) && (
                                <div className="mt-4">
                                    <p className="text-sm">
                                        <strong>Time Complexity:</strong> {timeComplexity}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Space Complexity:</strong> {spaceComplexity}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Custom Input Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setShowInput(!showInput)}
                    className={`px-6 py-3 font-semibold rounded-lg shadow transition-all ${
                        isDarkTheme
                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    {showInput ? 'Hide Custom Input' : 'Show Custom Input'}
                </button>
            </div>
        </div>
    );
};

export default Compiler;