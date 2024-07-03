
import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"
import Tag from "../../tag/Tag"
import "./articleCardDashboard.scss"
import DashboardOptions from "./DashboardOptions"
import { useState } from "react"


export default function ArticleCardDashboard({
    article,
    handleDelete,
    list
}){


    const createdAgo = `${formatDistanceToNow(article.createdAt)} ago`

    const [isOpen,setIsOpen] = useState(false);

    const closeEdit = () =>{
        setIsOpen(false);
    }

    return (
        <div onClick={closeEdit} className="article-card">

            <div className="article-content">
                <Link className="article-title" to={''}>
                        {article.title}
                </Link>
                <div className="card-body">
                    <div className="article-meta">
                        <p>{createdAgo} </p>
                    </div>
                    <div className="tag-list-card">
                        {article.tags.map(tag=>{
                            <Tag
                                key={tag._id}
                                tag={tag}
                            />

                        })}
                    </div>

                    <div className="article-likes">
                        <span className="material-symbols-outlined">favorite</span>
                        <span>{article.likes_count}</span>
                    </div>
                </div>

            </div>
            <img src={article.image} alt="article_image" className="article-image" />
            <div  className="article-card-menu">
                <DashboardOptions
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    id={article._id}
                    handleDelete={handleDelete}
                    list={list}
                />
            </div>
        </div>
    )


}