import React from 'react';

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg ">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
