const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.Routes");

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// authRoutes for handling authentication routes
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
