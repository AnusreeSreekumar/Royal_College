import React, { useState, useEffect } from 'react';
import Homepage1 from "../college_website/Homepage1.jpg";
import Homepage2 from "../college_website/Homepage2.jpg";
import course1 from "../college_website/course1.jpg";
import course2 from "../college_website/course2.jpg";
import course3 from "../college_website/course3.jpg";
import course4 from "../college_website/course4.jpg";
import Navbar from '../Components/Navbar';

const Home = () => {
  const images = [Homepage1, Homepage2];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Top Banner */}
      <div className="w-full bg-blue-700 text-white text-sm py-2 px-4 font-semibold">
        Phone : +91 8593851244
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Image Carousel */}
      <div className="w-full h-[500px] md:h-[700px]">
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Popular Courses */}
      <div className="bg-gray-900 text-white py-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Popular Courses</h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {[{img: course1, name: "ENGLISH"}, {img: course2, name: "BLOCKCHAIN"}, {img: course3, name: "CYBER SECURITY"}, {img: course4, name: "PCB DESIGNS"}].map((course, index) => (
            <div key={index} className="text-center">
              <img src={course.img} alt={course.name} className="w-48 h-32 object-cover rounded-md" />
              <p className="mt-2 text-lg font-medium">{course.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white px-6 md:px-20 py-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 text-black text-sm space-y-4">
          <h3 className="text-2xl font-bold">WELCOME TO ROYAL COLLEGE</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ut voluptates quae nostrum...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ut voluptates quae nostrum...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ut voluptates quae nostrum...</p>
        </div>
        <div className="w-full lg:w-[350px]">
          <form className="border border-green-500 rounded p-6 shadow">
            <h4 className="text-xl font-semibold mb-2">FIND A COURSE</h4>
            <p className="text-gray-600 text-sm mb-4">Find the right course based on your preference.</p>
            {['Location', 'Level', 'Course Name'].map((placeholder, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={placeholder}
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />
            ))}
            <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 rounded">SEARCH</button>
          </form>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-blue-100 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-6">WHY CHOOSE US?</h3>
            <ul className="space-y-4 text-gray-700 text-sm">
              {["It’s a complete solution for your college website", "PSD file included to help you customize the design better", "SASS file included for unlimited hassle-free style customization", "Theme option switcher for live customization preview", "24/7 Support"].map((text, i) => (
                <li key={i} className="flex items-start"><span className="text-green-500 mr-2">✔</span>{text}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <div className="bg-white p-6 rounded shadow">
              <p className="italic text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
            </div>
            <div className="flex items-center mt-6">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sara Lisbon" className="w-16 h-16 rounded-full border-2 border-white shadow" />
              <div className="ml-4">
                <h4 className="font-bold text-black">SARA LISBON</h4>
                <p className="text-sm text-gray-500">Student <span className="text-green-500">English Literature</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-10 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {[
          ['About royal college', 'College', 'About campus', 'Why choose us?'],
          ['All courses', 'Short courses', 'Summer sessions', 'Online classes'],
          ['Contact us', 'Privacy policy', 'Terms of use', 'Help & FAQs']
        ].map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.map((item, i) => <p key={i} className="text-gray-700 text-sm">{item}</p>)}
          </div>
        ))}
      </footer>
    </div>
  );
};

export default Home;
