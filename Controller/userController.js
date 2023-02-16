const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeature");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync.js");
const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({

    destination: './assets/images/users',

    filename: function(req, file, cb) {
        let name = req.body.name?.replace(' ', '').toLowerCase();

        cb(null, name + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check File Type
function checkFileType(file, cb) {

    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|svg/;

    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype == true && extname == true) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init Upload
exports.upload = multer({

    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

exports.getAllUser = catchAsync(async (req, res) => {
  const feature = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const user = await feature.query;
  /* const user = await User.find(); */
  res.status(200).json({
    status: "success",
    length: user.length,
    data: user,
  });
});

exports.getUserById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.AddUser = catchAsync(async (req, res) => {
  console.log("tt");
  const user = await User.create(req.body,req.file);
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.UpdateUser = catchAsync(async (req, res) => {
  if (req.body.password){
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.DeleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
