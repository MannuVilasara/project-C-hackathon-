import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
import AddServer from "./pages/AddServer";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, role, user }) => {
  // eslint-disable-next-line react/prop-types
  if (!user || user.role !== role) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const { user } = useContext(appContext);
  const location = useLocation();

  const hideLayout =
    location.pathname.includes("login") || location.pathname.includes("signup");

  // Debug logging
  console.log("App render:", {
    user: user ? { id: user._id, email: user.email, role: user.role } : null,
    pathname: location.pathname,
    hideLayout,
  });

  return (
    <div>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user" user={user}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin" user={user}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider-dashboard"
          element={
            <ProtectedRoute role="serviceProvider" user={user}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add/server" element={<AddServer />} />
      </Routes>
      {!hideLayout && <Footer />}

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
