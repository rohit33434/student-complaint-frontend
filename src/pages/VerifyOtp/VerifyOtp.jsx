import { useState } from "react";
import { verifyOtp } from "../../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

export const VerifyOtp=()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");
    const [otpCode, setOtpCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleVerifyOtp = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        if(!email.trim()){
            setError("Please enter your email");
            setLoading(false);
            return;
        }
        if(!otpCode.trim()){
            setError("Please enter the OTP");
            setLoading(false);
            return;
        }
        if(otpCode.length !== 6){
            setError("OTP must be 6 digits");
            setLoading(false);
            return;
        }
        
        const data = {email, otpCode};
        try{
            const response = await verifyOtp(data);
            setLoading(false);
            alert(response.data || "Email verified successfully! You can now login.");
            navigate("/login");
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
                    setError(firstError || "OTP verification failed. Please try again.");
                } else {
                    setError("OTP verification failed. Please try again.");
                }
            } else if(error.message){
                setError(error.message);
            } else {
                setError("Verification failed. Please check your connection and try again.");
            }
        }
    }
    
    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card border-0 shadow p-4" style={{width:"420px"}}>
                <div className="card-body">
                    <h1 className="text-primary text-center mb-2">Smart Campus</h1>
                    <p className="text-success text-center mb-3">Verify Your Account</p>
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError("")}></button>
                        </div>
                    )}
                    <form onSubmit={handleVerifyOtp}>
                        <input 
                            type="email" 
                            className="form-control mb-3" 
                            placeholder="Enter Email" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} 
                            required
                        />
                        <input 
                            type="text" 
                            className="form-control mb-3" 
                            placeholder="Enter 6-digit OTP" 
                            value={otpCode} 
                            onChange={(e)=>setOtpCode(e.target.value)} 
                            maxLength="6"
                            required
                        />
                        <button 
                            type="submit" 
                            className="btn btn-warning mt-3 w-100"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
