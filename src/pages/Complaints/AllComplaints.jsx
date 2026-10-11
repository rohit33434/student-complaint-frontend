import { useState,useEffect } from "react"
import { filterComplaints, getAllComplaints, getComplaintById, getMyComplaints, searchComplaints } from "../../services/complaintService";
import { useNavigate } from "react-router-dom";

export const AllComplaints=()=>{
    const [complaints,setComplaints]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [searchKeyword,setSearchKeyword]=useState("");
    const  [searchText,setSearchText]=useState("")
    const[selectedStatus,setSelectedStatus]=useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const [sortBy,setSortBy]=useState("id");
    const [sortDir,setSortDir]=useState("ASC");
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchComplaints=async()=>{
            try{
              if (
    searchKeyword.trim() ||
    selectedStatus ||
    selectedPriority
) {

    const response = await filterComplaints(
        {
            keyword: searchKeyword,
            status: selectedStatus,
            priority: selectedPriority
        },
        currentPage,sortBy,sortDir
    );

    setComplaints(response.data.content);
    setTotalPages(response.data.totalPages);

} else {

    const response = await getAllComplaints(currentPage,sortBy,sortDir);

    setComplaints(response.data.content);
    setTotalPages(response.data.totalPages);
}
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
    },[currentPage,searchKeyword,selectedStatus,selectedPriority,sortBy,sortDir]);
// useEffect(()=>{
//     console.log(complaints)
// },[complaints])
    return(
        <div className="container mt-5">
   <h1 className="text-center text-primary mb-4">All Complaints</h1>
   <div className="d-flex justify-content-between mb-3">
<input type="text" className="form-control" value={searchText} placeholder="Search..." onChange={(e)=>setSearchText(e.target.value)}/>
   <button className="btn btn-success" onClick={()=>{setCurrentPage(0);setSearchKeyword(searchText)}}>Search</button>
   </div>
   <div className="d-flex justify-content-between mb-3">
   <select className="form-select mb-3" value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value);setCurrentPage(0)}}>
    <option value="">Select Status</option>
    <option value="OPEN">OPEN</option>
    <option value="IN_PROGRESS">IN_PROGRESS</option>
    <option value="RESOLVED">RESOLVED</option>
    <option value="REJECTED">REJECTED</option>
   </select>
   <select
    className="form-select mb-3"
    value={selectedPriority}
    onChange={(e) => {
        setSelectedPriority(e.target.value);
        setCurrentPage(0);
    }}
>
    <option value="">All Priorities</option>
    <option value="LOW">LOW</option>
    <option value="MEDIUM">MEDIUM</option>
    <option value="HIGH">HIGH</option>
</select>
<select className="form-select mb-3" value={sortDir} onChange={(e)=>{setSortDir(e.target.value);setCurrentPage(0)}}>
    <option value="ASC">ASC</option>
    <option value="DESC">DESC</option>
</select>
<select
    className="form-select mb-3"
    value={sortBy}
    onChange={(e) => {
        setSortBy(e.target.value);
        setCurrentPage(0);
    }}
>
    <option value="id">ID</option>
    <option value="createdAt">Created Date</option>
    <option value="title">Title</option>
</select>
<button className="btn btn-secondary mb-3" onClick={()=>{
    setSelectedStatus("");
    setSelectedPriority("");
    setSearchKeyword("");
    setSearchText("");
    setSortBy("id");
    setSortDir("ASC")
}}>Reset</button>
</div>
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
        
        <div className="col-md-6 col-lg-4 mb-4" key={complaint.id} >
            <div className="card shadow border-0 h-100">
                <div className="card-body d-flex flex-column">
            <h4 className="card-title text-primary text-center"> {complaint.title}</h4>
              <p className="text-primary"><strong className="text-success me-2">Student Name :</strong>{complaint.studentName}</p>
            <p className="text-primary"><strong className="text-success me-2">Assigned Staff :</strong>{complaint.assignedStaffName ?? "Not Assigned"}</p>
            <p className="text-primary"><strong className="text-success me-2">Description :</strong>{complaint.description}</p>
          <p><strong className="text-success me-2">Complaint Status :</strong><span  className={`badge ms-2 ${statusColor}`}>{complaint.complaintStatus}</span></p>    
         <p><strong className="text-success me-2">ComplaintPriority :</strong><span  className={`badge ms-2 ${priorityColor}`}>{complaint.complaintPriority}</span></p>
       <p className="text-primary mt-auto"><strong className="text-success me-2">CreatedAt :</strong>{new Date(complaint.createdAt).toLocaleString()}</p>
       <button className="btn btn-primary" onClick={()=>navigate(`/admin/complaintDetails/${complaint.id}`)}>View Details</button>
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
    <span className="align-self-center">Page {totalPages===0 ? "0" :currentPage+1} of {totalPages}</span>
    <button className="btn btn-primary" disabled={totalPages===0||currentPage===totalPages-1} onClick={()=>setCurrentPage(prev=>prev+1)}>
        next
    </button>

   </div>
   </div>
     
    )
}