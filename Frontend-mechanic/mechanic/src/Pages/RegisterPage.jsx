import React, { useState } from 'react'
import api from '../services/api.js'
import { toast } from 'react-toastify'

function RegisterPage() {
    const [formData , setFormData] = useState({
        email: '',
        password: '',
        shopName: '',
        ownerName: '',
        phone: '',
        address: '',
        vehicleTypes: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleRegister = async (e) => {
      try {
          e.preventDefault()
          const res = await api.post('/auth/register', formData)
          console.log('response' ,res.data.data);
          toast.success('registered successfully')
          
      } catch (error) {
        console.error('registration error', error);
        toast.error(error?.response?.data?.message || 'Registration failed')
      }
    }
  return (
   <>
   <div className='register-page'>
    <div className='register-card'>
        <h2 className='text-center mb-3'>Register</h2>
        <form onSubmit={handleRegister}>
            <div className='mb-3'>
                <input type="email" placeholder='Email' onChange={handleChange} required autoComplete='email' name='email' className='form-control' />
            </div>
            <div className='mb-3'>
                <input type="password" placeholder='Password' onChange={handleChange} required autoComplete='password' name='password' className='form-control' />
            </div>
            <div className='mb-3'>
                <input type="text" placeholder='Shop Name' onChange={handleChange} required autoComplete='shopName' className='form-control' name='shopName'/>
            </div>
             <div className='mb-3'>
                <input type="text" placeholder='Owner Name' onChange={handleChange} required autoComplete='ownerName' className='form-control' name='ownerName'/>
            </div>
            <div className='mb-3'>
                <input type="text" placeholder='Phone No' onChange={handleChange} required autoComplete='phone' className='form-control' name='phone'/>
            </div>
            <div className='mb-3'>
                <textarea name="address" type="text" placeholder='address' onChange={handleChange} required autoComplete='address' className='form-control'></textarea>
            </div>
            <div className='mb-3'>
                <input type="text" placeholder='Vehicle Type' onChange={handleChange} required autoComplete='vehicleTypes' className='form-control' name='vehicleTypes'/>
            </div>
            <div className='text-center d-grid'>
                <button className='btn btn-success'>Register</button>
            </div>
        </form>
    </div>
   </div>
   </>
  )
}

export default RegisterPage