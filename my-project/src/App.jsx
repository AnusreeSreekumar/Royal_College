import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Attendance from './Pages/Attendance.jsx';
import SignUp from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';
import Applyleave from './Pages/Applyleave.jsx';
import Studentattendance from './Pages/Studentattendance.jsx';
import Account from './Pages/Account.jsx';
import Addassignment from './Pages/Addassignment.jsx';
import Dashboard from "./Pages/Dashboard.jsx"
// import NotFound from './pages/NotFound';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Applyleave" element={<Applyleave />} />
        <Route path="/Studentattendance" element={<Studentattendance />} />
        <Route path='/Account' element={<Account />} />
        <Route path='/Assignment' element={<Addassignment/>}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
        {/* Not-Found Route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
