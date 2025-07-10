import React from 'react';
import Navbar from'../Components/Navbar.jsx'


function AdminDashboardPage() {
  const menuItems = [
    'Dashboard', 'Category', 'Reports',
    'Districts', 'Locations', 'States', 'Shops',
    'Customers', 'Services', 'Feedbacks'
  ];

  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      <Navbar/>
      {/* Main content area */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#000000' }}>
        <h2 className="text-white">Welcome to the Admin Dashboard</h2>
        {/* Add your page-specific content here */}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
