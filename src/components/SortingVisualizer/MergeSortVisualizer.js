import React, { useState, useEffect } from 'react';

const MergeSortVisualizer = () => {
    const [array, setArray] = useState([5, 3, 8, 6, 2]);
    const [customInput, setCustomInput] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [steps, setSteps] = useState([]);
    const mergeSortCode = [
        'void mergeSort(int[] arr, int left, int right) {',
        '    if (left < right) {',
        '        int mid = left + (right - left) / 2;',
        '        mergeSort(arr, left, mid);',
        '        mergeSort(arr, mid + 1, right);',
        '        merge(arr, left, mid, right);',
        '    }',
        '}',
        'void merge(int[] arr, int left, int mid, int right) {',
        '    int n1 = mid - left + 1;',
        '    int n2 = right - mid;',
        '    int[] L = new int[n1];',
        '    int[] R = new int[n2];',
        '    for (int i = 0; i < n1; i++)',
        '        L[i] = arr[left + i];',
        '    for (int j = 0; j < n2; j++)',
        '        R[j] = arr[mid + 1 + j];',
        '    int i = 0, j = 0, k = left;',
        '    while (i < n1 && j < n2) {',
        '        if (L[i] <= R[j]) {',
        '            arr[k] = L[i];',
        '            i++;',
        '        } else {',
        '            arr[k] = R[j];',
        '            j++;',
        '        }',
        '        k++;',
        '    }',
        '    while (i < n1) {',
        '        arr[k] = L[i];',
        '        i++;',
        '        k++;',
        '    }',
        '    while (j < n2) {',
        '        arr[k] = R[j];',
        '        j++;',
        '        k++;',
        '    }',
        '}',
    ];

    useEffect(() => {
        generateSteps();
    }, [array]);

    useEffect(() => {
        let timer;
        if (isPlaying && currentStep < steps.length - 1) {
            timer = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps]);

    const generateSteps = () => {
        const steps = [];
        const arr = [...array];
        mergeSort(arr, 0, arr.length - 1, steps);
        steps.push({ array: [...arr], sorted: true, line: null });
        setSteps(steps);
    };

    const mergeSort = (arr, left, right, steps) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            mergeSort(arr, left, mid, steps);
            mergeSort(arr, mid + 1, right, steps);
            merge(arr, left, mid, right, steps);
        }
    };

    const merge = (arr, left, mid, right, steps) => {
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const L = arr.slice(left, mid + 1);
        const R = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            steps.push({ array: [...arr], comparing: [left + i, mid + 1 + j], line: 18 });
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            steps.push({ array: [...arr], line: 20 });
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            steps.push({ array: [...arr], line: 26 });
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            steps.push({ array: [...arr], line: 30 });
            j++;
            k++;
        }
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleCustomInput = () => {
        const inputArray = customInput.split(',').map((num) => parseInt(num.trim(), 10));
        if (inputArray.every((num) => !isNaN(num))) {
            setArray(inputArray);
            setCurrentStep(0);
            setIsPlaying(false);
        } else {
            alert('Please enter a valid array of numbers separated by commas.');
        }
    };

    const getBarColor = (index) => {
        if (steps[currentStep]?.comparing?.includes(index)) {
            return 'bg-yellow-400';
        }
        if (steps[currentStep]?.sorted) {
            return 'bg-green-400';
        }
        return 'bg-blue-400';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
            <div className="flex flex-1">
                {/* Left Half: Visualization */}
                <div className="w-1/2 p-6">
                    <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                        Merge Sort Visualization
                    </h1>
                    <div className="flex justify-center items-center mb-6">
                        <button
                            onClick={handlePrevStep}
                            disabled={currentStep === 0}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ⏮️ Previous
                        </button>
                        <button
                            onClick={handlePlayPause}
                            className="px-4 py-2 mx-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                        </button>
                        <button
                            onClick={handleNextStep}
                            disabled={currentStep === steps.length - 1}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next ⏭️
                        </button>
                    </div>
                    <div className="relative flex justify-center items-end h-64 bg-gray-800 rounded-lg shadow-lg p-4">
                        {steps[currentStep]?.array.map((value, index) => (
                            <div
                                key={index}
                                className={`w-10 mx-1 ${getBarColor(index)} rounded-t-md shadow-md transition-all duration-500`}
                                style={{ height: `${value * 20}px` }}
                            ></div>
                        ))}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    </div>
                    <p className="text-center text-gray-400 mt-4">
                        Step {currentStep + 1} of {steps.length}
                    </p>
                </div>

                {/* Right Half: Code */}
                <div className="w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Merge Sort Code
                    </h2>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        {mergeSortCode.map((line, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    steps[currentStep]?.line === index + 1 ? 'bg-blue-500/20' : ''
                                }`}
                            >
                                <span className="text-gray-500 w-8 text-right pr-4 select-none">
                                    {index + 1}
                                </span>
                                <span>{line}</span>
                            </div>
                        ))}
                    </pre>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-100">Time Complexity:</h3>
                        <p className="text-gray-300">O(n log n)</p>
                        <h3 className="text-lg font-semibold text-gray-100 mt-4">Space Complexity:</h3>
                        <p className="text-gray-300">O(n)</p>
                    </div>
                </div>
            </div>

            {/* Custom Input Section */}
            <div className="p-6 bg-gray-900 text-white">
                <h3 className="text-lg font-semibold mb-4">Custom Input</h3>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter numbers separated by commas (e.g., 5,3,8,6,2)"
                        className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleCustomInput}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all"
                    >
                        Sort Custom Input
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MergeSortVisualizer;
