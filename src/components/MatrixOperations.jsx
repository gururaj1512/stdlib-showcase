import React, { useState } from 'react';
import ddot from '@stdlib/blas/base/ddot';
import dnrm2 from '@stdlib/blas/base/dnrm2';

const MatrixVisualizer = () => {
    const [vectorA, setVectorA] = useState('1, 2, 3');
    const [vectorB, setVectorB] = useState('4, 5, 6');
    const [dotProduct, setDotProduct] = useState(null);
    const [normA, setNormA] = useState(null);
    const [normB, setNormB] = useState(null);

    const calculate = () => {
        try {
            const vecA = vectorA.split(',').map(Number);
            const vecB = vectorB.split(',').map(Number);

            if (vecA.length !== vecB.length) {
                throw new Error('Vectors must be the same length');
            }

            setDotProduct(ddot(vecA.length, vecA, 1, vecB, 1));
            setNormA(dnrm2(vecA.length, vecA, 1));
            setNormB(dnrm2(vecB.length, vecB, 1));
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mx-auto max-w-7xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6">BLAS Matrix Operations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Vector A</label>
                    <input 
                        type="text" 
                        value={vectorA} 
                        onChange={(e) => setVectorA(e.target.value)} 
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                        placeholder="Enter comma-separated values"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Vector B</label>
                    <input 
                        type="text" 
                        value={vectorB} 
                        onChange={(e) => setVectorB(e.target.value)} 
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                        placeholder="Enter comma-separated values"
                    />
                </div>
                <button
                    onClick={calculate} 
                    className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                >
                    Compute Vectors
                </button>
            </div>
            <div className="space-y-6">
                <h3 className="text-lg font-semibold">Results:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Dot Product</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                            <span className="font-mono text-lg">
                                {dotProduct !== null ? dotProduct.toFixed(4) : 'N/A'}
                            </span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Norm of Vector A</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                            <span className="font-mono text-lg">
                                {normA !== null ? normA.toFixed(4) : 'N/A'}
                            </span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Norm of Vector B</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                            <span className="font-mono text-lg">
                                {normB !== null ? normB.toFixed(4) : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatrixVisualizer;
