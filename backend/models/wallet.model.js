const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({

  mnemonic: String,

  btc: {
    network: String,
    address: String
  },

  eth: {
    network: String,
    address: String
  },

  usdt_erc20: {
    token: String,
    contract: String,
    walletAddress: String
  },

  tron: {
    network: String,
    address: String
  },

  usdt_trc20: {
    token: String,
    contract: String,
    walletAddress: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Wallet", walletSchema);