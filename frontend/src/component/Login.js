import React ,{useEffect} from "react"
import { useNavigate } from "react-router-dom";
const Login=()=>
{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    // useEffect(()=>
    // {
    //     const auth = localStorage.getItem("user")
    //     if(auth)
    //     {
    //         navigate("/")
    //     }

    // })
    const handleLogin=async()=>
    {
        try
        {
        console.log(email,password);
        let result = await fetch("http://localhost:4011/login",
        {
            method:"post",
            body:JSON.stringify({email,password}),
            headers:
            {
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log("The Result:")
        console.log(result);
        console.log("The email is")
        console.log(result.name)
            if(result.auth)
            {
                console.warn("hurray")
                console.log("login success")
                localStorage.setItem("user",JSON.stringify(result.user));
                localStorage.setItem("token",JSON.stringify(result.auth));
                navigate("/")  // move to the home page 
            } 
            else
            {
                console.warn("front end log denies")
            }
        }catch(error)
        {
            console.warn(error);
        } 
            
    }
    return(
        <div className="login">
            <input className="inputB" value={email} onChange={(e)=>setEmail(e.target.value)} 
            type="text" placeholder="Enter Mail" />
            <input className="inputB" value={password} onChange={(e)=>setPassword(e.target.value)} 
            type="password" placeholder="Enter password" />
            <button  onClick={handleLogin} type="button">Sign Up</button>

            
        </div>

    )
}

export default Login;

