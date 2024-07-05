import { Form, useNavigate, useSearchParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState,useEffect } from "react"
import  "./auth.scss"
import { customFetch } from "../../utils/customFetch"
import GoogleButton from "../../components/buttons/GoogleButton"


export default function Login(){

    const {user,dispatch} = useAuthContext();
    const navigate = useNavigate();
    const [error,setError] = useState();
    const [searchParams,setSearchParams] = useSearchParams();


    useEffect(()=>{

        console.log("LOGIN PAGE: USER IS: ",user)
        const token = searchParams.get('token');
        const id = searchParams.get('id');
        if (token!==null && id!==null){
            dispatch({type:"LOGIN",payload:{token,id}})
            localStorage.setItem('user',JSON.stringify({token,id}));
            navigate('/dashboard')
            // setSearchParams(); //emmpy the search params 
        }
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await customFetch('/auth/email/login/?host=CMS',{
                method:"POST",
                mode:"cors",
                body: JSON.stringify({
                    email:e.target.email.value,
                    password: e.target.password.value
                }),
                headers:{
                    'Content-Type':'application/json',
                    // 'service': 'CMS' YOU FUCKING retard this is for email not google
                }

            })

            const json = await response.json()
            if (response.ok){
                dispatch({type:"LOGIN",payload:{token:json,id:json.id}})
                localStorage.setItem('user',JSON.stringify({token:json.token,id:json.id}))
                navigate("/");
            }
            else{
                console.log("///")
                console.log(json)
                if (json.errors){ //validation err?
                    json.errors.forEach(err=>{
                        console.log(err);
                    })
                }
                if (json.error) setError(json.error)
            }
        } catch(err){
            console.log(err)
        }
    }



    return (
        <div className="login-main">
            <div className="login-form">
                <p className="site-brand">AlgoRice</p>
                <Form onSubmit={handleSubmit} className="email-form">
                    <input required type="email" name="email" placeholder="Email"/>
                    <input required type="password" name="password" placeholder="Password"/>
                    {error && 
                    <p className = "error-message">
                        {error}
                    </p>
                    }
                    <button className="log-in form-button" type="submit">
                        Login
                    </button>

                </Form>

                <div className="other-option">
                    <p className="faint p">Or login with</p>
                    <GoogleButton/>
                </div>
            </div>
        </div>
    )
}