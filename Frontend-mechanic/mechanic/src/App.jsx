import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './Pages/RegisterPage.jsx';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './Pages/LoginPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
           <ToastContainer postion="top-right" autoClose={3000} />
           <Routes>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/' element={<LoginPage/>}/>
           </Routes>
    </>
  )
}

export default App
