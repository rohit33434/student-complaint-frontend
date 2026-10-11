import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {register} from "../../services/authService"
export const Register=()=>{
    const navigate=useNavigate();
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    
    const handleRegister=async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        
        if(!fullName.trim()){
            setError("Please enter your full name");
            setLoading(false);
            return;
        }
        if(!email.trim()){
            setError("Please enter your email");
            setLoading(false);
            return;
        }
        if(!phoneNumber.trim()){
            setError("Please enter your phone number");
            setLoading(false);
            return;
        }
        if(password.length < 6){
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }
        if(password!==confirmPassword){
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        
        const data={fullName,email,password,phoneNumber};
        try{
            const response=await register(data);
            setLoading(false);
            alert(response.data || "Registration successful! Check your email for OTP");
            navigate("/verifyOtp", { state: { email: email } });
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
                    setError(firstError || "Registration failed. Please try again.");
                } else {
                    setError("Registration failed. Please try again.");
                }
            } else if(error.message){
                setError(error.message);
            } else {
                setError("Registration failed. Please check your connection and try again.");
            }
        }
    }
    
    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card border-0 shadow p-4" style={{width:"420px"}}>
            <div className="card-body">
                <h1 className="text-center text-primary">Smart Campus</h1>
                <p className="text-center text-success">Create your Account</p>
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" onClick={() => setError("")}></button>
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Enter Name.." className="form-control mb-3" value={fullName} onChange={(e)=>setFullName(e.target.value)} required></input>
                    <input type="email" placeholder="Enter Email.." className="form-control mb-3" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                    <input type="password" placeholder="Enter Password.." className="form-control mb-3" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                    <input type="password" placeholder="Enter Confirm Password" className="form-control mb-3" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required></input>
                    <input type="tel" placeholder="Enter Phone Number.." className="form-control mb-3" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} required></input>    
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>                      
                </form>
                <p className="text-center text-success mt-3">Already have an Account ? {" "}
                    <Link to='/login'>Login</Link>
                </p>
            </div>
          </div>
        </div>
    )
}
