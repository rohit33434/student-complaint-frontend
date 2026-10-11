import { useState,useEffect } from "react"
import { getAdminStats, getStaffStats } from "../../services/complaintService"
import { useNavigate } from "react-router-dom";
import { createStaff } from "../../services/userService";

export const AdminDashboard=()=>{
    const [adminStats,setAdminStats]=useState({});
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(true);
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
      const [isShowModal,setIsShowModal]=useState(false);
      const [isCreatingStaff,setIsCreatingStaff]=useState(false);
const [fullName,setFullName]=useState("");
const [mail,setmail]=useState("");
const [password,setpassword]=useState("");
const [phoneNumber,setPhoneNumber]=useState("");
  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
    useEffect(()=>{
        const fetchAdminStats=async ()=>{
            try{
 const response=await getAdminStats();
            setAdminStats(response.data);
            setIsLoading(false);
            }catch(error){
                setIsLoading(false);
                if(error.response?.status===401){
                    alert("Please Login");
                     navigate("/login");
                     return;
                }
                if(error.response?.status===403){
                    alert("access Denied");
                     navigate("/login");
                     return;
                }
                const errors=error.response.data;
                const firstError=Object.values(errors)[0];
                alert(firstError);
            }
           
        }
        fetchAdminStats();
    },[])
    const handleCreateStaff=async ()=>{
        try{
            if (!fullName || !mail || !password || !phoneNumber) {
    alert("Please fill all fields");
    return;
}
       setIsCreatingStaff(true);
        const response=await createStaff({fullName,"email":mail,password,phoneNumber});
        setFullName("");
        setmail("");
        setpassword("");
        setPhoneNumber("");
            setIsCreatingStaff(false);
            alert("Staff Created Successfully");
            setIsShowModal(false);
        }
 catch(error){
                setIsCreatingStaff(false);
     if(error.response?.status===401){
                    alert("Please Login");
                     navigate("/login");
                     return;
                }
                if(error.response?.status===403){
                    alert("access Denied");
                     navigate("/login");
                     return;
                }
                const errors=error.response.data;
                const firstError=Object.values(errors)[0];
                alert(firstError);
 }
    }
    if(isLoading){
       return(<p className="text-primary text-center">DashBoard Loading.....</p>);
    }else{
    return(
        
        <div className="container">
<div className="card border-0 shadow text-center">
    <h1 className="text-primary text-center mb-4">Admin dashboard</h1>
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
       <strong> {adminStats.highPriorityComplaints}</strong>
               </div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
             <div className="card text-center border-info bg-info text-light">
              <div className="card-body">
                 <p>InProgress</p>
                  <strong>{adminStats.inProgressComplaints}</strong>
               </div>
                </div>
           </div>
     <div className="col-lg-3 mb-4">
             <div className="card text-center border-warning bg-warning text-light">
              <div className="card-body">
                 <p>Open</p>
                  <strong>{adminStats.openComplaints}</strong>
               </div>
             </div>
          </div>
  <div className="col-lg-3 mb-4">
          <div className="card text-center border-success bg-success text-light">
              <div className="card-body">
                 <p>Resolved</p>
                  <strong>{adminStats.resolvedComplaints}</strong>
            </div>
           </div>
  </div>
          <div className="col-lg-3 mb-4">
              <div className="card text-center border-primary bg-primary text-light">
                 <div className="card-body">
                     <p>Total</p>
                      <strong>{adminStats.totalComplaints}</strong>
               </div>
          </div>
         </div>
 </div>
</div>

<div className="d-flex justify-content-between mt-3">
    <button className="btn btn-danger" onClick={handleLogOut}>Logout</button>
    <button className="btn btn-warning text-light" onClick={()=>navigate("/admin/allStaff")}>Staff Management</button>
    <button className="btn btn-primary" onClick={()=>navigate("/admin/allStudents")}>StudentManagement</button>
    <button className="btn btn-info text-light" onClick={()=>setIsShowModal(prev=>true)} disabled={isShowModal}>Add Staff</button>
    <button className="btn btn-success" onClick={()=>navigate("/admin/allComplaints")}>View All Complaints</button>
</div>
{
(isShowModal)&& 
<div className="modal d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Add Staff</h5>
                        <button className="btn-close" onClick={()=>setIsShowModal(false)}></button>
                         </div>
                         <div className="modal-body">
                                  <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" value={fullName} className="form-control" onChange={(e)=>setFullName(e.target.value)}/>
                                    </div>
                                     <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" value={mail} className="form-control" onChange={(e)=>setmail(e.target.value)}/>
                                    </div>
                                     <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" value={password} className="form-control" onChange={(e)=>setpassword(e.target.value)}/>
                                    </div>
                                     <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input type="tel" value={phoneNumber} className="form-control" onChange={(e)=>setPhoneNumber(e.target.value)}/>
                                    </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={()=>setIsShowModal(false)}>Cancel</button>
                            <button className="btn btn-success" disabled={isCreatingStaff} onClick={handleCreateStaff}>CreateStaff</button>
                            </div>
                    </div>
                </div>
        </div>

    }

        </div>
    )
}
}