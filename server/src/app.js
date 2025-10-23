const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { globalErrorhandaler } = require("./utils/globalErrorhandaler");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expries",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));
app.use(cookieParser());

// route
app.use(process.env.BASE_API || "/api/v1", require("./routes/index.api"));

// global error handleing middleware
/**
 * must be last position
 */
app.use(globalErrorhandaler);

module.exports = { app };
