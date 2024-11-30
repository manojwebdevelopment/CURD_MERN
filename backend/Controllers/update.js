const User = require("../model/users"); // Import the User model

update = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL
    const { name, email, age } = req.body; // Get updated fields from request body

    // Update the user in the database
    const updateUser = await User.findByIdAndUpdate(
      id, // Find user by ID
      { name, email, age }, // Fields to update
      { new: true, runValidators: true } // Return updated user and validate fields
    );

    // If user is not found, return 404
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Successfully updated user
    res.status(200).json(updateUser);
  } catch (err) {
    // Handle errors
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = update;