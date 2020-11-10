const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes/mainRoutes");
const statsRoutes = require("./routes/statsRoutes/statsRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes/authenticationRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet=require("helmet");
const connectToMongoDb = require("./databaseConnection/connectToDb")
  .connectToDb;
//1  
const cookieParser=require("cookie-parser");  
const getDbAccess = require("./databaseConnection/connectToDb").getDbAccess;
require("dotenv").config();
//2
const corsVal=process.env.NODE_ENV==="PROD"?{ origin: "https://eager-kalam-5e53c6.netlify.app", credentials: true }:{}
//3
app.use(cors(corsVal));
app.use(helmet());
//4
app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
  //6
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Set-Cookie");
  // res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorisation');
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});
app.use("/main", mainRoutes);
app.use("/stats", statsRoutes);
app.use("/authentication", authenticationRoutes);
app.use((error, req, res, next) => {
  console.log("Main Error Control");
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Server error";
  const data = error.data || error;
  res.status(statusCode).json({ message, data });
});
connectToMongoDb(() => {
  app.listen(process.env.PORT);
});
