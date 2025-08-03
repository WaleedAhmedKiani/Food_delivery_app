import jwt from 'jsonwebtoken';


const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, please login again" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  try {
    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode_token;
    // console.log("Authenticated User ID:", decode_token._id);
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

export default authMiddleware;