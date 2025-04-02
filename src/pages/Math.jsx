import React from 'react'
import MatrixOperations from '../components/MatrixOperations.jsx';
import MatrixMultiplication from '../components/MatrixMultiplication.jsx';

const Math = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <section className="mb-12">
                <MatrixOperations />
            </section>
            <section className="mb-12">
                <MatrixMultiplication />
            </section>
        </div>
    )
}

export default Math