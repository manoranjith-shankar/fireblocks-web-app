const fs = require('fs');
const path = require('path');
const { FireblocksSDK } = require('fireblocks-sdk');
const { exit } = require('process');
const { inspect } = require('util');

const apiSecret = fs.readFileSync(path.resolve("./fireblocks_secret_ncw_admin.key"), "utf8");
const apiSecretSigner = fs.readFileSync(path.resolve("./fireblocks_secret_ncw_signer.key"), "utf8");
const apiKey = "5291f04c-5c9b-4546-9e55-bf0581250b58"
const apiKeySigner = "eb7f6079-9abc-4421-a2b2-fba9323a07da"
// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocksNCWAdmin = new FireblocksSDK(apiSecret, apiKey, baseUrl);
const fireblocksNCWSigner = new FireblocksSDK(apiSecretSigner, apiKeySigner, baseUrl);

(async () => {

    //get wallets before creation
    const walletsBefore = await fireblocksNCWAdmin.NCW.getWallets({})
    console.log("wallets before creation", walletsBefore);

    // Create new wallet
    const newWallet = await fireblocksNCWAdmin.NCW.createWallet();
    console.log( "wallet created 1", newWallet);

    const newAccount = await fireblocksNCWSigner.NCW.createWalletAccount(newWallet.walletId)
    console.log( "account created 2", newAccount);

    const assets = await fireblocksNCWAdmin.NCW.getWalletAssets(newWallet.walletId, newAccount.accountId)
    console.log("assets 3", assets);

    const newAsset = await fireblocksNCWSigner.NCW.activateWalletAsset(newWallet.walletId, newAccount.accountId, "ETH")
    console.log("asset activated 4", newAsset);

    const getAssetsAfterCreation = await fireblocksNCWAdmin.NCW.getWalletAssets(newWallet.walletId, newAccount.accountId)
    console.log("assets after creating 5: ETH", getAssetsAfterCreation);

    //retrieve account assets
    const accountAssests = await fireblocksNCWAdmin.NCW.getWalletAssets(newWallet.walletId, newAccount.accountId)
    console.log("account assets", accountAssests);

})().catch((e)=>{
    console.error(`Failed: ${e}`);
    exit(-1);
})