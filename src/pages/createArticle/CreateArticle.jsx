import { useState } from "react"

import "./createArticle.scss"
import MarkdownPreview  from "./MarkdownPreview";
import HeaderPreview from "./HeaderPreview";


//TODO markdwwn editor


export default function CreateArticle(){

    const [view,setView] = useState('edit')//edit OR preview
    const [body,setBody] = useState(''); //maybe use a state to handle the changes of all form data

    const [values,setValues] = useState({
        title:"",
        tags:['tag 1'],
        image:"",
        body: ""
    })

    const onChange = (e) =>{
        setValues({...values, [e.target.name]:e.target.value})
    }


    return(
        <div className="content">

            <div className="view-setter">
                <span 
                    className={view=="edit" && 'selected-view'}
                    onClick={()=>setView('edit')}>
                    Edit
                </span>
                <span 
                    className={view=="edit" && 'selected-view'}
                    onClick={()=>setView('preview')}>
                    Preview
                </span>                
            </div>

            {/* {view=="edit"? //we render both first just to see
                <>
                </>
                :
                <>
                </>
            } */}

            <div className="create-form">
                <input
                    onChange={onChange}
                    required
                    type="text"
                    name="title"
                    placeholder="Title"
                />
                <textarea
                    onChange={onChange}
                    required
                    name="body"
                    placeholder="Text body goes here.."
                /> 
                <input  
                    onChange={onChange}
                    required
                    name="image"
                    placeholder="Paste url of image thumbnail here"
                />             
            </div>
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
        </div>
    )
}

/*
Edit/Preview swtich on top

Edit-
Title: 
Tags: (max 6)
Content



DRAFT/POST
*/