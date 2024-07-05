import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export const  ProtectedRoute = ({children}) =>{
    const {loading,user} = useAuthContext();
    console.log("(ProtectedRoute) - user is : ",user)

    return (
        loading?
        (<p>Loading..!!</p>): 
                user ? 
                children
                :
                <Navigate to="/login"/>

    )
}


/**
 * Tutorial from https://blog.logrocket.com/authentication-react-router-v6/
 * THis component will allow me to easily protect routes i want to protect
 */