const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//allow access from frontend
app.use(
  cors()
  // cors({
  //   origin: [
  //     "http://localhost:3000",
  //     "https://mellow-kataifi-24d734.netlify.app",
  //   ],
  // })
);

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
const port = process.env.PORT || 8000;
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));
app.listen(port, () => {
  console.log(`server is running on port ${port}..`);
});
