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
  const[filteredDistricts , setFilteredDistricts] = useState([])
  const [states, setStates] = useState([]);
  const [edit , setEdit] = useState(null)
  const [loading , setLoading] = useState(true)

  const fetchDistrictByState = async (StateId) => {
      try {
        const res = await api.get(`/district/get/${StateId}`);
        setFilteredDistricts(res.data.data) 
      } catch (error) {
        toast.error('failed to fetch')
      }
      finally{
        setLoading(false)
      }
  }

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });  

  if(name === 'StateId'){
      setFormData((prev) => ({...prev, districtId: '', StateId: value }))
      fetchDistrictByState(value)
      }
  };



  const fetchLocations = async () => {
    try {
      const res = await api.get('/location/get')
     console.log('Fetched location data:', res.data.data);
      setLocations(res.data.data)
    } catch (error) {
      toast.error('failed to fetch locations')
    }
    finally{
      setLoading(false)
    }
  }

  const fetchStates = async() => {
    try {
      const res = await api.get('/state/get')
      setStates(res.data.data.states)
    } catch (error) {
      toast.error('failed to fetch states')
    }
    finally{
      setLoading(false)
    }
  }
  
  useEffect(()=> {
    const timeOut = setTimeout(() => {
    fetchStates()
    fetchLocations()
    }, 10)
    return () => clearTimeout(timeOut)
  }, [])
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
        if(edit){
        const res = await api.put(`/location/${edit}`, formData)
        toast.success('location updated')
        setEdit(null)
        fetchLocations()
        setFormData({name:'', StateId:'' , districtId: '' })
        }else{
      const response = await api.post('/location/add', formData);
      console.log('Response:', response.data.data);
      toast.success('District Added Successfully');
      setFormData({ name: '', StateId: '', districtId: '' });
      fetchLocations()
    }
   } catch (error) {
      toast.error('Failed to add Location');
    
    }
  };

  const handleEdit = async (location) =>  {
      setFormData({ name: location.name , StateId: location.StateId  , districtId: location.districtId });
      setEdit(location._id)
  }

  const handleCancelEdit = async () => {
    setFormData({ name: '', StateId: '' , districtId: ''})
    setEdit(null)
  }

  const handleDelete = async(locationId) => {
      try {
        const res = await api.delete(`/district/${locationId}`)
        toast.error('deleted successfully')
        fetchLocations()
      } catch (error) {
        toast.error('failed to delete')
      }
  }


  return (
    <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
    {loading ? (
        <div className='text-white text-center mt-5' style={{ marginLeft: '100px'}}>
        <div className='spinner-border text-light text-center' role='status'></div>
        <div>Loading Locations....</div>
        </div>
    ): (
    <div className="flex-grow-1 p-3 p-md-5">
      {/* Main Content */}
 
        <div className="bg-opacity-50 p-4 rounded-4 w-100" style={{ backdropFilter: 'blur(6px)', fontFamily: 'Jura' }}>
          
          {/* Header Row */}
          <div className="d-flex justify-content-start mb-4">
            <h2 className="text-white fw-bold m-0">Locations</h2>
          </div>

          {/* Form Row */}
          <form onSubmit={handleAdd} className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-5">

             {/* State Dropdown */}
             <select 
             name="StateId"
             value={formData.StateId}
             className='form-select'
             required
             onChange={handleChange}
             style={{width: '200px'}}
             >
              <option value="" disabled>Select State</option>
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
              <option value="" disabled>Select District</option>
              {filteredDistricts.map((district) => (
                <option key={district._id} value={district._id}>{district.name}</option>
              ))}
             </select>


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
              {edit ? 'Update' : 'Add'}
            </button>
             {edit && (
              <button
              onClick={handleCancelEdit}
              className='btn btn-outline-light'
              >
                Cancel
              </button>
            )}
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
                          <button className='btn btn-secondary me-2' onClick={() => handleEdit(location)}>Edit</button>
                          <button className='btn custom-btn ' style={{backgroundColor: '#1B1D2C', color: 'white'}} onClick={() => handleDelete(location._id)}>Delete</button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      )}
    </div>
  );
}

export default LocationPage;
