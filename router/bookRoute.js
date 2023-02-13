const express = require("express");
const router = express.Router();
const BookController = require("../Controller/BookController");

const { isAuthorized } = require("../medlware/auth");
const checkRole = require("../medlware/checkRole");

router.use(isAuthorized);

router.use(checkRole("user"));
router.get("/", BookController.getAllBook),
router.get("/:id", BookController.getBookById),


router.use(checkRole("Admin"));
router
  .route("/")
  .get(BookController.getAllBook)
  .post(BookController.CreateBook);
router
  .route("/:id")
  .get(BookController.getBookById)
  .patch(BookController.UpdateBook)
  .delete(BookController.DeleteBook);
module.exports = router;
