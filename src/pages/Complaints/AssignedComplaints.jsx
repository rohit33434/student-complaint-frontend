import { useEffect, useState } from "react"
import { getComplaintAssignedToMe } from "../../services/complaintService"
import { useNavigate } from "react-router-dom";

export const AssignedComplaints=()=>{
    const [currentPage,setCurrentPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [assignedComplaints,setAssignedComplaints]=useState([]);
    
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(true);
    useEffect(
        ()=>{
            const fetchAssignedComplaints=async()=>{
                try{
  const response= await getComplaintAssignedToMe(currentPage);
                setTotalPages(response.data.totalPages);
                setAssignedComplaints(response.data.content);
                setIsLoading(false);
                }catch(error){
                    if(error.response?.status===401){
                        alert("Please Login");
                        navigate("/login");
                        return;
                    }
                    if(error.response?.status===403){
                        alert("Access Denied");
                        navigate("/login");
                        return;
                    }
                    const errors=error.response.data;
                    const firstError=Object.values(errors)[0];
                    alert(firstError);
                }
              
            }
            fetchAssignedComplaints();
        },[currentPage]
    );
    useEffect(()=>{console.log(assignedComplaints)},[assignedComplaints]);
    return(
        <div className="container">
              <h1 className="text-center text-primary">SmartCampus</h1>
              <div className="row mt-3">
                     {isLoading===true
                      ? <p className="text-primary text-center">Loading....</p>
                    :
         assignedComplaints.map((complaint)=>{
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
                        <div className="col-lg-6 col-md-4 mb-3" key={complaint.id}  onClick={()=>navigate(`/staff/assignedComplaint/${complaint.id}`)} style={{cursor:"pointer"}}>
                  <div className="card">
                     <div className="card-body">
                        <p className="text-danger"><strong className="text-primary">Title : </strong>{complaint.title}</p>
                     <p className="text-danger"><strong className="text-primary">Description : </strong>{complaint.description}</p>
                     <p className="text-danger"><strong className="text-primary">StudentName : </strong>{complaint.studentName}</p>
                      <p className="text-danger"><strong className="text-primary">AssignedStaff : </strong>{complaint.assignedStaffName}</p>
                      <p className="text-danger"><strong className="text-primary">ComplaintPriority : </strong><span className={`badge ${priorityColor}`}>{complaint.complaintPriority}</span></p>
                     <p className="text-danger"><strong className="text-primary">ComplaintStatus : </strong><span className={`badge ${statusColor}`}>{complaint.complaintStatus}</span></p>
                      <p className="text-danger"><strong className="text-primary">creatdedAt : </strong>{new Date(complaint.createdAt).toLocaleString()}</p>

                </div>
            </div>
            </div>
                    )
                })
 
              }
                      
              </div>
              
       
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary" onClick={()=>setCurrentPage(prev=>prev-1)} disabled={currentPage===0}>Prev</button>
                <p className="text-muted">Page {currentPage+1} of {totalPages}</p>
                <button className="btn btn-primary" onClick={()=>setCurrentPage(prev=>prev+1)} disabled={currentPage===totalPages-1}>Next</button>
              </div>
        </div>
    )
}