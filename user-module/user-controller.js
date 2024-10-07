const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user-model");
// CRUD
// Register | Login
// (request,response)

// POST
exports.register = async (request, response) => {
  try {
    const data = request.body;
    // create user {password}
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await User.create({ ...data, password: hashedPassword });

    response.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    response.status(400).json(error);
  }
};

exports.login = async (request, response) => {
  try {
    const data = request.body;
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return response.status(401).json({ message: "Invalid Credits!" });
    }
    const isPasswordMatched = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isPasswordMatched) {
      return response.status(401).json({ message: "Invalid Credits!" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET ?? "secret",
      { expiresIn: "1d" }
    );

    response.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    response.status(400).json(error);
  }
};

// module.exports = {};
