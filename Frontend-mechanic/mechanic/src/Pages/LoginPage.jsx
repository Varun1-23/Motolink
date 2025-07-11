import React, { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate()
    const [formData , setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/auth/login', formData)
            console.log('Response:', res.data.data);
            toast.success('Login Success')
            localStorage.setItem('email:', res.data.data.email)
        } catch (error) {
            console.log('Error: ', error);
            toast.error(error?.response?.data?.message || 'login failed')
        }
    }
  return (
    <>
    <div className='login-container'>
        <div className='login-left'>
            <div className='login-left-content'>
                <h1>Welcome Back!</h1>
                <p>Explore and request your favorite movies</p>
            </div>
        </div>
        <div className='login-right'>
            <div className='login-card'>
                <h4 className='text-center mb-4'>User Login</h4>
                <form onSubmit={handleLogin}>
                    <input type="email" className='form-control mb-3' name='email' placeholder='email' onChange={handleChange} required />
                    <input type="password" className='form-control mb-3' name='password' placeholder='password' onChange={handleChange} required />
                    <button className='btn btn-dark w-100'>Login</button>
                    <p className='text-center mt-3'>Don't Have an Account{' '}
                        <span className='register-link' onClick={() => navigate('/register') }>Register</span>
                    </p>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default LoginPage