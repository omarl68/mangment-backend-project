const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
  try {
    let authorization = req.get("Authorization");
    let token;
    if (authorization && authorization.includes("Bearer ")) {
      token = authorization.replace("Bearer ", "");
    }
    if (!token) {
      res.status(403).send({ message: "you are not logged in !" });
    }

    let decodedToken = jwt.verify(token, process.env.JWT_SECRET || "SECRET");
    
    req.role = decodedToken.role;
    req.user_id = decodedToken.id;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Error fetching users !", error: error });
  }
};

module.exports = { isAuthorized };
