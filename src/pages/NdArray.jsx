import React from 'react';
import ArrayVisualizer from '../components/ArrayVisualizer.jsx';

const NdArray = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <section className="mb-12">
                <h1 className="text-4xl font-bold text-center mb-8">NDArray Visualizer</h1>
                <ArrayVisualizer />
            </section>
            <footer className="text-center text-sm text-gray-500 mt-8">
                Referenced from <a href="https://github.com/biraj21/tensor-visualizer" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Source Name</a>
            </footer>
        </div>
    );
};

export default NdArray;