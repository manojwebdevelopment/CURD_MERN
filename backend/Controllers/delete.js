const User = require("../model/users"); // Import the User model

async function remove(req, res){
    try {
      const { id } = req.params; // Get the user ID from URL
  
      // Find the user by ID and delete it
      const deletedUser = await User.findByIdAndDelete(id);
  
      // If user not found, return 404
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return success response
      res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
      // Handle errors
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };


module.exports = remove;