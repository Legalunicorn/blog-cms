import { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboardOptions.scss"
import { useNavigate } from "react-router-dom";

export default function DashboardOptions({
    isOpen,
    setIsOpen,
    id,
    handleDelete,
    list
}){
    const navigate = useNavigate();

    // const [isOpen,setIsOpen] = useState(false);

    const handleClick = (e)=>{
        e.stopPropagation(); //click on card will automatically close the edit
        // we dont want to trigger that or we cant open the dropdown at all
        setIsOpen(!isOpen);
    }



    return (
    <div className="dropdown">
        
        <span className=" dropdown-button material-symbols-outlined"
            onClick={handleClick}
        >
            more_vert
        </span>
        {isOpen &&
        <div className="dropdown-content">
            <p 
            onClick={handleDelete} 
            className="danger"
            data-id={id}
            data-list={list}

            >Delete</p>
            <p onClick={()=>navigate(`/articles/${id}`)}>Edit</p>
        </div>
        }
    </div>
    )

}