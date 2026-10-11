import api from "../api/axios";
const getStaff=(page=0)=>{
    return api.get(`/users/admin/staff?pageNo=${page}&pageSize=5`);
}
const createStaff=(StaffData)=>{
    return api.post("/users/admin/staff",StaffData)
}
const blockUser=(id,blockedData)=>{
    return api.put(`/users/${id}/block`,blockedData);
}
const getStudents=()=>{
    return api.get("/users/admin/student");
}
const getAllStaff=()=>{
    return api.get("/users/admin/staff/all");
}
export {getStaff,createStaff,blockUser,getStudents,getAllStaff};