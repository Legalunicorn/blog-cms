//Literally copy past from cliemt cms


//layout comonents
import Header from '../../components/header/Header'
import Footer from "../../components/footer/Footer"


//pages 
import Home from '../home/Home'
import Dashboard from '../dashboard/Dashboard'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import CreateArticle from '../createArticle/CreateArticle'
import EditArticle from '../EditArticle/EditArticle'
import Error404 from '../Error/Error404'

//Protected Route
import { ProtectedRoute } from './ProtectedRoute'


//react router
import {
    createBrowserRouter,
    Outlet
} from 'react-router-dom'


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
                element:
                    (<ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>)
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
                element:<CreateArticle method="POST" /> //method = PATH for the edit article
            },
            {
                path:"/articles/:id",
                element: (
                    <ProtectedRoute>
                        <EditArticle/>
                    </ProtectedRoute>
                )
            }
        ],
        errorElement:
        <Layout>
            <Error404/>
        </Layout>,
    }
])

function Layout({children}){
    return (
        <>
            <Header/>
            <div id="main">
                <Outlet/>
                {children}
            </div>
            <Footer/>
        </>
    )
}

export default router