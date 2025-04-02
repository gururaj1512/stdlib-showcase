import React, { useState, useEffect } from 'react';
import ddot from '@stdlib/blas/base/ddot';

const MatrixMultiplication = () => {
    const [size, setSize] = useState(2);
    const [matrixA, setMatrixA] = useState(Array(4).fill(0));
    const [matrixB, setMatrixB] = useState(Array(4).fill(0));
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setMatrixA(Array(size * size).fill(0));
        setMatrixB(Array(size * size).fill(0));
        setResult(null);
    }, [size]);

    const handleMatrixChange = (matrix, index, value) => {
        const newMatrix = [...matrix];
        newMatrix[index] = parseFloat(value) || 0;
        return newMatrix;
    };

    const multiplyMatrices = () => {
        try {
            const n = parseInt(size);
            if (isNaN(n) || n <= 0) {
                throw new Error('Matrix size must be a positive number');
            }

            const c = new Array(n * n).fill(0);
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    const row = matrixA.slice(i * n, (i + 1) * n);
                    const col = Array(n).fill(0).map((_, k) => matrixB[k * n + j]);
                    c[i * n + j] = ddot(n, row, 1, col, 1);
                }
            }

            setResult(c);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    const renderMatrixInputs = (matrix, setMatrix, label) => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">{label}</h3>
            <div className="grid grid-cols-1 gap-2">
                {[...Array(parseInt(size))].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                        {[...Array(parseInt(size))].map((_, colIndex) => (
                            <input
                                key={colIndex}
                                type="number"
                                value={matrix[rowIndex * size + colIndex]}
                                onChange={(e) => setMatrix(handleMatrixChange(matrix, rowIndex * size + colIndex, e.target.value))}
                                className="w-16 h-12 text-center rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderResultMatrix = (matrix, n) => {
        if (!matrix) return null;
        return (
            <div className="grid grid-cols-1 gap-2">
                {[...Array(n)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                        {[...Array(n)].map((_, colIndex) => (
                            <div key={colIndex} className="w-16 h-12 flex items-center justify-center bg-white rounded-md border border-gray-200 font-mono">
                                {matrix[rowIndex * n + colIndex].toFixed(2)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mx-auto max-w-7xl">
            {/* <h2 className="text-xl font-bold text-gray-800 mb-6">Matrix Multiplication</h2> */}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Matrix Size (n×n)</label>
                <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value) || 2)}
                    className="mt-1 w-24 rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                    min="1"
                    max="5"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className='w-full h-full bg-gray-50 border-gray-500 flex justify-center py-4'>
                    {renderMatrixInputs(matrixA, setMatrixA, 'Matrix A')}
                </div>
                <div className='w-full h-full bg-gray-50 border-gray-500 flex justify-center py-4'>
                    {renderMatrixInputs(matrixB, setMatrixB, 'Matrix B')}
                </div>
                {error ? (
                    <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-md">{error}</div>
                ) : result ? (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Result Matrix:</h3>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200  flex justify-center py-4">
                            {renderResultMatrix(result, parseInt(size))}
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-full bg-gray-100 border-gray-300'>
                    </div>
                )}
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={multiplyMatrices}
                    className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                >
                    Multiply Matrices
                </button>
            </div>
        </div>
    );
};

export default MatrixMultiplication;