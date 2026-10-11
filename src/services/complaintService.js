import api from "../api/axios"
const createComplaint=(complaintData)=>{
return api.post("/complaints",complaintData);
}
const getMyComplaints=(page=0)=>{
    return api.get(`/complaints/my?pageNo=${page}&pageSize=5`);
}
const getComplaintById=(id)=>{
    return api.get(`/complaints/${id}`);
}
const getComplaintHistory=(id,page=0)=>{
return api.get(`/complaints/${id}/history?pageNo=${page}&pageSize=5`);
}
const getStudentStats=()=>{
   return api.get("/complaints/student/dashboard");
}
const getStaffStats=()=>{
    return api.get("/complaints/staff/dashboard");
}
const getComplaintAssignedToMe=(page=0)=>{
    return api.get(`/complaints/assigned-to-me?pageNo=${page}&pageSize=5`);
}
const getComplaintAssignedToMeById=(id)=>{
return api.get(`/complaints/assigned-to-me/${id}`);
}
const updateComplaintStatus=(id,statusData)=>{
    return api.put(`/complaints/${id}/status`,statusData);
}
const getAdminStats=()=>{
    return api.get("/complaints/dashboard");
}
const getAllComplaints=(page=0,sortBy="id",sortDir="ASC")=>{
    return api.get(`/complaints/all?pageNo=${page}&pageSize=5&sortBy=${sortBy}&sortDir=${sortDir}`);
}
const assignStaff=(id,staffData)=>{
    return api.put(`/complaints/${id}/assign`,staffData);
}
const searchComplaints=(keyword,page=0)=>{
    return api.get(`/complaints/search?keyword=${keyword}&pageNo=${page}`);
}
const filterByStatus=(status,page=0)=>{
return api.get(`/complaints/status/${status}?pageNo=${page}&pageSize=5`);
}
const filterByPriority = (priority, page = 0) => {
    return api.get(`/complaints/priority/${priority}?pageNo=${page}&pageSize=5`);
}
const filterComplaints=({keyword,status,priority},page=0,sortBy="id",sortDir="ASC")=>{
    let url = `/complaints/filter?pageNo=${page}&pageSize=5&sortBy=${sortBy}&sortDir=${sortDir}`;
    if(keyword?.trim()){
         url+=`&keyword=${keyword}`;
    }
    if(status){
        url+=`&status=${status}`;
    }
    if(priority){
url+=`&priority=${priority}`;
    }
    return api.get(url);
}
const updateComplaintPriorit=(id,priority)=>{
    return api.put(`/complaints/${id}/priority`,priority)
}
export {createComplaint,getMyComplaints,getComplaintById,
    getComplaintHistory,getStudentStats,getStaffStats,getComplaintAssignedToMe,
    getComplaintAssignedToMeById,updateComplaintStatus,
    getAdminStats,getAllComplaints,assignStaff,searchComplaints,
    filterByStatus,filterByPriority,filterComplaints,updateComplaintPriorit};