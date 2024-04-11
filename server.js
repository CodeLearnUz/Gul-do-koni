const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Importing routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Creating express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/comments", commentRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Port configuration
const PORT = process.env.PORT || 3000;

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});