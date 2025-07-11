import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../Components/Navbar';
import { useEffect } from 'react';

function StatePage() {
  const [formData, setFormData] = useState({
    name: ''
  });
  const[states , setStates] = useState([]) 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchStates = async () => {
    try {
      const res = await api.get('/state/get')
      setStates(res.data.data.states)
    } catch (error) {
      toast.error('failed to fetch state')
    }
  }
  
  useEffect(()=> {
    fetchStates()
  }, [])
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/state/add', formData);
      console.log('Response:', response.data.data);
      toast.success('State Added Successfully');
      setFormData({ name: '' })
      fetchStates()
    } catch (error) {
      toast.error('Failed to add state');
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
            <h2 className="text-white fw-bold m-0">States</h2>
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
              placeholder="Enter State Name"
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
              Add 
            </button>
          </form>

          {/* Table Section */}
          <div className="table-responsive d-flex justify-content-center">
            <div style={{ maxWidth: '1200px', width: '100%' }}>
              <table className="table table-dark table-hover rounded overflow-hidden">
                <thead className="text-secondary text-center" style={{ fontSize: '14px', backgroundColor: '#1B1D2C' }}>
                  <tr>
                    <th>State</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='text-center' style={{ backgroundColor: 'rgba(255,255,255,0.03)', fontSize: '16px' }}>
                  {states.map(state => (
                      <tr key={state._id}>
                        <td>{state.name}</td>
                        <td>
                          <button className='btn btn-secondary me-2'>Edit</button>
                          <button className='btn custom-btn ' style={{backgroundColor: '#1B1D2C', color: 'white'}} onClick={() => handleDelete(state._id)}>Delete</button>
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

export default StatePage;
