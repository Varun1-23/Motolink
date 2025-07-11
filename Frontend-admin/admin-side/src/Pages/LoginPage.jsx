import React, { useState } from 'react';
import '../Styles/LoginPage.css';
import api from '../services/api';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const[formData , setFormData] = useState({email: '', password: ''});

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const handleLogin = async (e) => {
    e.preventDefault();
try {
      const res = await api.post('/admin/login', formData)
      console.log('Response:', res.data.data);
      if(res.data.data.role === 'admin'){
        toast.success('admin logged in');
        navigate('/dashboard')
      }
      else{
        toast.error('invalid credentials')
      }
} catch (error) {
  toast.error('login failed') 
}
  };

  return (
    <div
      className="d-flex flex-column flex-md-row vh-100 w-100"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.79), rgba(0, 0, 0, 0.79)), url('https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="container-fluid d-flex flex-column flex-md-row position-relative z-2 px-0">
        
        {/* Left: Logo */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center text-white position-relative py-4">
          <h1
            className="fw-bolder text-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '48px',
              lineHeight: '60px',
            }}
          >
            MOTOLINK
          </h1>

          {/* Show vertical line only on desktop */}
          <div
            className="d-none d-md-block"
            style={{
              position: 'absolute',
              right: 0,
              top: '20%',
              height: '60%',
              width: '1px',
              backgroundColor: '#ffffff',
              zIndex: 3,
            }}
          ></div>
        </div>

        {/* Right: Login Form */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center px-3 py-4">
          <div
            className="text-white w-100"
            style={{
              maxWidth: '400px',
              fontFamily: 'Inter, sans-serif',
              marginTop: '-50px',
            }}
          >
            <h2
              className=" text-center"
              style={{
                fontSize: '36px',
                lineHeight: '45px',
                fontWeight: '400',
                marginBottom: '10px'
              }}
            >
              Welcome
            </h2>
            <p
              className="text-center fw-bold mb-5"
              style={{
                fontSize: '18px',
                lineHeight: '22px',
              }}
            >
              Please Login To Admin dashboard
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-3 d-flex justify-content-center">
                <input
                  type="email"
                  autoComplete='email'
                  className="form-control border-0"
                  placeholder="Email"
                  name='email'
                  style={{
                    width: '100%',
                    maxWidth: '370px',
                    height: '44px',
                    backgroundColor: 'rgba(217, 217, 217, 0.7)',
                    borderRadius: '0px',
                    paddingLeft: '10px',
                    color: '#000',
                  }}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 d-flex justify-content-center">
                <input
                  type="password"
                  autoComplete='password'
                  className="form-control border-0"
                  placeholder="Password"
                  style={{
                    width: '100%',
                    maxWidth: '370px',
                    height: '44px',
                    backgroundColor: 'rgba(217, 217, 217, 0.7)',
                    borderRadius: '0px',
                    paddingLeft: '10px',
                    color: '#000',
                    marginBottom: '35px'
                  }}
                  name='password'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="login-button btn border-0"
                  style={{
                    backgroundColor: '#735F32',
                    color: '#fff',
                    width: '70%',
                    maxWidth: '250px',
                    height: '35px',
                    borderRadius: '0px',
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
