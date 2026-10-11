import {Outlet,Navigate } from "react-router-dom"

export const ProtectedRoute=()=>{
    if(localStorage.getItem("token")){
         return <Outlet></Outlet>
          
}else{
    return <Navigate to="/login"></Navigate>   
}
}