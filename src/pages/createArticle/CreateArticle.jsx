import { useState ,useEffect} from "react"

import "./createArticle.scss"
import MarkdownPreview  from "./MarkdownPreview";
import HeaderPreview from "./HeaderPreview";
import Editor from "./Editor";
import { useAuthContext } from "../../hooks/useAuthContext";
import { customFetch } from "../../utils/customFetch";
import { useNavigate,useParams } from "react-router-dom";



export default function CreateArticle({article,method}){

    const [view,setView] = useState('edit')//edit OR preview
    const {user} = useAuthContext();
    const [error,setError] = useState();

    const navigate = useNavigate();


    //rerender is triggered everytime value is changed
    // if (article){
    //     // console.log("art")
    //     // console.log(article);
        
    // }

    const blank ={
        title:"",
        tags:[],
        image:"",
        body:""
    }
   

    const [values,setValues] = useState(article ? article: blank) //either default or other values 
    const handleSubmit = async (e) =>{
        const draft = e.target.dataset.submittype=="draft" //else is post

        if (user===null){
            console.log("Unlogged in users should not be able to post!")
            setError("You are not authorised to post.")
            return;
        } else{

            try{
 
                const url = method=="POST" ? '/articles' : `/articles/${article.id}`
                const res = await customFetch(url,{
                    method:method, //depends on the propcre
                    mode:"cors",
                    headers:{
                        "Authorization": `Bearer ${user.token}`,
                        'Content-Type': 'application/JSON'
                    },
                    body: JSON.stringify({
                        title:values.title,
                        body:values.body,
                        tag:values.tags,
                        image: values.image,
                        is_drafted: draft //depends on the button type
                    })
                })

                const data = await res.json();
                if (res.ok){
                    console.log("Post has been sucessfully POSTED/DRAFT")
                    console.log(data);
                    console.log(method,'oasdada')
                    if (draft!='draft') navigate('/dashboard')
                }
                else{
                    if (data.error){
                        console.log("oi fucker",data.error);
                        setError(data.error) //??
                    }
                    if (data.errors){ //from express-validator. I alrdy have FE validatio in place
                        let combined_errors = ''
                        data.errors.forEach(err=>{
                            combined_errors+='•' +err.msg;
                            combined_errors+='\n'
                        })
                        setError(combined_errors)
                    }
                }

            } catch(err){
                console.log("oi fk")
                console.log(err);
                setError(err.message);
            }

        }
    }

    // const testH = (e)=>{
    //     console.log("HEYYY")
    //     console.log(e.keyCode)
    //     console.log(e.ctrlKey)
    //     if (e.keyCode==192 && e.ctrlKey){
    //         if (view=='edit') setView('preview')
    //         else setView('edit')
    //         console.log("bingus")
    //     }
    // }


    return(
        <div  className="content create-article">

            <div className="view-setter">
                <p 
                    className={view=="edit"?  'selected-view':''}
                    onClick={()=>setView('edit')}>
                    Edit
                </p>
                <p 
                    className={view=="preview" ?'selected-view':''}
                    onClick={()=>setView('preview')}>
                    Preview
                </p>                
            </div>

            {view=="edit"? //we render both first just to see
                <>
                    <Editor
                        setValues={setValues}
                        values={values}
                    />
                    {/* //TODO make this a custom component? */}
                    <div className="submit">
                        <button 
                        onClick = {handleSubmit}
                        data-submittype="draft" 
                        disabled={user==null} 
                        className="button-draft">
                            Draft
                        </button>

                        <button
                        onClick= {handleSubmit}
                         data-submittype="post" 
                        disabled={user==null} 
                        className="button-post">
                            Post
                        </button>
                    </div> 
                    {error && <p className="error-message"> {error}</p>}                   
                </>
   
                :
                <div  className="article-preview">
                <HeaderPreview
                    title={values.title}
                    image={values.image}
                    tags={values.tags}
                />

                <MarkdownPreview
                    body={values.body}
                />
            </div> 


            }
 
        </div>
    )
}

