import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div
      className="d-flex flex-column p-3 text-white"
      style={{
        width: '250px',
        minHeight: '100vh',
        backgroundColor: '#1B1D2C',
        fontFamily: 'Jura, sans-serif',
      }}
    >
      <h3 className="mb-5 mt-3 text-center" >ADMIN PANEL</h3>
      <ul className="nav flex-column gap-2">
        <li className="nav-item fw-bold text-white ps-3" style={{ fontSize: '25px' , marginTop: '20px', marginBottom: '20px' }}>
          Main Menu
        </li>
        {[
          'Dashboard',
          'States',
          'Districts',
          'Locations',
          'Add Shops',
          'View Shops',
          'Approvals',
          'Customers',
          'Services',
          'Feedbacks',
          'Category',
          'Reports',
        ].map((item) => (
          <li key={item} className="nav-item">
            <NavLink
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `nav-link fw-bold ${isActive ? 'text-info' : 'text-white'}`
              }
              style={{ fontSize: '20px' }}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
