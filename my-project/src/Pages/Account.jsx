import React from 'react';
import Navbar from '../Components/Navbar';
import profile from '../college_website/course1.jpg';

const Account = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full pt-5 overflow-x-hidden">
      <Navbar />

      <h1 className="text-4xl font-bold px-5 lg:px-20 mt-10">My profile</h1>

      <div className="flex flex-col lg:flex-row gap-6 px-5 lg:px-20 my-10">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full lg:w-3/5">
          <div className="flex border-b-2 pb-4 mb-8 font-semibold">
            <div className="px-5 py-2 border-b-4 border-black">Personal info</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 mb-8 items-center sm:items-start">
            <img src={profile} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">JPG, GIF or PNG. Maximum file size 1mb</p>
              <button className="bg-gray-200 border-none py-2 px-5 rounded-xl mt-3 cursor-pointer">
                Change picture
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="text-sm text-gray-500 mb-2">UID</div>
              <div className="bg-gray-100 py-2 px-4 rounded-lg text-sm text-gray-700">928-203-1</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Name</div>
              <div className="bg-gray-100 py-2 px-4 rounded-lg text-sm text-gray-700">@martincooper</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Phone</div>
              <div className="bg-gray-100 py-2 px-4 rounded-lg text-sm text-gray-700">+91 98765 43210</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Email</div>
              <div className="bg-gray-100 py-2 px-4 rounded-lg text-sm text-gray-700">martin.cooper@email.com</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">First name</div>
              <div className="bg-gray-100 py-2 px-4 rounded-lg text-sm text-gray-700">Martin</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Last name</div>
              <div className="bg-gray-100 py-2 px-4 rounded-lg text-sm text-gray-700">Cooper</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Patronymic</div>
              <div className="bg-gray-100 py-2 px-4 rounded-lg text-sm text-gray-700">Ivanovich</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Date of birth</div>
              <div className="bg-gray-100 py-2 px-4 rounded-lg text-sm text-gray-700">26 December 1928</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:w-2/5">
          <div>
            <h3 className="mb-4 font-semibold text-lg">Attendance</h3>

            <select className="mb-4 p-2 rounded-md border border-gray-300">
              <option>April</option>
              <option>May</option>
              <option>June</option>
            </select>

            <div className="mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex justify-center items-center font-bold text-sm">Apr</div>
                <div>
                  <div className="font-semibold">Attendance</div>
                  <div className="text-sm text-gray-500">Tracked for April</div>
                </div>
              </div>
              <div className="h-1 bg-gray-300 rounded mt-2">
                <div className="h-full bg-blue-500 rounded" style={{ width: '80%' }}></div>
              </div><br></br><br></br>
              

              <h3 className="mb-4 font-semibold text-lg">Assigmnet Details</h3>

            


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
