import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar';
import Footer from '../Pages/shared/Footer';

const RootLayout = () => {
    return (
        <div className='bg-[#eaeced]'>
            <header className='w-11/12 mx-auto'>
                <div className='py-5'>
                    <Navbar></Navbar>
                </div>
            </header>
            <main className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </main>
            <footer className='w-11/12 mx-auto'>
                <Footer></Footer>
            </footer>

        </div>
    );
};

export default RootLayout;