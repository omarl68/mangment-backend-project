const express = require("express");
const router = express.Router();
const userControlle = require("../Controller/userController");
const authControlle = require("../Controller/authController");
const { isAuthorized } = require("../medlware/auth");
const checkRole = require("../medlware/checkRole");

router.post("/signup", /* [userControlle.upload.single("picture")], */ authControlle.SignUp);
router.post("/login", authControlle.loginUser);

/* router.use(isAuthorized);
router.use(checkRole("Admin")); */
router.post("/", /* [userControlle.upload.single("picture")], */ userControlle.AddUser);
router.get('/',userControlle.getAllUser);
router
  .route("/:id")
  .get(userControlle.getUserById)
  .patch(userControlle.UpdateUser)
  .delete(userControlle.DeleteUser);
module.exports = router;
