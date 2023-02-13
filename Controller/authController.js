const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync.js");
const bcrypt = require("bcryptjs");

exports.SignUp = catchAsync(async (req, res) => {
  const user = new User(req.body);
  await user.save({ validateBeforeSave: true });
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.loginUser = async (req, res) => {
  try {
    let data = await req.body;
    let user = await User.findOne({ email: data.email });
    console.log(user);

    if (user) {
      let compare = bcrypt.compareSync(data.password, user.password);

      /*     data.password === user.password; */
      if (compare) {
        let dataToStoreInToken = {
          id: user._id,
          role: user.role,
        };

        let myToken = jwt.sign(
          dataToStoreInToken,
          process.env.JWT_SECRET || "SECRET"
        );
        res.set("Access-Control-Expose-Headers", ["Authorization"]);

        res.status(200).json({ message: "User Logged in !", myToken });
      } else res.status(404).send({ message: "User not found !" });
    } else res.status(404).send({ message: "User not found !" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "user cannot logged in !", error: error });
  }
};
