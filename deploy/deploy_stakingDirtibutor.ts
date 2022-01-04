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

    const treasuryDeployment = await deployments.get(CONTRACTS.treasury);
    const timeDeployment = await deployments.get(CONTRACTS.time);
    

    await deploy(CONTRACTS.staking, {
        from: deployer,
        args: [
            treasuryDeployment.address,
            timeDeployment.address,
            EPOCH_LENGTH_IN_BLOCKS,
            FIRST_EPOCH_TIME, //Next Epoch Time
        ],
        log: true,
    });
};

func.tags = [CONTRACTS.distributor, "staking"];
func.dependencies = [CONTRACTS.treasury, CONTRACTS.time];

export default func;
