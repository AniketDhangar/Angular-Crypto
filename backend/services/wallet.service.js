const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");
const { TronWeb } = require("tronweb");
const { ethers } = require("ethers");
const HDKey = require("hdkey");

const tinysecp = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");

const fs = require("fs");
const path = require("path");

const WalletModel = require("../models/wallet.model");

const bip32 = BIP32Factory(tinysecp);

const filePath = path.join(__dirname, "../data/wallet.json");

function saveToJSON(data) {

  let wallets = [];

  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, "utf8");
    if (file) wallets = JSON.parse(file);
  }

  wallets.push(data);

  fs.writeFileSync(filePath, JSON.stringify(wallets, null, 2));
}

exports.generateWallets = async () => {

  // Generate mnemonic
  const mnemonic = bip39.generateMnemonic();

  const seed = await bip39.mnemonicToSeed(mnemonic);

  const root = bip32.fromSeed(seed);

  // ---------------- BTC TESTNET ----------------

  const btcPath = "m/44'/1'/0'/0/0";

  const btcChild = root.derivePath(btcPath);

  const { address: btcAddress } = bitcoin.payments.p2pkh({
    pubkey: btcChild.publicKey,
    network: bitcoin.networks.testnet
  });

  const btcPrivateKey = btcChild.privateKey.toString("hex");

  // ---------------- ETH SEPOLIA ----------------

  const ethWallet = ethers.HDNodeWallet.fromPhrase(mnemonic);

  const ethAddress = ethWallet.address;

  const ethPrivateKey = ethWallet.privateKey;

  // ---------------- TRON NILE ----------------

  const hd = HDKey.fromMasterSeed(seed);

  const tronNode = hd.derive("m/44'/195'/0'/0/0");

  const tronPrivateKey = tronNode.privateKey.toString("hex");

  const tronAddress = TronWeb.address.fromPrivateKey(tronPrivateKey);

  // ---------------- TOKENS ----------------

  const usdtERC20 = {
    token: "USDT",
    contract: "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
    walletAddress: ethAddress
  };

  const usdtTRC20 = {
    token: "USDT",
    contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    walletAddress: tronAddress
  };

  // ---------------- RESULT ----------------

  const result = {

    mnemonic,

    btc: {
      network: "Bitcoin Testnet",
      address: btcAddress,
      privateKey: btcPrivateKey
    },

    eth: {
      network: "Ethereum Sepolia",
      address: ethAddress,
      privateKey: ethPrivateKey
    },

    tron: {
      network: "TRON Nile",
      address: tronAddress,
      privateKey: tronPrivateKey
    },

    usdt_erc20: usdtERC20,

    usdt_trc20: usdtTRC20,

    createdAt: new Date()

  };

  // Save in MongoDB
  await WalletModel.create(result);

  // Save in JSON
  saveToJSON(result);

  return result;

};