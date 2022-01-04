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
    const timeDeployment = await deployments.get(CONTRACTS.time);
    

    await deploy(CONTRACTS.staking, {
        from: deployer,
        args: [
            stakingDeployment.address,
            timeDeployment.address,
        ],
        log: true,
    });
};

func.tags = [CONTRACTS.helper, "staking"];
func.dependencies = [CONTRACTS.time,CONTRACTS.staking];

export default func;
