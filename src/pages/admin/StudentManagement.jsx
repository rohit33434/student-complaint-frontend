import { useEffect, useState } from "react"
import { blockUser, getStaff, getStudents } from "../../services/userService"
import { useNavigate } from "react-router-dom";

export const StudentManagement=()=>{
    const [currentPage,setCurrentPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const navigate=useNavigate();
    const [studentList,setStudentList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const handleBlockUser=async (e)=>{
        try{
const response=await blockUser(e.id,{"blocked":!(e.blocked)});
setStudentList(studentList.map((student)=>{return (student.id===e.id ? {...student,"blocked":response.data.blocked}: student)}));
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
        const fetchStudent=async ()=>{
            try{
            const response=await getStudents(currentPage);
           setStudentList(response.data.content);
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
        fetchStudent();
    },[currentPage])
    useEffect(()=>{
          console.log(studentList);
    },[studentList])
    if(isLoading){
      return(<p className="text-center text-primary">Loading....</p>);
    }
        if(studentList.length===0){
            return(<p className="text-primary text-center">No Student Found</p>)
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
                                studentList.map((student)=>{
                                    return(
                                      <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.fullName}</td>
                                        <td>{student.email}</td>
                                        <td>{student.role}</td>
                                        <td>{student.blocked ? <span className="badge bg-danger">Blocked</span> : <span className="badge bg-success">Active</span>}</td>
                                        <td>{student.blocked ? <button className="btn btn-success" onClick={()=>handleBlockUser(student)}>UnBlock</button> : <button className="btn btn-danger" onClick={()=>handleBlockUser(student)}>Block</button>}</td>
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