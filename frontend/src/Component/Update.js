// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function Update() {

//   const [message,setMessage]= useState("");
//   const { id } = useParams(); // Get user id from URL
//   const navigate = useNavigate();

//   console.log("Updating user with ID:", id);


//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     age: "",
//   });

//   // Fetch the user data by ID
//   useEffect(() => {
//     const userfetch = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/users/${id}`);
//         setUser(response.data); // Update the state with fetched user data 
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     userfetch();
//   }, [id]);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target; // Get the name and value of the input
//     setUser({ ...user, [name]: value }); // Update the corresponding state property
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response= await axios.put(`http://localhost:5000/update/${id}`, user); // Pass the ID in the URL
//       alert("User updated successfully"); 
//       setMessage(response.data.message);
//       navigate("/");
//     } catch (err) {
//       alert("Failed to update user");
//       console.log(err);
//     }
//   };
  

//   return (
//     <div>
//       <div className="container mt-5">
//         <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "0 auto" }}>
//           <h3 className="text-center mb-4">Update User</h3>
//           {/* Display success message if exists */}
//           {message && (
//             <div className="alert alert-success" role="alert">
//               {message}
//             </div>
//           )}
//           <form onSubmit={handleSubmit}>
//             {/* Name Input */}
//             <div className="form-group mb-3">
//               <label htmlFor="name" className="form-label">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name" // Add the name attribute
//                 className="form-control"
//                 placeholder="Enter your name"
//                 value={user.name} // Bind to the user state
//                 onChange={handleChange} // Update the state on change
//                 required
//               />
//             </div>

//             {/* Email Input */}
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email" // Add the name attribute
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={user.email} // Bind to the user state
//                 onChange={handleChange} // Update the state on change
//                 required
//               />
//             </div>

//             {/* Age Input */}
//             <div className="form-group mb-3">
//               <label htmlFor="age" className="form-label">Age</label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age" // Add the name attribute
//                 className="form-control"
//                 placeholder="Enter your age"
//                 value={user.age} // Bind to the user state
//                 onChange={handleChange} // Update the state on change
//                 required
//               />
//             </div>

//             {/* Update Button */}
//             <button type="submit" className="btn btn-success w-100">
//               Update
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Update;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for the toast notifications

function Update() {

  const [message, setMessage] = useState("");
  const { id } = useParams(); // Get user id from URL
  const navigate = useNavigate();

  console.log("Updating user with ID:", id);

  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
  });

  // Fetch the user data by ID
  useEffect(() => {
    const userfetch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`); // Adjusted to GET for fetching
        setUser(response.data); // Update the state with fetched user data 
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch user data");  // Show error toast
      }
    };
    userfetch();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input
    setUser({ ...user, [name]: value }); // Update the corresponding state property
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`http://localhost:5000/update/${id}`, user); // Pass the ID in the URL
  //     toast.success("User updated successfully");  // Show success toast
  //     setMessage(response.data.message);
  //     navigate("/", { state: { message: "User updated successfully" } }); // Pass the message as state
  //   } catch (err) {
  //     navigate("/", { state: { message: "Failed to update user" } }); // Pass the message as state
  //   console.log(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/update/${id}`, user); // Pass the ID in the URL
      // Store the success message in sessionStorage
      localStorage.setItem("updateMessage", "User updated successfully"); // Store message in sessionStorage
      navigate("/"); // Navigate to the user list
    } catch (err) {
      // Store the error message in sessionStorage
      localStorage.setItem("updateMessage", "Failed to update user"); // Store message in sessionStorage
      navigate("/"); // Navigate to the user list
      console.log(err);
    }
  };
  

  return (
    <div>
      <div className="container mt-5">
        <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h3 className="text-center mb-4">Update User</h3>

          {/* Display success message if exists */}
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name" // Add the name attribute
                className="form-control"
                placeholder="Enter your name"
                value={user.name} // Bind to the user state
                onChange={handleChange} // Update the state on change
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email" // Add the name attribute
                className="form-control"
                placeholder="Enter your email"
                value={user.email} // Bind to the user state
                onChange={handleChange} // Update the state on change
                required
              />
            </div>

            {/* Age Input */}
            <div className="form-group mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                type="number"
                id="age"
                name="age" // Add the name attribute
                className="form-control"
                placeholder="Enter your age"
                value={user.age} // Bind to the user state
                onChange={handleChange} // Update the state on change
                required
              />
            </div>

            {/* Update Button */}
            <button type="submit" className="btn btn-success w-100">
              Update
            </button>
          </form>
        </div>
      </div>

      {/* Toast container to render notifications */}
      <ToastContainer />
    </div>
  );
}

export default Update;
