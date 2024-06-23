import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import logo from "./rice-bowl-icon.svg"
import "./header.scss"

export default function Header(){
    const {logout} = useLogout();
    const handleLogout = ()=>{
        logout(); //i dont know why i do it like this
    }

    const {user} = useAuthContext();
    return (
        <>
            <div id="header">
                <div className="brand">
                    <img src={logo} alt="logo_img" />
                    <Link className="site-brand" to={'/'}>AlgoRice</Link>
                    <p>CMS</p>
                </div>


                <div className="navLinks">
                    {!user?(
                        <>
                            <Link to={'/login'}>Login</Link>
                            <Link to={'/signup'}>Sign up</Link>
                        </>
                    ):(
                        <>
                            <Link onClick={handleLogout} to={'/'}>Logout</Link>
                            <Link to="/">Profile</Link>
                        </>
                    )}
                </div>

            </div>
        </>
    )
}