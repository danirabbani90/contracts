import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../scripts/constant";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
   
    const memoryDeployment = await deployments.get(CONTRACTS.memories);

    await deploy(CONTRACTS.memo, {
        from: deployer,
        args : [memoryDeployment.address],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};

func.tags = [CONTRACTS.memo,  "wrapped tokens"];
func.dependencies = [CONTRACTS.memories];
export default func;
