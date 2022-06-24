import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

const Booking = () => {
    const { serviceId } = useParams();
    const [service,setService]=useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/services/${serviceId}`)
        .then(res => res.json())
        .then(data => setService(data))
    }, [])
    return (
        <div>
            <h2>this is booking: {serviceId}</h2>
            <h4>{service.name}</h4>
        </div>
    );
};

export default Booking;