import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../Components/Navbar';
import { useEffect } from 'react';

function LocationPage() {
  const [formData, setFormData] = useState({
    name: '',
    StateId: '',
    districtId: '',
  });
  const[locations , setLocations] = useState([]) 
  const[districts , setDistricts] = useState([]) 
  const [states, setStates] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchDistricts = async () => {
    try {
      const res = await api.get('/district/get')
      setDistricts(res.data.data.districts)
    } catch (error) {
      toast.error('failed to fetch district')
    }
  }

  const fetchLocations = async () => {
    try {
      const res = await api.get('/location/get')
     console.log('Fetched location data:', res.data.data);
      setLocations(res.data.data)
    } catch (error) {
      toast.error('failed to fetch locations')
    }
  }

  const fetchStates = async() => {
    try {
      const res = await api.get('/state/get')
      setStates(res.data.data.states)
    } catch (error) {
      toast.error('failed to fetch states')
    }
  }
  
  useEffect(()=> {
    fetchStates()
    fetchDistricts()
    fetchLocations()
  }, [])
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/location/add', formData);
      console.log('Response:', response.data.data);
      toast.success('District Added Successfully');
      setFormData({ name: '', StateId: '', districtId: '' });
      fetchLocations()
    } catch (error) {
      toast.error('Failed to add Location');
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3 p-md-5">
        <div className="bg-opacity-50 p-4 rounded-4 w-100" style={{ backdropFilter: 'blur(6px)', fontFamily: 'Jura' }}>
          
          {/* Header Row */}
          <div className="d-flex justify-content-start mb-4">
            <h2 className="text-white fw-bold m-0">Locations</h2>
          </div>

          {/* Form Row */}
          <form onSubmit={handleAdd} className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-5">
            {/* Centered Input */}
            <input
              type="text"
              name="name"
              autoComplete="name"
              onChange={handleChange}
              required
              value={formData.name}
              placeholder="Enter Location Name"
              className="form-control"
              style={{ width: '250px' }}
            />

             {/* State Dropdown */}
             <select 
             name="StateId"
             value={formData.StateId}
             className='form-select'
             required
             onChange={handleChange}
             style={{width: '200px'}}
             >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>{state.name}</option>
              ))}
             </select>

              {/* District Dropdown */}
             <select 
             name="districtId"
             value={formData.districtId}
             className='form-select'
             required
             onChange={handleChange}
             style={{width: '200px'}}
             >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district._id} value={district._id}>{district.name}</option>
              ))}
             </select>

            {/* Button on right */}
            <button
              className="btn text-white"
              style={{
                backgroundColor: '#1B1D2C',
                borderRadius: '10px',
                width: '100px',
                height: '39px',
                fontSize: '18px',
              }}
            >
              Add 
            </button>
          </form>

          {/* Table Section */}
          <div className="table-responsive d-flex justify-content-center">
            <div style={{ maxWidth: '1200px', width: '100%' }}>
              <table className="table table-dark table-hover rounded overflow-hidden">
                <thead className="text-secondary text-center" style={{ fontSize: '14px', backgroundColor: '#1B1D2C' }}>
                  <tr>
                    <th>Location</th>
                    <th>District</th>
                    <th>State</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='text-center' style={{ backgroundColor: 'rgba(255,255,255,0.03)', fontSize: '16px' }}>
                  {locations.map(location => (
                      <tr key={location._id}>
                        <td>{location.name}</td>
                        <td>{location.StateId?.name || 'N/A'}</td>
                        <td>{location.districtId?.name || 'N/A'}</td>
                        <td>
                          <button className='btn btn-secondary me-2'>Edit</button>
                          <button className='btn custom-btn ' style={{backgroundColor: '#1B1D2C', color: 'white'}} >Delete</button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LocationPage;
