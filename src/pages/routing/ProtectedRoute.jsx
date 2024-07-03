import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export const  ProtectedRoute = ({children}) =>{
    const {loading,user} = useAuthContext();
    console.log("(ProtectedRoute) - user is : ",user)
    console.log(loading);


    //this is bad code, as you will redirect user before auth loads and never come back
    // if (!user){
    //     console.log(user," is not logged in!")
    //     return <Navigate to="/login"/>
    // }
    // console.log("returning to children.")
    // return children;

    // return user? (
    //     {children}
    // ): 
    //     <Navigate to="/login"/>

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