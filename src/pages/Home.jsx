import React from 'react'
import FunctionCard from '../components/FunctionCard.jsx';
import { TbMathFunction } from 'react-icons/tb';
import { SiNumpy } from 'react-icons/si';

const Home = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FunctionCard
                        title="Array Operations"
                        icon={SiNumpy}
                        to="/ndarray"
                    />
                    <FunctionCard
                        title="Mathematical Tools"
                        icon={TbMathFunction}
                        to="/math"
                    />
                </div>
            </section>
        </div>
    )
}

export default Home