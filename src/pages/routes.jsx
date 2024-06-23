//Literally copy past from cliemt cms


//layout comonents




//pages 
import Home from './home/Home'
import Dashboard from './dashboard/Dashboard'
import Login from './login/Login'
import Signup from './signup/Signup'
import CreateArticle from './createArticle/CreateArticle'

//context


//react router
import {
    createBrowserRouter,
    Outlet,
    Nagivate
} from 'react-router-dom'

//Layout for all pages



const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/dashboard",
                element: <Dashboard/>
            },
            {
                path:"/signup",
                element:<Signup/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/create",
                element:<CreateArticle/>
            }
        ]
    }
])

function Layout(){
    return (
        <>
            <Header/>
            <div id="main">
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default router