require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors");
const connectDB = require("./config/database");
const credentials = require("./middleware/credentials");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const validateTokenHandler = require("./middleware/validateToken");

const app = express();
const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

//allow credentials
app.use(credentials);

//cors
app.use(cors(corsOptions));

//application/json response
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//validate token handler
app.use(validateTokenHandler);

app.use("/api/auth", require("./routes/user"));

//error handeler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
