import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const appContext=createContext();


export const ContextProvider=({children})=>{


 const [user, setuser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
const [token, settoken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null);
const navigate=useNavigate()
 const [activeTab, setActiveTab] = useState('profile');

const value={
    user,
    setuser,
    token,
    settoken,
    navigate,
    activeTab,
    setActiveTab
}

    return(
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}

export default appContext;