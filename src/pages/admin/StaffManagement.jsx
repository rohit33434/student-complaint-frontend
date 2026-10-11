import { useEffect, useState } from "react"
import { blockUser, getStaff } from "../../services/userService"
import { useNavigate } from "react-router-dom";

export const StaffManagement=()=>{
    const [currentPage,setCurrentPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const navigate=useNavigate();
    const [staffList,setStaffList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const handleBlockUser=async (e)=>{
        try{
const response=await blockUser(e.id,{"blocked":!(e.blocked)});
setStaffList(staffList.map((staff)=>{return (staff.id===e.id ? {...staff,"blocked":response.data.blocked}: staff)}));
        }catch(error){
            if(error.response?.status===401){
                    alert("Please Login")
                    navigate("/login");
                    return;
                }
                if(error.response?.status===403){
                   alert("Access Denied")
                    navigate("/login");
                    return;
                }
                const errors=error.response.data;
                const firstError=Object.values(errors)[0];
                alert(firstError);
        }

    }
    useEffect(()=>{
        const fetchStaff=async ()=>{
            try{
            const response=await getStaff(currentPage);
           setStaffList(response.data.content);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
            }catch(error){
                setIsLoading(false);
                if(error.response?.status===401){
                    alert("Please Login")
                    navigate("/login");
                    return;
                }
                if(error.response?.status===403){
                   alert("Access Denied")
                    navigate("/login");
                    return;
                }
                const errors=error.response.data;
                const firstError=Object.values(errors)[0];
                alert(firstError);
            }
        }
        fetchStaff();
    },[currentPage])
    useEffect(()=>{
          console.log(staffList);
    },[staffList])
    if(isLoading){
      return(<p className="text-center text-primary">Loading....</p>);
    }
        if(staffList.length===0){
            return(<p className="text-primary text-center">No Staff Found</p>)
        }else{
          return(
            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th className="text-primary text-center">ID</th>
                            <th className="text-primary text-center">FullName</th>
                            <th className="text-primary text-center">Email</th>
                            <th className="text-primary text-center">Role</th>
                            <th className="text-primary text-center">Blocked</th>
                            <th className="text-primary text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                staffList.map((staff)=>{
                                    return(
                                      <tr key={staff.id}>
                                        <td>{staff.id}</td>
                                        <td>{staff.fullName}</td>
                                        <td>{staff.email}</td>
                                        <td>{staff.role}</td>
                                        <td>{staff.blocked ? <span className="badge bg-danger">Blocked</span> : <span className="badge bg-success">Active</span>}</td>
                                        <td>{staff.blocked ? <button className="btn btn-success" onClick={()=>handleBlockUser(staff)}>UnBlock</button> : <button className="btn btn-danger" onClick={()=>handleBlockUser(staff)}>Block</button>}</td>
                                    </tr>
                                    )
                                    
                                })
                            }
                    </tbody>
                </table>
                <div className="d-flex justify-content-between mt-3">
                           <button className="btn btn-danger" disabled={currentPage===0} onClick={()=>setCurrentPage(prev=>prev-1)}>Prev</button>
                           <p>Page {currentPage+1} of {totalPages}</p>
                           <button className="btn btn-danger" disabled={currentPage===totalPages-1} onClick={()=>setCurrentPage(prev=>prev+1)}>Next</button>
                </div>
            </div>
          )
        }
}