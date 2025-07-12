import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'animate.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import LoginPage from './Pages/LoginPage.jsx'
import AdminDashboardPage from './Pages/AdminDashboardPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import LocationPage from './Pages/LocationPage.jsx';
import DistrictPage from './Pages/DistrictPage.jsx';
import StatePage from './Pages/StatePage.jsx';
import ViewApprovalPage from './Pages/ViewApprovalPage.jsx';
import AddMechanicPage from './Pages/AddMechanicPage.jsx';
import ViewShopPage from './Pages/ViewShopPage.jsx';

function App() {
  

  return (
    <>
    <ToastContainer
    theme="dark"
    closeOnClick
    />
    <Routes>
     <Route path='/dashboard' element={<AdminDashboardPage/>} />
     <Route path='/locations' element={<LocationPage/>}/>
     <Route path='/districts' element={<DistrictPage/>}/>
     <Route path='/add shops' element={<AddMechanicPage/>}/>
     <Route path='/view shops' element={<ViewShopPage/>}/>
     <Route path='/approvals' element={<ViewApprovalPage/>}/>
     <Route path='/states' element={<StatePage/>}/>
     <Route path='/' element={<LoginPage/>}/> 
    </Routes>
    </>
  )
}

export default App
