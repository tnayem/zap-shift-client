import React from "react";

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center">
      <div className="flex justify-center mb-4">
        <Icon className="text-4xl text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-base-content/70 text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
