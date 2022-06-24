import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

import './AddService.css'
const AddServices = () => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data)
        axios.post(`http://localhost:5000/services`,data)
        .then(res => {
            if(res.data.insertedId){
                alert('successfully added')
                reset();
            }
        })
    };
    return (
        <div className='service-form'>
            <h2>Pls  Add Service</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
      
      <input placeholder='Name'  {...register("name", {required: true, maxLength: 20 })} />
      <input placeholder='Price'  {...register("price")} />
      <input placeholder='image url'  {...register("img")} />
      <textarea placeholder='Description'  {...register("description")} />

      
      <input type="submit" />
    </form>
        </div>
    );
};

export default AddServices;