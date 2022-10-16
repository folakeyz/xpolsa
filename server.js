const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const http = require("http");
const socketUtils = require("./utils/socketUtils");

dotenv.config({ path: "./config/config.env" });
connectDB();
const user = require("./routes/user");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const i = http.createServer(app);
const io = socketUtils.sio(i);
socketUtils.connection(io);

const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 mins
  max: 300,
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//Mount Routers
app.use("/api/v1/user", user);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "public")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 8000;

const server = i.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close Server & exit Process

  server.close(() => process.exit(1));
});
