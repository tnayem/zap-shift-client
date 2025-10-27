import React from 'react';
import Banner from './Banner';
import Services from './Services';
import ClientSlider from './ClientSlider';
import OurServices from './OurServices';

const Home = () => {
    return (
        <div>
            <div className='my-5'>
                <Banner></Banner>
                <Services></Services>
                <ClientSlider></ClientSlider>
                <OurServices></OurServices>
            </div>
        </div>
    );
};

export default Home;