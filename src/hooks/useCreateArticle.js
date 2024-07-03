//handle the submit button 

/**
 * THIS IS NO LONGER IN USE
 * //TODO delete this entire thing 
 */

import {useState,useEffect} from "react"
import { useAuthContext } from "./useAuthContext";
import { customFetch } from "../utils/customFetch";
import { useNavigate } from "react-router-dom";

/*
usage
const [data,error] = useCreateArticle(article,true)

const handlesubmit = ()=>{
    const [data,error] = 
}


 */

export default async function useCreateArticle(article,is_drafted){
    const [error,setError] = useState();
    const [data,setData] = useState();
    const {user} = useAuthContext();
    const navigate = useNavigate();

    if (user==null){
        console.log("Unlogged user sent a request to create article.")
        setError("You are not authorised to post")
    }
    else{
        try{
            const response = await customFetch('/articles',{
                method:"POST",
                mode:"cors",
                headres:{
                    'Authorization':`Bearer ${user.token}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ...article,is_drafted:is_drafted
                })
            })

            const json = await response.json();
            if (response.ok){
                console.log("Created article succesffuly")
                console.log(json);
                navigate('/dashboard')

                setData(json);
            }
            else{
                if (json.error){
                    setError(json.error)
                }
                else setError("An unknown error occured.")
            }

        } catch(err){
            console.log(err);
            setError(err.message);
        }
    }

    return {error,data};



 
}