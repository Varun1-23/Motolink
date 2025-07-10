import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'animate.css';
import LoginPage from './Pages/LoginPage.jsx'
import AdminDashboardPage from './Pages/AdminDashboardPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import LocationPage from './Pages/LocationPage.jsx';
import DistrictPage from './Pages/DistrictPage.jsx';
import StatePage from './Pages/StatePage.jsx';

function App() {
  

  return (
    <>
    <Routes>
     <Route path='/dashboard' element={<AdminDashboardPage/>} />
     <Route path='/location' element={<LocationPage/>}/>
     <Route path='/district' element={<DistrictPage/>}/>
     <Route path='/state' element={<StatePage/>}/>
     <Route path='/' element={<LoginPage/>}/> 
    </Routes>
    </>
  )
}

export default App
