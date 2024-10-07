const User = require("../user-module/user-model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (request, response, next) => {
  try {
    const authHeader =
      request.headers["Authorization"] || request.headers["authorization"];
    // `Bearer faihedgifhkgljhfdsyiyhio`
    const token = authHeader.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    request.user = user;
    next();
    // read data (user)
  } catch (error) {
    response.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
