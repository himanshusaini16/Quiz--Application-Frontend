import { createContext} from "react";

export const AppContext = createContext()

const AppContextProvider=(props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const admin = import.meta.env.VITE_ADMIN;
    const adminpassword = import.meta.env.VITE_PASSWORD;
    
    
    const value={
       
        backendUrl,
        admin,
        adminpassword
        
       
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider