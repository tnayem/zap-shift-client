import React from 'react';
import tracking from "./../../assets/services/tracking.png";
import delivery from "./../../assets/services/delivery.png";
import support from "./../../assets/services/support.png";
const services = [
    {
        id: 1,
        icon: tracking,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    },
    {
        id: 2,
        icon: delivery,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
        id: 3,
        icon: support,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
];
const OurServices = () => {
    return (
        <section className="bg-base-200 py-16 my-10 rounded-xl">
            <div className="container mx-auto px-4">

                <div className="space-y-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex flex-col md:flex-row items-center bg-base-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Left side icon */}
                            <div className="md:w-1/4 flex justify-center lg:border-r-2 lg:border-dotted lg:border-gray-400">
                                <img
                                    src={service.icon}
                                    alt={service.title}
                                    className="h-32 w-auto object-contain"
                                />
                            </div>

                            {/* Right side content */}
                            <div className="md:w-3/4 md:pl-8 mt-4 md:mt-0 text-center md:text-left">
                                <h3 className="text-xl font-semibold mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-base-content/70 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;