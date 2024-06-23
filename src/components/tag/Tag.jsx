import "./tag.scss"
import { Link } from "react-router-dom"


export default function Tag({tag}){
    return (
        <Link to={`/articles/tags/${tag._id}`}>
            <p className="tag">{tag.name}</p>
        </Link>
    )
}