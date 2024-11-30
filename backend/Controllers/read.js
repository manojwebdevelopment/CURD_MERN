const User = require("../model/users"); // Import the User model

allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export functions
module.exports = {
  allUsers,
  singleUser,
};
