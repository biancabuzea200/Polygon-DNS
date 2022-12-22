async function main() {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("banana");

  await domainContract.deployed();

  console.log(`Contract deployed to:`, domainContract.address);

  let txn = await domainContract.register("banana", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("minted domain banana.republic");

  txn = await domainContract.setRecord("banana", "i am banana republic");
  await txn.wait();
  console.log("set record for banana.ninja");

  const address = await domainContract.getAddress("banana");
  console.log("owner of domain banana:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//contract addr mumbai 0x9Faebe2f3838e3E9d880206dF4c7140DA0A5CfE2
