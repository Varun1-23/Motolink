import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../Components/Navbar';
import { useEffect } from 'react';

function DistrictPage() {
  const [formData, setFormData] = useState({
    name: '',
    stateId: ''
  });
  const[districts , setDistricts] = useState([]) 
  const [states, setStates] = useState([]);
  const [edit, setEdit] = useState(null)
  const [loading , setLoading] = useState(true)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchDistricts = async () => {
    try {
      const res = await api.get('/district/get')
      console.log(res.data.data.districts);
      setDistricts(res.data.data.districts)
    } catch (error) {
      toast.error('failed to fetch district')
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
        fetchDistricts()
        }, 10)
       return () =>  clearTimeout(timeOut)
    }, [])

  
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if(edit){
        const res = await api.put(`/district/${edit}`, formData)
        toast.success('district updated')
        setEdit(null)
        fetchDistricts()
        setFormData({name:'', stateId:''})
      }
      else{
      const response = await api.post('/district/add', formData);
      console.log('Response:', response.data.data);
      toast.success('District Added Successfully');
      setFormData({ name: '', stateId: '' })
      fetchDistricts()
    } 
  }catch (error) {
      toast.error('Failed to add District');
    }
  };

  const handleDelete = async(districtId) => {
      try {
        const res = await api.delete(`/district/${districtId}`)
        toast.error('deleted successfully')
        fetchDistricts()
      } catch (error) {
        toast.error('failed to delete')
      }
  }

  const handleEdit = async (district) =>  {
      setFormData({ name: district.name , stateId: district.stateId})
      setEdit(district._id)
  }

  const handleCancelEdit = async () => {
    setFormData({ name: '', stateId: '' })
    setEdit(null)
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
        <div>Loading Districts....</div>
        </div>
    ) : (
      <div className="flex-grow-1 p-3 p-md-5">
      {/* Main Content */}
        <div className="bg-opacity-50 p-4 rounded-4 w-100" style={{ backdropFilter: 'blur(6px)', fontFamily: 'Jura' }}>
          {/* Header Row */}
          <div className="d-flex justify-content-start mb-4">
            <h2 className="text-white fw-bold m-0">Districts</h2>
          </div>

          {/* Form Row */}
          <form onSubmit={handleAdd} className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-5">

          {/* State Dropdown */}
            <select 
             name="stateId"
             value={formData.stateId}
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

            {/* Centered Input */}
            <input
              type="text"
              name="name"
              autoComplete="name"
              onChange={handleChange}
              required
              value={formData.name}
              placeholder="Enter District Name"
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
                    <th>District</th>
                    <th>State</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='text-center' style={{ backgroundColor: 'rgba(255,255,255,0.03)', fontSize: '16px' }}>
                  {districts.map((district) => (
                      <tr key={district._id}>
                        <td>{district.name}</td>
                        <td>{district.stateId?.name || 'N/A'}</td>
                        <td>
                          <button className='btn btn-secondary me-2' onClick={() => handleEdit(district)}>Edit</button>
                          <button className='btn custom-btn ' style={{backgroundColor: '#1B1D2C', color: 'white'}} onClick={() => handleDelete(district._id)}>Delete</button>
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

export default DistrictPage;
