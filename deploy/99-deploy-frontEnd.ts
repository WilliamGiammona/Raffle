import "dotenv/config";
import { ethers, network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import * as fs from "fs";

const FRONT_END_ADDRESSES_FILE = "../raffle-front-end/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "../raffle-front-end/constants/abi.json";
const deployFrontEnd = async function () {
    if (process.env.UPDATE_FRONT_END === "true") {
        console.log("Updating Front End");
        updateContractAddresses();
        updateABI();
        console.log("Front End Updated");
        console.log("----------------------------------------------------");
    }
};

async function updateContractAddresses() {
    const chainId = network.config.chainId?.toString()!;
    const Raffle = await ethers.getContract("Raffle");
    const contractAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8"));
    if (chainId! in contractAddresses) {
        if (!contractAddresses[chainId].includes(Raffle.address)) {
            contractAddresses[chainId].push(Raffle.address);
        }
    } else {
        contractAddresses[chainId] = [Raffle.address];
    }

    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(contractAddresses));
}

async function updateABI() {
    const Raffle = await ethers.getContract("Raffle");
    const typeFix: any = Raffle.interface.format(ethers.utils.FormatTypes.json);
    fs.writeFileSync(FRONT_END_ABI_FILE, typeFix);
}

export default deployFrontEnd;
deployFrontEnd.tags = ["all", "FrontEnd"];
