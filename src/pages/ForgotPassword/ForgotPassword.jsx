import { useState } from "react";
import { forgotPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export const Forgotpassword=()=>{
    const [email,setEmail]=useState("");
    const navigate=useNavigate();
    const handleForgotPassword=async (e)=>{
            e.preventDefault();
            const data={email};
            try{
                   const response=await forgotPassword(data);
                   alert(response.data);
                   navigate("/resetPassword");
            }catch(error){
                const errors=error.response.data;
                const firstError=Object.values(errors)[0];
                  alert(firstError);
            }
    }
    return(
        <div className="container d-flex justify-content-center align-items-center vh-100" >
            <div className="card border-0 shadow" style={{width:"420px"}}>
                <div className="card-body">
                    <h1 className="text-primary text-center mb-3">Smart Campus</h1>
                    <p className="text-danger text-center mb-3 fw-bold">forgotPassword</p>
                    <form onSubmit={(e)=>handleForgotPassword(e)}>
                        <input type="email" placeholder="Enter Email" className="form-control mb-3" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="submit" value="ForgotPassword" className="btn btn-success w-100 mb-3 mt-2"/>
                    </form>
                </div>
            </div>
        </div>
    )
}