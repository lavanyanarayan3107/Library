const express = require("express");
const app = express();
const cors = require("cors");
const bookRoute = require("./routes/booksRoutes");
const authRoute = require("./routes/authRoutes"); // Import auth routes

require("./connection/conn"); // Assuming this is your DB connection

app.use(cors());
app.use(express.json());

// Register authentication routes
app.use("/api/v1/auth", authRoute);

// Register book routes
app.use("/api/v1", bookRoute);

app.listen(1000, () => {
  console.log("Server connected successfully");
});
