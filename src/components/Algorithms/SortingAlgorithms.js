import React from 'react';
import { useNavigate } from 'react-router-dom';

const SortingAlgorithms = () => {
    const navigate = useNavigate();

    const algorithms = [
        { name: 'Bubble Sort', route: '/visualize/bubble-sort' },
        { name: 'Quick Sort', route: '/visualize/quick-sort' },
        { name: 'Merge Sort', route: '/visualize/merge-sort' },
        { name: 'Insertion Sort', route: '/visualize/insertion-sort' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            <div className="container mx-auto py-12 px-6">
                <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    Sorting Algorithms
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {algorithms.map((algorithm) => (
                        <div
                            key={algorithm.name}
                            className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => navigate(algorithm.route)}
                        >
                            <h3 className="text-xl font-bold mb-2">{algorithm.name}</h3>
                            <p className="text-sm text-gray-100">Click to learn about {algorithm.name}.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SortingAlgorithms;
