import React from 'react';
import { Link } from 'react-router';
import location from './../../assets/location-merchant.png'

const BeMerchant = () => {
    return (
        <div data-aos="zoom-in" className=" bg-[#03373D] my-10 p-20 rounded-xl bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                    className="max-full md:min-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div>
                        <Link className="btn bg-[#caeb66] rounded-3xl mr-5">Become a Merchant</Link>
                        <Link className="btn btn-outline hover:bg-[#caeb66] rounded-3xl text-[#caeb66] hover:text-black">Earn with Profast Courier</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;