import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
    CONTRACTS,
  
} from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const stakingDeployment = await deployments.get(CONTRACTS.staking);
    const memoriesDeployment = await deployments.get(CONTRACTS.memories);
    

    await deploy(CONTRACTS.staking, {
        from: deployer,
        args: [
            stakingDeployment.address,
            memoriesDeployment.address,
        ],
        log: true,
    });
};

func.tags = [CONTRACTS.warmup, "staking"];
func.dependencies = [CONTRACTS.memories,CONTRACTS.staking];

export default func;
