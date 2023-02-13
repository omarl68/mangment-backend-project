const {
  default: TouchRipple,
} = require("@mui/material/ButtonBase/TouchRipple");
const Book = require("../models/bookModel");
const APIFeatures = require("../utils/apiFeature");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync.js");

exports.getAllBook = catchAsync(async (req, res) => {
  const feature = new APIFeatures(book.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const book = await feature.query;
  /* const book = await Book.find();*/
  res.status(200).json({
    status: "success",
    length: book.length,
    data: book,
  });
});

exports.getBookById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: book,
  });
});
exports.CreateBook = catchAsync(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(200).json({
    status: "success",
    data: { book },
  });
});
exports.UpdateBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

exports.DeleteBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
