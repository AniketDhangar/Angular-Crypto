const walletService = require("../services/wallet.service");

exports.generateWallets = async (req, res) => {

  try {

    const result = await walletService.generateWallets();

    res.status(200).json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Wallet generation failed"
    });

  }

};