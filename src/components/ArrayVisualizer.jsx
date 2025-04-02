import React, { useState } from 'react';
import ndarray from '@stdlib/ndarray/ctor';
import ndarray2array from '@stdlib/ndarray/to-array';
import isArray from '@stdlib/assert/is-array';
import NDArrayVisualizer from './NDArrayVisualizer';

const ArrayVisualizer = ({ onArrayCreate }) => {
    const [buffer, setBuffer] = useState('1.0, 2.0, 2.0, 3.0, 3.0, 4.0, 4.0, 1.0');
    const [shape, setShape] = useState('2, 2, 2');
    const [order, setOrder] = useState('row-major');
    const [strides, setStrides] = useState('2, 1, 1');
    const [offset, setOffset] = useState('0');
    const [array, setArray] = useState(null);
    const [copied, setCopied] = useState(false);

    const createArray = () => {
        try {
            const bufferArray = buffer.split(',').map(num => parseFloat(num.trim()));
            const shapeArray = shape.split(',').map(num => parseInt(num.trim()));
            const stridesArray = strides.split(',').map(num => parseInt(num.trim()));
            const offsetNum = parseInt(offset);

            const arr = ndarray('generic', bufferArray, shapeArray, stridesArray, offsetNum, order);
            setArray(ndarray2array(arr));

            if (onArrayCreate) {
                onArrayCreate(arr);
            }
        } catch (error) {
            alert(`Error creating array: ${error.message}`);
        }
    };

    const formatArray = (arr) => {
        if (!isArray(arr)) return arr;
        return `[ ${arr.map(item => isArray(item) ? formatArray(item) : item).join(', ')} ]`;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
                <div className="w-full lg:w-1/2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Buffer</label>
                            <input
                                type="text"
                                value={buffer}
                                onChange={(e) => setBuffer(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Shape</label>
                            <input
                                type="text"
                                value={shape}
                                onChange={(e) => setShape(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Order</label>
                            <select
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                            >
                                <option value="row-major">Row Major</option>
                                <option value="column-major">Column Major</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Strides</label>
                            <input
                                type="text"
                                value={strides}
                                onChange={(e) => setStrides(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Offset</label>
                        <input
                            type="number"
                            value={offset}
                            onChange={(e) => setOffset(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm"
                        />
                    </div>
                    <button
                        onClick={createArray}
                        className="w-full sm:w-auto px-6 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Create Array
                    </button>
                    {array && (
                        <div className="mt-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 space-y-2 sm:space-y-0">
                                <h3 className="text-lg font-semibold">Output:</h3>
                                <button
                                    onClick={() => copyToClipboard(formatArray(array))}
                                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <span>Copied!</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </>
                                    ) : (
                                        <>
                                            <span>Copy</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                            <pre className="bg-gray-100 p-4 rounded font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                                {formatArray(array)}
                            </pre>
                        </div>
                    )}
                </div>
                {array && (
                    <div className="w-full lg:w-1/2">
                        <div className="mt-4 lg:mt-0">
                            <h3 className="text-lg font-semibold mb-2">Visual Representation:</h3>
                            <div className="overflow-auto">
                                <NDArrayVisualizer shape={shape.split(',').map(num => parseInt(num.trim()))} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArrayVisualizer;