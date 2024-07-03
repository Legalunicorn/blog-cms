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

    console.log('hi');
    console.log(values);

    const handleSubmit = async (e) =>{
        const draft = e.target.dataset.submittype=="draft" //else is post

        if (user===null){
            console.log("Unlogged in users should not be able to post!")
            setError("You are not authorised to post.")
            return;
        } else{

            try{
                //if you want to PATCH, there is a need for the article id 
                //which i can get from the URL
                //but not practical if i want to use slugify for my urls

                // i should pass the article id in the props
                // if the method = PATCH, the id is inside the props

                // if the method = POST , and article = blank, there is no id but we wont check for it 
                console.log('hi',values);

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
                    console.log("Post has been sucessfully POSTED")
                    console.log(data);
                    navigate('/dashboard')
                }
                else{
                    if (data.error){
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
                console.log(err);
                setError(err.message);
            }

        }
    }


    return(
        <div className="content">

            <div className="view-setter">
                <p 
                    className={view=="edit" && 'selected-view'}
                    onClick={()=>setView('edit')}>
                    Edit
                </p>
                <p 
                    className={view=="preview" && 'selected-view'}
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
                <div className="article-preview">
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

/*
create article


--new article--

POST
    - send a post request to create the article
    - is_drafted: false

DRAFT
    - send a post request to create the article
    - is_drafted: true



-- edit article--

POST
    - send a patch request to make changes to the article
    - set is_drafted: false (if it was already false then nothing will change)

DRAFT
    - send a patch reqeust to make changes to the article
    - set is_drafted: true

*/