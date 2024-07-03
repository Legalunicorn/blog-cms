import {format} from 'date-fns'
import "./headerPreview.scss"
// import { useAuthContext } from '../../hooks/useAuthContext';


export default function HeaderPreview({
    title,
    image,
    tags,
    
}){

    const formattedDate = format(new Date(), 'dd MMM yyyy');


    return(
        <div className="preview-header">
            <p className="preview-title">{title}</p>

            <div className="preview-tags">
                {tags.map(name=>(
                    <p className="tag-preview">{name}</p>
                ))}
            </div>

            <div className="preview-meta">
                <p>Your name •</p>
                <p>{formattedDate}</p>
            </div>
            <div className="preview-likes">
                <span className="material-symbols-outlined">favorite</span>
                <span>1</span>
            </div>
            <div className="preview-image">
                <img src={image} alt="" />
            </div>

        </div>
    )
}