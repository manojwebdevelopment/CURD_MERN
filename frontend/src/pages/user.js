import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toast notifications

function User() {

  const updateMessage = localStorage.getItem("updateMessage"); // Access the message passed through navigate
  const createMessage = localStorage.getItem("createMessage"); // Access the message passed through navigate

  const [users, setUsers] = useState([]); // Initialize as an array
  const [deleteMessage, setDeleteMessage] = useState(""); // For displaying delete messages

  // Show toast notification if a message exists
  useEffect(() => {
    // const updateMessage = localStorage.getItem("updateMessage");
    if (updateMessage) {
      if (updateMessage === "User updated successfully") {
        toast.success(updateMessage); // Show success toast
      } else if (updateMessage === "Failed to update user") {
        toast.error(updateMessage); // Show error toast
      }
      localStorage.removeItem("updateMessage"); // Clear the message after showing the toast
    }
  }, [updateMessage]);

  useEffect(() => {
    if (createMessage) {
      if (createMessage === "User created successfully!") {
        toast.success(createMessage); // Show success toast
      } else if (createMessage === "Something went wrong") {
        toast.error(createMessage); // Show error toast
      }
      localStorage.removeItem("createMessage"); // Clear the message after showing the toast
    }
  }, [createMessage]);
  

  useEffect(() => {
    if (deleteMessage === "User deleted successfully") {
      toast.success(deleteMessage);
    } else if (deleteMessage === "User not found") {
      toast.error(deleteMessage);
    }
  }, [deleteMessage]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://curd-mern.onrender.com/users");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {

      try {
        // Send DELETE request to backend
        const response = await axios.delete(
          `https://curd-mern.onrender.com/delete/${id}`
        );
        const message = response.data.message;

        // Set delete message and refresh user list
        setDeleteMessage(message); // Display success message
        fetchUsers(); // Refresh the user list after deletion
      } catch (err) {
        // Handle delete error
        setDeleteMessage("Failed to delete user");
        console.error("Delete error:", err);
      }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5">
        {/* Add Button */}
        <div className="mb-4">
          <Link to="/create" className="btn btn-success btn-lg">
            + Add User
          </Link>
        </div>

        {/* User Table */}
        <div className="card w-100 shadow-lg p-3" style={{ maxWidth: "800px" }}>
          <h3 className="text-center mb-4">User List</h3>
          <table className="table table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-warning m-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default User;
