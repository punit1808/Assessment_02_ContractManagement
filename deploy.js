# Deploy File

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const SchoolGradingSystem = await hre.ethers.getContractFactory("SchoolGradingSystem");
  const schoolGradingSystem = await SchoolGradingSystem.deploy();
  await schoolGradingSystem.deployed();

  schoolGradingSystem.on("StudentAdded", (studentAddress, name, classNum, grade) => {
    console.log(`New student added to : ${studentAddress}  Name:${name}  Class:${classNum}  Grade:${grade}`);
  })

  schoolGradingSystem.on("StudentRemoved", (studentAddress) => {
    console.log(`Student removed from : ${studentAddress}`);
  })

  schoolGradingSystem.on("GradeUpdated", (studentAddress, stdName, oldGrade, newGrade) => {
    console.log(`Grade updated at : ${studentAddress} Name:${stdName} From ${oldGrade} to ${newGrade}`);
  })

  console.log(`SchoolGradingSystem contract deployed to ${schoolGradingSystem.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
