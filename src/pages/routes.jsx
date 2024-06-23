//Literally copy past from cliemt cms


//layout comonents




//pages 


//context


//react router
import {
    createBrowserRouter,
    Outlet,
    Nagivate
} from 'react-router-dom'

//Layout for all pages

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
                path:"login",
                element:<Login/>
            }
        ]
    }
])