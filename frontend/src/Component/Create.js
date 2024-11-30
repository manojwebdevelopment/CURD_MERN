import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Create() {
  const navigate = useNavigate();

    const [name,setName] = useState('');
    const [email,setEmail]= useState('');
    const [age,setAge]= useState('');
    const [message,setMessage]= useState('');

    const handlecreate = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/create',{name,email,age});
            setMessage(res.data.message || "User created successfully!");
            localStorage.setItem("createMessage","User created successfully!");
            navigate("/");

        }
        catch(error){
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    }

  return (
    <div>
     <div className="container mt-5">
  <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "0 auto" }}>
    <h3 className="text-center mb-4">User Form</h3>
    <h4 className="text-center text-success">{message}</h4>
    <form onSubmit={handlecreate}>
      {/* Name Input */}
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="form-control"
          placeholder="Enter your name"
        />
      </div>

      {/* Email Input */}
      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="form-control"
          placeholder="Enter your email"
        />
      </div>

      {/* Age Input */}
      <div className="form-group mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
          className="form-control"
          placeholder="Enter your age"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  </div>
</div>

    </div>
  )
}

export default Create
