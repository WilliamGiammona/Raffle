import { ethers, network } from "hardhat";
import { BigNumber } from "ethers";
import { Raffle, VRFCoordinatorV2Mock } from "../typechain-types";

async function mockRequestRandomWords() {
    const accounts = await ethers.getSigners();
    let deployer = accounts[0];
    let player1 = accounts[1];
    const Raffle: Raffle = await ethers.getContract("Raffle", deployer);
    const txResponse = await Raffle.requestRandomWords();
    const txReceipt = await txResponse.wait(1);
    const requestId = await Raffle.getLastRequestId();
    if (network.config.chainId == 31337) {
        await mockVrf(requestId, Raffle);
    } else {
        console.log("No need to mock, we're on a real network");
    }
    console.log("Transaction finished!!!");
    console.log("-------------------------------------------------------------");
}

async function mockVrf(requestId: BigNumber, raffle: Raffle) {
    console.log("We on a local network? Ok let's pretend...");
    const vrfCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
    await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, raffle.address);
    console.log("Responded!");
    const recentWinner = await raffle.getWinner();
    console.log(`The winner is: ${recentWinner}`);
}

mockRequestRandomWords()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
