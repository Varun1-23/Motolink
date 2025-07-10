import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
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
                  className="form-control border-0"
                  placeholder="Email"
                  style={{
                    width: '100%',
                    maxWidth: '370px',
                    height: '44px',
                    backgroundColor: 'rgba(217, 217, 217, 0.7)',
                    borderRadius: '0px',
                    paddingLeft: '10px',
                    color: '#000',
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 d-flex justify-content-center">
                <input
                  type="password"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
