import React from 'react';
import FeatureSection from '../Components/FeatureSection';
import Navbar from '../Components/Navbar';

const Dashboard = () => {
  return (
    <>
    <div>
        <Navbar />
        </div>
    <div className="relative min-h-screen font-sans overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: `url(${Dashboard})`,backgroundSize: 'cover',backgroundPosition: 'center'}}>
     </div>
     <p className="text-5xl text-white">Welcome</p>
     <div className="relative z-10 flex flex-col justify-end ">
        <div className=" mt-96 ml-96 mr-96">
          
          <FeatureSection />
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
