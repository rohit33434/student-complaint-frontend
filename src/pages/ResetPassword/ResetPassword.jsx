import { useState } from "react";
import { forgotPassword, resetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export const ResetPassword=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [otpCode,setOtpCode]=useState("");
    const handleResetPassword=async (e)=>{
        e.preventDefault();
       const data={email,otpCode,newPassword}
       if(confirmPassword !== newPassword){
        alert("Password Mismatch");
        return;
       }
       try{
        const response=await resetPassword(data);
        alert(response.data);
        navigate("/login");
       }catch(error){
        const errorMessage = error?.response?.data
            ? Object.values(error.response.data)[0]
            : (error?.message || "Network error. Please try again.");
        alert(errorMessage);
       }
    }

    const handleResendOtp=async ()=>{
        if(email == "" || email.trim()==""){
            alert("email is required");
            return;
        }
        try{
const response= await forgotPassword({email});
       alert(response.data);
        }
    catch(error){
        const errorMessage = error?.response?.data
            ? Object.values(error.response.data)[0]
            : (error?.message || "Network error. Please try again.");
        alert(errorMessage);
    }
        
    }
return(
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{width:"620px"}}>
        <div className="card border-0 shadow p-4">
            <div className="card-body">
                <h1 className="text-center text-primary mb-3">Smart Campus</h1>
                <p className="text-center text-success fw-bold mb-3">ResetPassword</p>
                <form onSubmit={(e)=>handleResetPassword(e)}>
                    <input type="email" className="form-control mb-3" placeholder="Enter Email..." value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                     <input type="text" className="form-control mb-3" placeholder="Enter Otp..." value={otpCode} onChange={(e)=>setOtpCode(e.target.value)}/>
                    <input type="password" className="form-control mb-3" placeholder="Enter Password..." value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                    <input type="password" className="form-control mb-3" placeholder="ConfirmPassword..." value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <input type="submit" value="Reset Password" className="btn btn-primary w-100 mt-2 mb-3"/>
                </form>
                <button className="btn btn-danger w-100" onClick={handleResendOtp}>resendOtp</button>
            </div>
        </div>
    </div>
)
}