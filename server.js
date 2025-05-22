const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./src/config/db.js"); // MongoDB connection

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Static Files
app.use("/uploads", express.static("uploads"));

// Ping Route
app.get("/ping", (req, res) => {
  res.send("Hello, World!");
});

// Routes
app.use("/auth", require("./src/routes/AuthRoute.js"));
app.use("/products", require("./src/routes/ProductRouter.js"));
app.use("/tax", require("./src/routes/TaxRoute.js"));
app.use("/hsn", require("./src/routes/HSNRoute.js"));
app.use("/category", require("./src/routes/categoryRoute.js"));
app.use("/users", require("./src/routes/UsersRouter.js"));
app.use("/supplier", require("./src/routes/SupplierRouter.js"));
app.use("/vendor", require("./src/routes/VendorRoute.js"));
app.use("/consumer", require("./src/routes/ConsumerRouter.js"));
app.use("/expenses", require("./src/routes/ExpenseRoute.js"));
app.use("/profit", require("./src/routes/profitRoute.js")); // ✅ Remove duplicate
app.use("/purchase", require("./src/routes/purchaseRoute.js"));
app.use("/employee", require("./src/routes/EmployeeRoute.js")); // ✅ Was imported but not used
app.use("/sales", require("./src/routes/saleRoute.js")); // ✅ Add this
app.use("/stock", require("./src/routes/StockRoute.js")); // ✅ Add this

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
