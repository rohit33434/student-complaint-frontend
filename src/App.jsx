import { useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import {Login} from './pages/Login/Login';
import {Register} from './pages/Register/Register';
import { DashBoard } from './pages/Dashboard/DashBoard';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { VerifyOtp } from './pages/VerifyOtp/VerifyOtp';
import { Forgotpassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { CreateComplaint } from './pages/CreateComplaint/CreateComplaint';
import { MyComplaints } from './pages/Complaints/MyComplaints';
import { ComplaintDetails } from './pages/ComplaintDetails/ComplaintDetails';
import { StaffDashBoard } from './pages/Dashboard/StaffDashboard';
import { AssignedComplaints } from './pages/Complaints/AssignedComplaints';
import { StaffComplaintDetails } from './pages/ComplaintDetails/StaffComplaintDetails';
import { AdminDashboard } from './pages/Dashboard/AdminDashboard';
import { AllComplaints } from './pages/Complaints/AllComplaints';
import { AdminComplaintDetails } from './pages/ComplaintDetails/AdminComplaintDetails';
import { StaffManagement } from './pages/admin/StaffManagement';
import { StudentManagement } from './pages/admin/StudentManagement';
import { Home } from './pages/Home/Home';
function App() {
  return(
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/login" element={<Login />}></Route>
     <Route path="/register" element={<Register />}></Route>
     <Route path='/verifyOtp' element={<VerifyOtp />}></Route>
     <Route path="/forgotPassword" element={<Forgotpassword/>} />
     <Route path='/resetPassword' element={<ResetPassword/>} />
     <Route path='/createComplaint' element={<CreateComplaint/>}/>
     <Route path='/myComplaints' element={<MyComplaints/>}/>
     <Route path='/complaint/:id' element={<ComplaintDetails/>}/>
    <Route element={<ProtectedRoute/>}><Route path='/staff/dashboard' element={<StaffDashBoard/>}/>
</Route>
     <Route element={<ProtectedRoute/>}> <Route path="/dashboard" element={<DashBoard />}></Route>
</Route>
<Route element={<ProtectedRoute/>}> <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
</Route>
<Route path='/staff/assignedComplaints' element={<AssignedComplaints/>}/>
<Route path='/staff/assignedComplaint/:id' element={<StaffComplaintDetails/>}/>
<Route path='/admin/dashboard' element={<AdminDashboard/>}/>
<Route path='/admin/allComplaints' element={<AllComplaints/>}/>
<Route path='/admin/complaintDetails/:id' element={<AdminComplaintDetails/>}/>
<Route path='/admin/allStaff' element={<StaffManagement/>}/>
<Route path='/admin/allStudents' element={<StudentManagement/>}/>
    </Routes>
    </div>
    
  )
}

export default App
