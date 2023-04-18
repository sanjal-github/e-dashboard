import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"

const SignUp=()=>
{
    const [name,setName]= useState("");
    const [password,setPassword]= useState("");
    const [email,setEmail]= useState("");
    const navigate = useNavigate();
     
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth)
        {
        navigate("/");
        } 
    })
    const collectData=async()=>
    {
        console.warn(name,email,password);
        let result = await fetch("http://localhost:4011/register",
        {
            method:"post",
            body:JSON.stringify({name,email,password}), 
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log("The Result:")
        console.warn("The Result:"+result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate("/login"); 
            
    }
    return(
        <div className="regis">
            <h1>Register</h1>
            <input className="inputB" value={name}  onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Name" />

            <input className="inputB" value={email}  onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter Email" />

            <input className="inputB" value={password}  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" />
            
            <button onClick={collectData} type="button">Sign Up</button>
        </div>
    )
}
export default SignUp;

//https://www.youtube.com/watch?v=gGjg5SsQSeY