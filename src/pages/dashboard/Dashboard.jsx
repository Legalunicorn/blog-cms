
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { customFetch } from "../../utils/customFetch";
import ArticleCardDashboard from "../../components/article/ArticleCardDashboard/ArticleCardDashboard";
import "./dashboard.scss"
import BeatLoad from "../../components/util/BeadLoad";



export default function Dashboard(){
    const {dispatch} = useAuthContext();
    const {user} = useAuthContext();  
    const [searchParams,setSearchParams] =useSearchParams();

    const [posted,setPosted] = useState([]);
    const [drafted,setDrafted] = useState([]);
    const [view,setView] = useState('posted'); //posted or drafted


    const [loading,setLoading]= useState(true);
    const [error,setError] = useState();




    useEffect(()=>{
        const getUserArticles = async()=>{  

            try{
                const response = await customFetch('/articles/users/posts',{
                    method: "GET",
                    headers:{
                        'Authorization':`Bearer ${user.token}`,
                        'Content-Type':'application/json'
                    }, 
                    mode: "cors"  
                }) 

                const data = await response.json();
                
                if (response.ok){
                    console.log(data);
                    setPosted(data.posted)
                    setDrafted(data.drafted)
                    console.log("hi",data.posted)
                    setLoading(false);
                }
                else{
                    console.log("request not ok")
                    console.log(response)
                    setLoading(false)
                    setError("Something went wrong.")
                }
            } catch(err){
                console.log(err);
                setLoading(false)
                setError("Something went wrong.")
            }
        }
        getUserArticles();
    },[])

    const handleDelete = async (e) =>{
        console.log("in del")

        const list = e.target.dataset.list;
        const id = e.target.dataset.id;
        console.log(list);
        console.log(id)
        try{
            const response = await customFetch(`/articles/${id}`,{
                method:"DELETE",
                mode:"cors",
                headers:{
                    'Authorization' : `Bearer ${user.token}`,
                    'Content-Type':'application/json'
                }
            })

            const data = await response.json();
            console.log(response.ok)
            if (response.ok){
                console.log(data);
                console.log("npepepepe")
                const data_id = data._id; //id of article delete shud be the same anyuways
                console.log('DELETD-',data);
                if (list=='posted'){
                    setPosted(posted.filter(post=>post._id!=data_id))
                }
                else{
                    setDrafted(drafted.filter(post=>post._id!=data_id))
                }
            }
            else{
                console.log("not ok")
                if (data.error) setError(data.error)
            }
            console.log("the end?")
        }
        catch(err){
            setError(err.msg);
        }
        //e.target.... -> id
        //e.target. list? 

        // make a delete request
        // if request is successful
        // update posted or drafted?
    }




    return(
        <div className="content">
                <p className="page-header">Dashboard</p>
                <div className="view-setter-dashboard">
                    <span className={view=="posted"?'selected-view':''} onClick={()=>setView('posted')}>Posted</span>
                    <span className={view=="drafted"?'selected-view':''} onClick={()=>setView('drafted')}>drafted</span>
                </div>

                <div className="article-card-list">
                {error && <p>{error}</p>}
                    
                {
                loading? <BeatLoad loading={loading} size='20'/>:
                
                    view=='posted'?
                        posted.length>0?
                        (
                        posted.map(article=>(
                            <>
                            <ArticleCardDashboard
                                article={article}
                                handleDelete={handleDelete}
                                list='posted'

                            />
                            </>
                        ))
                        ):
                        <p>You have no posted articles</p>
                        
                    :
                        drafted.map(article=>(
                            <ArticleCardDashboard
                                article={article}
                                handleDelete={handleDelete}
                                list='drafted'
                            />
                        ))
                    
                }
                </div>
        </div>
    )
}

/*

DASH BOARD

POSTS | DRAFTS
*/