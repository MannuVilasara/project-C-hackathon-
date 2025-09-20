import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const appContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setuser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, settoken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Sync user and token with localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = {
    user,
    setuser,
    token,
    settoken,
    navigate,
    activeTab,
    setActiveTab,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default appContext;
