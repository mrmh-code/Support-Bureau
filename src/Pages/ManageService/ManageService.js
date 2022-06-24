import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ManageService = () => {
    const [service,setService]=useState([]);
    
    useEffect(()=>{
        fetch(`http://localhost:5000/services/`)
        .then(res => res.json())
        .then(data => setService(data));
    }, [])

    const handleUpdate=(id)=>{
        const url=`http://localhost:5000/services/${id}`
        fetch(url,{
            method:'Delete'
        })
        .then(res => res.json())
        .then(data =>{
             
            const remaining=service.filter(service => service._id!==id)
            setService(remaining);
        })
    }
    return (
        <div>
            <h2>This is Manage Services</h2>
            {
                service.map(u => <div key={u._id}>
                    <h3>{u.name}</h3>
                    <button onClick={()=> handleUpdate(u._id)}>update</button>
                </div>)
            }
        </div>
    );
};

export default ManageService;