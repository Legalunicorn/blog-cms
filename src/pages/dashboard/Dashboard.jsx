
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate,Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { customFetch } from "../../utils/customFetch";
import ArticleCardDashboard from "../../components/article/ArticleCardDashboard/ArticleCardDashboard";
import "./dashboard.scss"
import BeatLoad from "../../components/util/BeadLoad";



export default function Dashboard(){
    
    const {user} = useAuthContext();  
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
        const list = e.target.dataset.list;
        const id = e.target.dataset.id;
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
                const data_id = data._id; //id of article delete shud be the same anyuways
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

    }




    return(
        <div className="content">
                <p className="page-header">Dashboard</p>
                <div className="view-setter-dashboard">
                    <p className={view=="posted"?'selected-view':''} onClick={()=>setView('posted')}>Posted</p>
                    <p className={view=="drafted"?'selected-view':''} onClick={()=>setView('drafted')}>drafted</p>
                    <Link to={'/create'}>
                    <p className="create-button">New</p>
                    </Link>
                </div>

                <div className="article-card-list">
                {error && <p>{error}</p>}
                    
                {
                loading? <BeatLoad loading={loading} size='20px'/>:
                
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