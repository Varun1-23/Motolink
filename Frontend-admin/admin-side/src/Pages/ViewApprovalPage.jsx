import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Navbar.jsx'
import api from '../services/api.js'
import { toast } from 'react-toastify'

function ViewApprovalPage() {
    const[shops , setShops] = useState([])
    const [loading , setLoading] = useState(true)
    const fetchShops = async () => {
        try {
            const res = await api.get('/mechanic/allShops')
            setShops(res.data.data)
        } catch (error) {
            toast.error('failed')
        }
        finally{
            setLoading(false)
        }
    }

    const handleAccept = async (shopId) => {
        try {
            console.log('ShopID:',shopId);
            const res = await api.put(`/mechanic/update/${shopId}`)
            toast.success('Approved Successfully')
            fetchShops()
        } catch (error) {
            toast.error('failed to accept')
        }
    }

    useEffect(()=> {
        const timeOut = setTimeout(() => {
        fetchShops()
        }, 10)
       return () =>  clearTimeout(timeOut)
    }, [])


  return (
    <>
    <div className='d-flex flex-column flex-md-row' style={{backgroundColor: '#000000', minHeight: '100vh'}}>
          {/* Sidebar */}
        <div className='flex-shrink-0'>
            <NavBar />
        </div>
    {loading ?  (
        <div className='text-white text-center mt-5' style={{ marginLeft: '100px'}}>
        <div className='spinner-border text-light text-center' role='status'></div>
        <div>Loading Shops....</div>
        </div>
    ):(
        <div className='flex-grow-1 p-3 p-md-5'>
        {/* Main Content */}
        
            <div className='bg-opacity-50 p-4 rounded w-100' style={{ backdropFilter: 'blur(6px)', fontFamily: 'Jura' }}>
            
        {/* Header Row */}
        <div className='d-flex justify-content-start mb-5'>
            <h2 className='text-white fw-bold m-0'>Pending  Approvals</h2>
        </div>

        <div className=' table-responsive d-flex justify-content-center'  style={{ marginTop: '100px'}}>
            <div style={{ maxWidth: '1200px' , width: '100%'}}>
                <table className='table table-dark table-hover rounded overflow-hidden'>
                    <thead className='text-secondary text-center' style={{ fontSize: '14px' ,  backgroundColor: '#1B1D2C'}}>
                        <tr>
                            <th>Shop Name</th>
                            <th>OwnerName</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone No</th>
                            <th>vehicle Type</th>
                            <th>State</th>
                            <th>District</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center' style={{backgroundColor: 'rgba(255,255,255,0.03)', fontSize: '16px'}}>
                        {shops.map(shop => (
                            <tr key={shop._id}>
                                <td>{shop.shopName}</td>
                                <td>{shop.ownerName}</td>
                                <td>{shop.email}</td>
                                <td>{shop.address}</td>
                                <td>{shop.phone}</td>
                                <td>{shop.vehicleTypes}</td>
                                <td>{shop.location?.StateId?.name || 'N/A'}</td>
                                <td>{shop.location?.districtId?.name || 'N/A'}</td>
                                <td>{shop.location?.name || 'N/A'}</td>
                                <td>
                                    <button className='btn btn-secondary me-2' onClick={() => handleAccept(shop._id) }>Accept</button>
                                    <button className='btn custom-btn' style={{backgroundColor: '#1B1D2C', color: 'white'}}>Reject</button>
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
                        
    </>
  )
}

export default ViewApprovalPage