import api from "../api/axios";
const getComments=(id)=>{
    return api.get(`/comments/complaint/${id}`)
}
const createComment=(commentData)=>{
    return api.post("/comments",commentData);
}
export {getComments,createComment};