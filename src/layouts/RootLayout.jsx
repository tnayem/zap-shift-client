import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar';
import Footer from '../Pages/shared/Footer';

const RootLayout = () => {
    return (
        <div>
            <header className='w-11/12 mx-auto'>
                <Navbar></Navbar>
            </header>
            <main className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>

        </div>
    );
};

export default RootLayout;