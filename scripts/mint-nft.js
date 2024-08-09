require("dotenv").config();
const API_URL = "https://eth-sepolia.g.alchemy.com/v2/BeP7uVEirGlnOYQPgZagVZK6UwHfPILi";
const PUBLIC_KEY="0x13846D9dfF09bB40fB15C7c4D4aDDaB239E7e777";

// const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = "8b425e92cf3b4e5ea6f5d2ae28683befea28bc12cd5eb5a4c5ef68d2cf7214b3";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// console.log(JSON.stringify(contract.abi));

const contractAddress = "0x4913a632e9b735359768466EC099466380C200e0";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFT(
  "https://bronze-electrical-primate-972.mypinata.cloud/ipfs/QmbhuqtLxWkSWJtPaxnVLdHxsaX9Z8Tpw7zA8m2A1DBiCQ"
);
//pinata ipfs API key:  1768f8cefa951eadd88f
//            API secret :6a0607dbe282b0f6fd3f13a80ffe0a49392b3d7af0b222391d8d94d70edc832a
//             JWT secret access token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsia
//WQiOiJkNzk5NzhiNy04ZmY1LTQwZWQtYTFhMC04ZGM2YWIzNzY1OGMiLCJlbWFpbCI6ImtodXNoYWxpZ2FqZXJhMDExN0BnbWFpbC5j
//b20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6M
//SwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJs
//ZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudG
//ljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTc2OGY4Y2VmYTk1MWVhZGQ4OGYiLCJzY29wZWRLZXlTZWNyZX
//QiOiI2YTA2MDdkYmUyODJiMGY2ZmQzZjEzYTgwZmZlMGE0OTM5MmIzZDdhZjBiMjIyMzkxZDhkOTRkNzBlZGM4MzJhIiwiZXhwIjoxNzU0NTY2MDkxfQ.
//rfmwusYH6-eMhOHf_g7whx4qCTgEMllnKla1dbX0nZw