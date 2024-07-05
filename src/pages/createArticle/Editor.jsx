/**
 * Show two views
 * 1. title, tags, image url
 * 2. Writing view 
 */
import { useState } from "react";
import ("./createArticle.scss")



export default function Editor({
    values,
    setValues
}){

    const [view,setView] = useState('body') //meta OR body
    const bodyKeydown = (e)=>{
        //indent in textarea instead of tabbing to next field
        if  (e.keyCode===9){ //tab keycode 
            e.preventDefault();

            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;
            let val = e.target.value;

            
            e.target.value = val.substring(0,start) + '\t' + val.substring(end);
            e.target.selectionEnd = start+1;


            setValues({...values,body:e.target.value})
 
        }

        if (e.keyCode==13 && e.shiftKey){
            e.preventDefault();

            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;
            let val = e.target.value;

            
            e.target.value = val.substring(0,start) + '&nbsp;\n' + val.substring(end);
            e.target.selectionEnd = start+7;
            setValues({...values,body:e.target.value})
            console.log(e.target.value)
        }
    }

    const tagKeydown = (e)=>{
        if (e.keyCode==13){
            if (values.tags.length<4){
                let updated = values.tags;
                updated.push(e.target.value)
                setValues({...values,tags:updated})
            }
            e.target.value="";
        }
    }

    const deleteTag = (e)=>{
        console.log(e.target.dataset.name);
        console.log(values.tags)
        const removeList = values.tags.filter(name=>name!==e.target.dataset.name)
        setValues({...values,tags:removeList})
    }

    const onChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value})
    }
    
    




    return (
        <div className="editor">

            <div className="editor-view">

                <button
                    onClick={()=>setView('meta')}
                    className={view=='meta'?'editor-selected':''}
                >
                    Headers
                </button>
                <button
                    onClick={()=>setView('body')}
                    className={view=='body' ? 'editor-selected':''}
                >
                    Body
                </button>                
            </div>

            {view=='meta'?

                <div className="create-form">
                    <label htmlFor="title">Title:</label>
                    <input
                        onChange={onChange}
                        required
                        type="text"
                        name="title"
                        placeholder="Write an interesting title"
                        value={values.title}
                    />
                    <label htmlFor ="image">Image thumbnail URL:</label>
                    <input  
                        onChange={onChange}
                        required
                        name="image"
                        placeholder="Paste url of image thumbnail here"
                        value={values.image}
                    />  
                    <label htmlFor ="image">Tags (Max 4)</label> 
                    <input  
                        required
                        name="tags"
                        placeholder="Press enter to add a tag"
                        onKeyDown={tagKeydown}
                    /> 

                    <div className="editable-tag-bag">
                        {values.tags.map(name=>(
                            <div className="editable-tag">
                                <p className="edit-tag">{name}</p>
                                <span data-name={name} onClick={deleteTag} className="material-symbols-outlined">
                                close
                                </span>
                            </div>
   

                        ))}
                    </div>

                                            
                </div>
            : //view is set to "body"
                <div className="textarea-contain">
                    <textarea
                        onChange={onChange}
                        required
                        name="body"
                        placeholder
="Text body goes here.
you can use markdown as such

# this is h1 
## this is h2
### this is h3
#### this is h4

`this is a code snippet`

```jsx
This is a block of multiline code,
with syntaxhighlighting for the provided language (ie jsx)
```

**bold** or __bold__
*italic* or _italic_


--- (horizontal line)

> For a blockquite

- bullet list point 1 
- bullit list poin 2


this is also h1
=====

this is also h2
-----

[Link](https://www.website.com)

                        
"
                        tabIndex={1}
                        onKeyDown={bodyKeydown}
                        value={values.body}
                    />
                </div>
            }
        </div>

    )

}