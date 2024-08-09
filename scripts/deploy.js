async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy();
  // await myNFT.deployed();
  console.log("Contract deployed to address:",await myNFT.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//0x8D96A0A8384AAFeA3907beE2271bFA0Efb6c6eFd