import api from '../api/axios'
const login=(loginData)=>{
 return api.post("/users/login",loginData); 
}
const register=(registeredData)=>{
return api.post("/users/register",registeredData);
}
const verifyOtp=(verifyOtpData)=>{
    return api.post("/users/verifyOtp",verifyOtpData);
}
const forgotPassword=(forgotPasswordData)=>{
    return api.post("/users/forgotPassword",forgotPasswordData);
}
const resetPassword=(resetPasswordData)=>{
    return api.post("/users/resetPassword",resetPasswordData);
}
export  {login,register,verifyOtp,forgotPassword,resetPassword};