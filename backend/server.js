const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/password", require("./routes/passwordRoutes"));
app.use("/api/donor", require("./routes/donorRoutes"));
app.use("/api/recipient", require("./routes/recipientRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/alert", require("./routes/alertRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
