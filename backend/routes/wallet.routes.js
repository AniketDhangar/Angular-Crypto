const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

router.get("/generate", walletController.generateWallets);

module.exports = router;