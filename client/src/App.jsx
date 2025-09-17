import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TermsAndConditions from "./pages/TermsAndConditions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import appContext from "./context/AppContext";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  const {user}=useContext(appContext)
  const location=useLocation()
  return (
    <div className="">
      {location.pathname.includes("login") || location.pathname.includes("signup") ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path='/user-dashboard' element={<UserDashboard/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/provider-dashboard' element={<ProviderDashboard/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      {location.pathname.includes("login") || location.pathname.includes("signup") ? null : <Footer />}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default App;
