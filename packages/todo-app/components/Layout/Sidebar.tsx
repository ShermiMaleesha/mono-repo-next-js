import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white font-bold text-xl">
                    <Link href="/">
                        Todo App
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link className="text-gray-300 hover:text-white" href="/">
                        Home
                    </Link>
                    <Link className="text-gray-300 hover:text-white" href="/about">
                        About
                    </Link>
                    <Link className="text-gray-300 hover:text-white" href="/tasks">
                        Tasks
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;