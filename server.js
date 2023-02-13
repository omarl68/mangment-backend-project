const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const db = process.env.DATABASE;
const port = process.env.PORT || 3000;
mongoose.connect(db, {

}).then(() => {
  console.log("✅ DB connection successful!");
});

app.listen(port, () => {
  console.log(`🟢 Àpp reunning on port ${port}...`);
});
