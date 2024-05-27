//@ts-ignore
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>

        </nav>
    )
};
export default Navbar