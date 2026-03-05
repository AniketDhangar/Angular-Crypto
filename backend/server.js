const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const walletRoutes = require("./routes/wallet.routes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/crypto_wallet")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

app.use("/wallet", walletRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});