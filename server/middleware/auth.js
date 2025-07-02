import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = (role) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Missing or invalid Authorization header");
      return res.status(401).json({ message: "Unauthorized - Invalid header" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Should show { id, role }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      console.log("User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Error in auth middleware:", err.message);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default auth;
