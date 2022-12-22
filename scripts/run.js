async function main() {
  // const [owner, randomPerson] = await hre.ethers.getSigners();

  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("ban");

  await domainContract.deployed();

  console.log("contract deployed to", domainContract.address);

  let txn = await domainContract.register("melam", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  const address = await domainContract.getAddress("melam");
  console.log("owner of the domaain melam:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
