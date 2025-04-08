import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlgorithmsPage = () => {
    const navigate = useNavigate();

    const categories = [
        {
            title: 'Sorting Algorithms',
            description: 'Explore various sorting algorithms and their implementations.',
            route: '/algorithms/sorting',
            gradient: 'from-red-500 to-pink-500',
        },
        {
            title: 'Graph Algorithms',
            description: 'Learn about graph traversal and pathfinding algorithms.',
            route: '/algorithms/graph',
            gradient: 'from-green-500 to-teal-500',
        },
        {
            title: 'Important Algorithms',
            description: 'Understand key algorithms used in competitive programming.',
            route: '/algorithms/important',
            gradient: 'from-blue-500 to-indigo-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            <div className="container mx-auto py-12 px-6">
                <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Algorithm Visualizer
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((category, index) => (
                        <div
                            key={category.title}
                            className={`p-8 rounded-lg shadow-lg bg-gradient-to-r ${category.gradient} hover:scale-110 transition-transform cursor-pointer relative`}
                            style={{ height: '500px' }}
                            onClick={() => navigate(category.route)}
                        >
                            <img
                                src={
                                    index === 0
                                        ? '/download.png'
                                        : index === 1
                                        ? 'https://via.placeholder.com/400x200?text=Graph'
                                        : 'https://via.placeholder.com/400x200?text=Coding'
                                }
                                alt={category.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
                            />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-6">{category.title}</h2>
                                <p className="text-base text-gray-100">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlgorithmsPage;
