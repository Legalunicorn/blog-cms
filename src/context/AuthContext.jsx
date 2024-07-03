import {
    createContext,
    useReducer,
    useEffect,
    useState
} from "react"



//TODO -> create a loading state for auth context
// if loading just wait first before rendering the child 
// then whenen loadin 

export const AuthContext = createContext();

export const authReducer = (state,action) =>{
    switch(action.type){
        case "LOGIN":{
            return {user:action.payload}
        }
        case "LOGOUT":{
            return {user:null}
        }
        default:
            state;
    }
}

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,{
        user:null
    })

    //my own loading
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        console.log("loggin in?")
        const user = localStorage.getItem("user");
        if (user) {
            dispatch({type:"LOGIN",payload:JSON.parse(user)})
            setLoading(false);
        }
        else{
            setLoading(false);
        }
    },[])
    console.log('Auth context: ',state)

    return (
        <AuthContext.Provider value={{...state,dispatch,loading}}>
            {children}
        </AuthContext.Provider>
    )

}