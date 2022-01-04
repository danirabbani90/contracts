import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
   

    await deploy(CONTRACTS.time, {
        from: deployer,
        log: true,
        skipIfAlreadyDeployed: true,
    });
};

func.tags = [CONTRACTS.time, "staking", "tokens"];
func.dependencies = [CONTRACTS.authority];
export default func;
