import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:8080/api",
});
api.interceptors.request.use((config)=>{
const token=localStorage.getItem("token");
 const publicUrls = [
        "/users/login",
        "/users/register",
        "/users/forgot-password",
        "/users/reset-password",
        "/users/verify-otp"
    ];
const isPublic=publicUrls.some(url=>config.url.includes(url))
if(token && !isPublic){
    config.headers.Authorization="Bearer "+token;
}
return config;
})
export  default api;