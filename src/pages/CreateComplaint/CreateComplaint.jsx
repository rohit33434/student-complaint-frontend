import { useState } from "react"
import { createComplaint } from "../../services/complaintService";
import {  useNavigate } from "react-router-dom";

export const CreateComplaint=()=>{
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const handleSubmitComplaint=async (e)=>{
          e.preventDefault();
          const complaint={title,description};
          try{
             const response=await createComplaint(complaint);
            setTitle("");;
            setDescription("");
             alert("Complaint Created")
            navigate("/myComplaints");
          }catch(error){
            if(error.response?.status==401){
                alert("Login Please");
                return;
            }
            if(error.response?.status==403){
                alert("Access Denied");
                return;
            }
            const errors=error.response.data;
            const firstError=Object.values(errors)[0];
            alert(firstError);
          }
    }
return(
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card border-0 shadow p-4">
            <div className="card-body">
                <h1 className="text-primary text-center mb-3">Smart Campus</h1>
                <h4 className="text-center text-danger mb-3">Complaint Form</h4>
                <form onSubmit={(e)=>handleSubmitComplaint(e)}>
                    <input type="text" className="form-control mb-3" placeholder="title.." value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                    <textarea  className="form-control mb-3" placeholder="description.." value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    <input type="submit" value="SubmitComplaint" className="btn btn-success w-100"/>
                </form>
            </div>
        </div>
    </div>
)
}
