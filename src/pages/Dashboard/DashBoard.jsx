// import { useNavigate } from "react-router-dom";
// import { getStudentStats } from "../../services/complaintService";
// import { useState,useEffect } from "react";

// const DashBoard=()=>{
//     const [stats,setStats]=useState([])
//     const email=localStorage.getItem("email");
//     const role=localStorage.getItem("role");
// const navigate=useNavigate();
// const handleLogOut=()=>{
//     localStorage.removeItem("email");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//  console.log(localStorage.getItem("token"));
// console.log(localStorage.getItem("email"));
// console.log(localStorage.getItem("role"));
// }
// useEffect(()=>{
// const fetchStats=async()=>{
// const response=await getStudentStats();
// setStats(response.data);
// }
// fetchStats();
// },[])
//     return(
//         <div className="container d-flex justify-content-center">
//             <div className="card border-0 shadow p-2 " style={{width:"800px"}}>
//                 <div className="card-body">
//         <h1 className="text-primary text-center">Smart Campus DashBoard</h1>
//         <p className="text-warning">Welcome : {email}</p>
//         <p className="text-danger">Role : {role}</p>
//         <hr/>
//         <div className="d-flex justify-content-between">
//           <div className="card">
//           <div className="card-body">
//             <p className="badge bg-success">{stats.openComplaints}</p>
//             <p className="badge bg-primary">{stats.inProgressComplaints}</p>
//             <p className="badge bg-dark">{stats.resolvedComplaints}</p>
//             <p className="badge bg-secondary">{stats.totalComplaints}</p>
//           </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-between mt-3">
//             <button className="btn btn-warning text-light " onClick={()=>navigate("/createComplaint")}>Raise Complaint</button>
//             <button className="btn btn-primary text-light " onClick={()=>navigate("/myComplaints")}>My Complaints</button>
//             <button className="btn btn-danger text-light " onClick={handleLogOut}>Logout</button>
//         </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export  {DashBoard};
import { useNavigate } from "react-router-dom";
import { getStudentStats } from "../../services/complaintService";
import { useState, useEffect } from "react";

const DashBoard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStudentStats();
        setStats(response.data);
      } catch (error) {
        console.log(error);
        alert("Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-primary">Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow border-0">

        <div className="card-body">

          <h2 className="text-center text-primary mb-4">
            Smart Campus Dashboard
          </h2>

          <h5>Welcome 👋</h5>
          <p className="mb-1">
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>

          <hr />

          <h4 className="mb-3">Complaint Statistics</h4>

          <div className="row">

            <div className="col-md-3 mb-3">
              <div className="card border-success shadow-sm text-center">
                <div className="card-body">
                  <h6 className="text-success">Open</h6>
                  <h3>{stats.openComplaints}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-primary shadow-sm text-center">
                <div className="card-body">
                  <h6 className="text-primary">In Progress</h6>
                  <h3>{stats.inProgressComplaints}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-dark shadow-sm text-center">
                <div className="card-body">
                  <h6>Resolved</h6>
                  <h3>{stats.resolvedComplaints}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-secondary shadow-sm text-center">
                <div className="card-body">
                  <h6>Total</h6>
                  <h3>{stats.totalComplaints}</h3>
                </div>
              </div>
            </div>

          </div>

          <hr />

          <h4 className="mb-3">Quick Actions</h4>

          <div className="d-flex justify-content-center gap-3 flex-wrap">

            <button
              className="btn btn-warning"
              onClick={() => navigate("/createComplaint")}
            >
              Raise Complaint
            </button>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/myComplaints")}
            >
              My Complaints
            </button>

            <button
              className="btn btn-danger"
              onClick={handleLogOut}
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export { DashBoard };