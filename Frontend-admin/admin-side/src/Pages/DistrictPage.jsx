import React from 'react';
import Sidebar from '../Components/Navbar'; // Make sure this is really your Sidebar component

function DistrictPage() {
  return (
    <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      

      {/* Main Content */}
      <div className="flex-grow-1 p-3 p-md-5">
        <div
          className=" bg-opacity-50 p-4 rounded-4 w-100"
          style={{ backdropFilter: 'blur(6px)', fontFamily: 'Jura' }}
        >
          {/* Header and Button */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h2 className="text-white fw-bold m-0">Districts</h2>
            <button
              className="btn text-white"
              style={{
                backgroundColor: '#1B1D2C',
                borderRadius: '10px',
                width: '216px',
                height: '39px',
                fontSize: '18px',
              }}
            >
              + New District
            </button>
          </div>

        <div className="table-responsive d-flex" style={{marginTop: '150px' , marginLeft: '150px'}}>
        <div style={{ maxWidth: '1100px', width: '100%' }}>
            <table className="table table-dark table-hover rounded overflow-hidden">
            <thead className="text-secondary" style={{ fontSize: '14px', backgroundColor: '#1B1D2C' }}>
                <tr>
                <th>District</th>
                <th>State</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody style={{ backgroundColor: 'rgba(255,255,255,0.03)', fontSize: '16px' }}>
                <tr className="border-secondary border-bottom">
                <td>Chennai</td>
                <td>Tamil Nadu</td>
                <td><span className="badge bg-success bg-opacity-50 text-white">Active</span></td>
                </tr>
                <tr className="border-secondary border-bottom">
                <td>Chennai</td>
                <td>Tamil Nadu</td>
                <td><span className="badge bg-warning text-dark bg-opacity-50">Pending</span></td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default DistrictPage;
