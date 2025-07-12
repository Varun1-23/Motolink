import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../services/api';
import Navbar from '../Components/Navbar.jsx';


function AddMechanicPage() {
    const [formData, setFormData] = useState({
            shopName: '',
            ownerName: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            vehicleTypes: '',
            location: '',
            StateId: '',
            districtId: ''
    })
    const [states , setStates] = useState([])
    const [districts, setDistricts] = useState([])
    const [locations , setLocations] = useState([])

    const fetchLocationsByDistricts = async (districtId) => {
            try {
                const res = await api.get(`/location/get/${districtId}`)
                setLocations(res.data.data)
            } catch (error) {
                toast.error('failed')
            }
    }

    const fetchDistrictByState = async (StateId) => {
        try {
            const res = await api.get(`/district/get/${StateId}`)
            console.log(res.data.data);
            setDistricts(res.data.data)
        } catch (error) {
            toast.error('Failed')
        }
    }

    const fetchStates = async () => {
        try {
            const res = await api.get('/state/get')
            setStates(res.data.data.states)
        } catch (error) {
            toast.error('error')
        }
    }
   

    const handleChange = (e) => {
        const { name , value } = e.target
        setFormData({ ...formData, [name]: value });

        if(name === 'StateId')
        {
            setFormData((prev) => ({...prev, districtId: '', StateId: value, location: ''}))
            fetchDistrictByState(value)
        }

        if(name === 'districtId')
        {
            setFormData((prev) => ({...prev, location:'', districtId: value}))
            fetchLocationsByDistricts(value)
        }

    }

    const handleAdd = async(e) => {
        e.preventDefault()
        try {
            const res = await api.post('/auth/register', formData)
            setFormData({ shopName:'', ownerName: '', email: '', password:'', address: '', phone: '', vehicleTypes: '', location: '', StateId: '', districtId: ''})
            toast.success('Mechanic Added Successfully')
        } catch (error) {
            toast.error('failed')
        }
    }
    useEffect(() => {
        fetchStates()
    }, [])

  return (
    <>
    <div className='d-flex flex-column flex-md-row' style={{backgroundColor: '#000000', minHeight: '100vh'}}>
          {/* Sidebar */}
        <div className='flex-shrink-0'>
            <Navbar/>
        </div>

        {/* Main Content */}
        <div className='flex-grow-1 p-3 p-md-5'>
            <div className='bg-opacity-50 p-4 rounded w-100' style={{ backdropFilter: 'blur(6px)', fontFamily: 'Jura' }}>
                    
                {/* Header Row */}
                <div className='d-flex justify-content-start mb-5'>
                    <h2 className='text-white fw-bold m-0'>Add Shops</h2>
                </div>
                {/* Form Row*/}
                <form onSubmit={handleAdd} className='p-4 rounded-3 shadow-lg bg-dark text-white' style={{ maxWidth: '800px', margin: '0 auto' , marginTop: '100px' }}>
                    <div className="row g-3">
                        <div className="col-md-6 ">
                            <input 
                                type="text"
                                name="shopName"
                                placeholder="Enter Shop Name"
                                autoComplete="shopname"
                                onChange={handleChange}
                                value={formData.shopName}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <input 
                                type="text"
                                name="ownerName"
                                placeholder="Enter Owner Name"
                                autoComplete="ownerName"
                                onChange={handleChange}
                                value={formData.ownerName}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <input 
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <input 
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                autoComplete="password"
                                onChange={handleChange}
                                value={formData.password}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <input 
                                type="text"
                                name="address"
                                placeholder="Enter Address"
                                autoComplete="address"
                                onChange={handleChange}
                                value={formData.address}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <input 
                                type="text"
                                name="phone"
                                placeholder="Enter Phone Number"
                                autoComplete="phone"
                                onChange={handleChange}
                                value={formData.phone}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <input 
                                type="text"
                                name="vehicleTypes"
                                placeholder="Enter Vehicle Types"
                                autoComplete="vehicleTypes"
                                onChange={handleChange}
                                value={formData.vehicleTypes}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <select 
                                name="StateId" 
                                value={formData.StateId}
                                className="form-select"
                                required
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select State</option>
                                {states.map((state) => (
                                <option key={state._id} value={state._id}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <select 
                                name="districtId" 
                                value={formData.districtId}
                                className="form-select"
                                required
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select District</option>
                                {districts.map((district) => (
                                <option key={district._id} value={district._id}>{district.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <select 
                                name="location" 
                                value={formData.location}
                                className="form-select"
                                required
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Location</option>
                                {locations.map((location) => (
                                <option key={location._id} value={location._id}>{location.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 text-center">
                            <button
                                type="submit"
                                className="btn btn-light mt-2"
                                style={{ backgroundColor: '#1B1D2C', color: 'white', borderRadius: '10px', fontSize: '18px', width: '200px' }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
    </>
  )
}

export default AddMechanicPage