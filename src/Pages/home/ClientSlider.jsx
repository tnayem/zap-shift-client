import React from 'react';
import company1 from "./../../assets/brands/amazon.png"
import company2 from "./../../assets/brands/amazon_vector.png"
import company3 from "./../../assets/brands/casio.png"
import company4 from "./../../assets/brands/moonstar.png"
import company5 from "./../../assets/brands/randstad.png"
import company6 from "./../../assets/brands/start-people 1.png"
import company7 from "./../../assets/brands/start.png"
import Marquee from 'react-fast-marquee';

const logos = [company1, company2, company3, company4, company5, company6, company7]
const ClientSlider = () => {
    return (
        <section className="py-16 bg-base-200 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-xl font-semibold mb-4"> We've helped thousands of sales teams</h2>

                <div className="relative flex overflow-hidden">
                    <div className="flex animate-slide space-x-12 min-w-full bg-white">
                        <Marquee
                            gradient={false}       // remove edge fade (optional)
                            pauseOnHover={true}    // pause when user hovers
                            speed={40}             // control scroll speed
                            direction="left"       // scroll direction
                            className="flex items-center justify-center space-x-12"
                        >
                            {logos?.map((logo, index) => (
                                <div key={index} className="flex-shrink-0">
                                    <img
                                        src={logo}
                                        alt={`Client logo ${index + 1}`}
                                        className="h-16 w-32 mx-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientSlider;