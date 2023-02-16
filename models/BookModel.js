const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "tell your name of book"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "provide the author"],
      trim: true,
    },
    page: {
      type: Number,
      required: [true, "provide number of page"],
    },
    picture: String,
    price: {
      type: Number,
      required: [true, "provide price of book"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
/* bookSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
}); */

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

/* * Name
 * Image url
 * Author
 * pages
 * price */
