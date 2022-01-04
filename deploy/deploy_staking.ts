import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
    CONTRACTS,
    EPOCH_LENGTH_IN_BLOCKS,
    FIRST_EPOCH_TIME,
    FIRST_EPOCH_NUMBER,
} from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const timeDeployment = await deployments.get(CONTRACTS.time);
    const memoriesDeployment = await deployments.get(CONTRACTS.memories);
    

    await deploy(CONTRACTS.staking, {
        from: deployer,
        args: [
            timeDeployment.address,
            memoriesDeployment.address,
            EPOCH_LENGTH_IN_BLOCKS,
            FIRST_EPOCH_NUMBER,
            FIRST_EPOCH_TIME,
        ],
        log: true,
    });
};

func.tags = [CONTRACTS.staking, "staking"];
func.dependencies = [CONTRACTS.ohm, CONTRACTS.memories];

export default func;
