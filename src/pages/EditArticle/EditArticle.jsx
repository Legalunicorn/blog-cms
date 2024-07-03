import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import CreateArticle from "../createArticle/CreateArticle";
import { customFetch } from "../../utils/customFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
import BeatLoad from "../../components/util/BeadLoad"


export default function EditArticle(){
    const {id} = useParams();
    const {user} = useAuthContext();
    const [article,setArticle] = useState()
    const [error,setError] = useState();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{


        const getArticle = async ()=>{
            try{
                //TODO make a backend API 
                const response = await customFetch(`/articles/protected/${id}`,{
                    method:"GET",
                    mode:"cors",
                    headers:{
                        'Authorization': `Bearer ${user.token}`,
                        'content-type':'application/json' //TODO check if this is actually required LOL
                    }
                })
    
                const data = await response.json();

                console.log("HERE")
    
                if (response.ok){
                    setLoading(false);
                    // console.log('BRO',data.article)
                    // setArticle(data.article)
                    setArticle({
                        title: data.article.title,
                        tags: data.article.tags.map(tag=>tag.name),
                        image: data.article.image,
                        body: data.article.body,
                        id: data.article._id //so that we can patc
                    })
                }
                else{
                    if (data.error) setError(data.error)
                    else setError("Something went wrong.")
                    setLoading(false);
                }
             
            } catch(err){
                // setError(err.message);
                console.log(err);
                setLoading(false);
            }

            
        }
        getArticle();
    },[])


    return (
        <>
            {loading?
             <BeatLoad loading={loading} size='20'/>
             :
             <CreateArticle
                method="PATCH"
                article={article}
              />}
        </>
    )

}