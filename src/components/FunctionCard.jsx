import React from 'react';
import { Link } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

const FunctionCard = ({ title, icon: Icon, to }) => {
    return (
        <Link to={to} className="block">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow shadow-blue-100">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-indigo-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            </div>
        </Link>
    );
};

export default FunctionCard;