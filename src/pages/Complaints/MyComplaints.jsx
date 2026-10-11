import { useState,useEffect } from "react"
import { getComplaintById, getMyComplaints } from "../../services/complaintService";
import { useNavigate } from "react-router-dom";

export const MyComplaints=()=>{
    const [complaints,setComplaints]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchComplaints=async()=>{
            try{
 const response =await getMyComplaints(currentPage);
 setComplaints(response.data.content);
 setTotalPages(response.data.totalPages);
            }catch(error){
                if(error.response?.status===403){
                    alert("Access Denied");
                    navigate("/login")
                    return;
                }
                if(error.response?.status===401){
                    alert("Login Required");
                    navigate("/login")
                    return;
                }
                const errors = error.response.data;
              
const firstError = Object.values(errors)[0];
alert(firstError);
                }

        }
        fetchComplaints();
    },[currentPage]);
// useEffect(()=>{
//     console.log(complaints)
// },[complaints])
    return(
        <div className="container mt-5">
   <h1 className="text-center text-primary mb-4">My Complaints</h1>
   {
    complaints.length=== 0 ? <p className="text-center text-muted">No Complaints Found</p>
    :
    <div className="row">
        {
    complaints.map((complaint)=>{
        const statusColor=complaint.complaintStatus==="OPEN" 
        ? "bg-success"
        :complaint.complaintStatus==="IN_PROGRESS"
        ? "bg-primary"
        :complaint.complaintStatus==="REJECTED"
        ?"bg-danger"
        :"bg-secondary";
        const priorityColor=complaint.complaintPriority==="LOW"
        ? "bg-success"
        :complaint.complaintPriority==="MEDIUM"
        ?"bg-warning text-dark"
        :"bg-danger";
    
    return(
        
        <div className="col-md-6 col-lg-4 mb-4" key={complaint.id}>
            <div className="card shadow border-0 h-100">
                <div className="card-body d-flex flex-column">
            <h4 className="card-title text-primary text-center"> {complaint.title}</h4>
              <p className="text-primary"><strong className="text-success me-2">Student Name :</strong>{complaint.studentName}</p>
            <p className="text-primary"><strong className="text-success me-2">Assigned Staff :</strong>{complaint.assignedStaffName ?? "Not Assigned"}</p>
            <p className="text-primary"><strong className="text-success me-2">Description :</strong>{complaint.description}</p>
          <p><strong className="text-success me-2">Complaint Status :</strong><span  className={`badge ms-2 ${statusColor}`}>{complaint.complaintStatus}</span></p>    
         <p><strong className="text-success me-2">ComplaintPriority :</strong><span  className={`badge ms-2 ${priorityColor}`}>{complaint.complaintPriority}</span></p>
       <p className="text-primary mt-auto"><strong className="text-success me-2">CreatedAt :</strong>{new Date(complaint.createdAt).toLocaleString()}</p>
       <button className="btn btn-warning text-dark w-50 align-self-center" onClick={()=>navigate(`/complaint/${complaint.id}`)}>View</button>
        </div>
        </div>
        </div>
    )
   }) }</div>
   } 
  
   <div className="d-flex justify-content-between mt-4">
    <button className="btn btn-primary" disabled={currentPage===0} onClick={()=>setCurrentPage(prev=>prev-1)}>
        Previous
    </button>
    <span className="align-self-center">Page {currentPage+1} of {totalPages}</span>
    <button className="btn btn-primary" disabled={currentPage===totalPages-1} onClick={()=>setCurrentPage(prev=>prev+1)}>
        next
    </button>

   </div>
   </div>
     
    )
}