import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {login} from "../../services/authService";

export const Login=()=>{
    const [email,setEmail]=useState("");
    const navigate=useNavigate();
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    
    const handleLogin=async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        
        if(!email.trim()){
            setError("Please enter your email");
            setLoading(false);
            return;
        }
        if(!password.trim()){
            setError("Please enter your password");
            setLoading(false);
            return;
        }
        
        try{
            const response=await login({email,password});
            const data=response.data;
            localStorage.setItem("email",data.email);
            localStorage.setItem("token",data.token);
            localStorage.setItem("role",data.role);
            setLoading(false);
            alert(data.message || "Login successful!");
            
            if(data.role==="ROLE_STAFF"){
                navigate("/staff/dashboard");
                return;
            }
            if(data.role==="ROLE_STUDENT"){
                navigate("/dashboard");
                return;
            }
            if(data.role==="ROLE_ADMIN"){
                navigate("/admin/dashboard");
                return;
            }
        }catch(error){
            setLoading(false);
            if(error.response?.data){
                const errorData = error.response.data;
                if(typeof errorData === 'string'){
                    setError(errorData);
                } else if(errorData.message){
                    setError(errorData.message);
                } else if(typeof errorData === 'object'){
                    const firstError = Object.values(errorData)[0];
                    setError(firstError || "Login failed. Please try again.");
                } else {
                    setError("Login failed. Please try again.");
                }
            } else if(error.message){
                setError(error.message);
            } else {
                setError("Login failed. Please check your connection.");
            }
        }
    }

    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card border-0 shadow p-4" style={{width:'420px'}}>
                <div className="card-body">
                    <h1 className="text-primary text-center">SmartCampus</h1>
                    <p className="text-success text-center">Login to continue</p>
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError("")}></button>
                        </div>
                    )}
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            className="form-control mb-3" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            className="form-control mb-3" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <Link className="text-left mt-3 d-block" to='/forgotPassword'>Forgot Password?</Link>
                    <p className="text-center mt-3">Don't have an account ? {' '}
                        <Link to='/register'>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
