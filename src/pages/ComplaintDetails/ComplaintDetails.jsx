import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getComplaintById, getComplaintHistory } from "../../services/complaintService";
import { createComment, getComments } from "../../services/commentService";

export const ComplaintDetails=()=>{
    const [currentHistoryPages,setCurrentHistoryPages]=useState(0);
    const [history,setHistory]=useState([]);
    const [totalPages,setTotalPages]=useState(0);
    const [complaint,setComplaint]=useState({});
    const [isLoading,setIsLoading]=useState(true);
    const [comments,setComments]=useState([]);
    const navigate=useNavigate();
    const [isCommentPosting,setIsCommentPosting]=useState(false);
    const {id}=useParams();
    const [message,setMessage]=useState("");
    const handlePostComment=async (e)=>{
        e.preventDefault();
         setIsCommentPosting(true);
        const commentData={message,"complaintId":id};
        try{
 const response=await createComment(commentData);
        setComments(prev=>[response.data,...prev]);
        setMessage("");
        setIsCommentPosting(false);
        }catch(error){
             setIsCommentPosting(false);
            if(error.response?.status===401){
                alert("please login");
                navigate("/login");
                return;
            }else if(error.response?.status===403){
                alert("access denied");
            navigate("/login");
return;
            }
            const errors=error.response.data;
            const firstError=Object.values(errors)[0];
            alert("comment"+firstError)
        }
       
    }
    useEffect(()=>{
 const fetchComplaint=async ()=>{
    try{
const complaintResponse=await getComplaintById(id);
const commentResponse=await getComments(id);
const complaintHistoryResponse=await getComplaintHistory(id,currentHistoryPages);
setTotalPages(complaintHistoryResponse.data.totalPages);
setHistory(complaintHistoryResponse.data.content);
const complaintData=complaintResponse.data;
setComplaint(complaintData);
setComments(commentResponse.data);
setIsLoading(false);
    }catch(error){
        setIsLoading(false);
        if(error.response?.status===401){
            alert("plaese login");
            navigate("/login");
            return;
        }else if(error.response?.status===403){
            alert("access denied");
            navigate("/login");
            return ;
        }
        const errors=error.response.data;
        const firstError=Object.values(errors)[0];
        alert(firstError);
        navigate("/myComplaints")
    }

 };
 fetchComplaint();
    },[id,currentHistoryPages]);

 useEffect(()=>{
console.log(history);
    },[history]);
  
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
   if( isLoading===true){
    return(   <h1 className="text-primary align-self-center">Complaint Loading....</h1>)
   }else{
    return(    <div className="container">
            <div className="card border-0 shadow w-100 mb-2">
                <div className="card-body">
            <h1 className="text-danger text-center">Complaint Details</h1>
          <h3 className="text-primary text-center card-title">{complaint.title}</h3>
              <p className="text-primary"><strong className="text-success me-2">Student Name :</strong>{complaint.studentName}</p>
            <p className="text-primary"><strong className="text-success me-2">Assigned Staff :</strong>{complaint.assignedStaffName ?? "Not Assigned"}</p>
            <p className="text-primary"><strong className="text-success me-2">Description :</strong>{complaint.description}</p>
          <p><strong className="text-success me-2">Complaint Status :</strong><span  className={`badge ms-2 ${statusColor}`}>{complaint.complaintStatus}</span></p>    
         <p><strong className="text-success me-2">ComplaintPriority :</strong><span  className={`badge ms-2 ${priorityColor}`}>{complaint.complaintPriority}</span></p>
       <p className="text-primary mt-auto"><strong className="text-success me-2">CreatedAt :</strong>{new Date(complaint.createdAt).toLocaleString()}</p>
      
       </div>
            </div>
            <div className="row mt-3">
            <div className="col-lg-6 mb-4">
 <div className="card">
        <div className="card-body">
        <h2 className=" card-title text-warning text-center">Comments</h2>
        <div style={{maxHeight:"350px",overflowY:"auto"}}>
            { (comments.length==0)
             ? <p className="text-secondary">No Comments...</p>
            :
                
                    comments.map((comment)=>{
                        return(
                            <div className="card border-1 shadow mb-3" key={comment.id}>
                                <div className="card-body">
                            <p className="text-primary fw-bold">{comment.userName}</p>
                        <p className="text-dark">{comment.message}</p>
                        <p className="text-danger">{new Date(comment.createdAt).toLocaleString()}</p>
                        </div>
                         </div>
                        )
                    })   
        }
        </div>
        <p className="text-success">Add A Comment</p>
        <form onSubmit={(e)=>handlePostComment(e)}>
            <textarea className="form-control mb-3" placeholder="comment..." value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
            <input type="submit" value="Post Comment" className="btn btn-danger" disabled={isCommentPosting}></input>
        </form>
        </div>
        </div>
        </div>
            <div className="col-lg-6 mb-4">
                    <h1 className="text-primary">complaint history</h1>   
                    <div className="list-group">
                        {
                            (history.length===0)
                            ? <p>No History...</p>
                            :
                            <div style={{maxHeight:"340px",overflowY:"auto"}}>
                      {  history.map((item)=>{
                            return(
                            <div className="list-group-item" key={item.id}>
                                <h6>{item.action}</h6>
                                <small className="text-muted">
                                    By {item.performedBy}
                                </small>
                                <br/>
                                <small>{new Date(item.createdAt).toLocaleString()}</small>
                                </div>
                          )  })}
                          </div>
                    }   
                        </div> 
                        
                          
                        <div className="d-flex justify-content-between mt-3">
                       <button className="btn btn-primary" onClick={()=>setCurrentHistoryPages(prev=>prev-1)} disabled={currentHistoryPages===0}>prev</button>
                       <p className="text-muted"> page {currentHistoryPages+1} of {totalPages}</p>
                       <button className="btn btn-primary" onClick={()=>setCurrentHistoryPages(prev=>prev+1)} disabled={currentHistoryPages===totalPages-1}>next</button>
                    </div>

        </div>
            </div>
            </div>
        
     )

   } 
  
}