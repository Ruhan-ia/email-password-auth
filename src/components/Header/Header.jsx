import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <nav className='w-50 mx-auto my-5'>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/register-rbs'>Register RBS</Link>

        </nav>
    );
};

export default Header;