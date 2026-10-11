import { useState,useEffect } from "react"
import { getStaffStats } from "../../services/complaintService"
import { useNavigate } from "react-router-dom";

export const StaffDashBoard=()=>{
    const [staffStats,setStaffStats]=useState({});
    const navigate=useNavigate();
    
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");


  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
    useEffect(()=>{
        const fetchStaffStats=async ()=>{
            try{
 const response=await getStaffStats();
            setStaffStats(response.data);
            }catch(error){
                if(error.response?.status===401){
                    alert("Please Login");
                     navigate("/login");
                     return;
                }else if(error.response?.status===403){
                    alert("access denied");
                    navigate("/login");
                    return;
                }
                const errors=error.response.data;
                const firstError=Object.values(errors)[0];
                alert(firstError);
            }
           
        }
        fetchStaffStats();
    },[])
    useEffect(()=>{console.log(staffStats)},[staffStats])
    return(
        <div className="container">
<div className="card border-0 shadow text-center">
    <h1 className="text-primary text-center mb-4">staff dashboard</h1>
     <h5 className="text-success mb-2 text-center">Welcome 👋</h5>
    <div className="card border-0 shadow" >
          <p className="mb-2 text-danger">
            <strong  className="text-primary">Email:</strong> {email}
          </p>
          <p className="mb-2 text-danger">
            <strong className="text-primary">Role:</strong> {role}
          </p>
    </div>
          <hr />
    <div className="row mt-3">
          <div className="col-lg-3 mb-4">
             <div className="card text-center border-danger bg-danger text-light">
               <div className="card-body">
                <p>HighPriority</p>
       <strong> {staffStats.highPriorityComplaints}</strong>
               </div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
             <div className="card text-center border-info bg-info text-light">
              <div className="card-body">
                 <p>InProgress</p>
                  <strong>{staffStats.inProgressComplaints}</strong>
               </div>
                </div>
           </div>
     <div className="col-lg-3 mb-4">
             <div className="card text-center border-warning bg-warning text-light">
              <div className="card-body">
                 <p>Open</p>
                  <strong>{staffStats.openComplaints}</strong>
               </div>
             </div>
          </div>
  <div className="col-lg-3 mb-4">
          <div className="card text-center border-success bg-success text-light">
              <div className="card-body">
                 <p>Resolved</p>
                  <strong>{staffStats.resolvedComplaints}</strong>
            </div>
           </div>
  </div>
          <div className="col-lg-3 mb-4">
              <div className="card text-center border-primary bg-primary text-light">
                 <div className="card-body">
                     <p>Total Assigned</p>
                      <strong>{staffStats.totalAssignedComplaints}</strong>
               </div>
          </div>
         </div>
 </div>
</div>
<div className="d-flex justify-content-between mt-3">
    <button className="btn btn-danger" onClick={handleLogOut}>Logout</button>
    <button className="btn btn-warning text-light" onClick={()=>navigate("/staff/assignedComplaints")}>View Assigned Complaints</button>
</div>
        </div>
    )
}