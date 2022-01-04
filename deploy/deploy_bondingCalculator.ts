import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { timeERC20Token__factory } from "../../types";
import { CONTRACTS } from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const timeDeployment = await deployments.get(CONTRACTS.time);
    const time = await timeERC20Token__factory.connect(timeDeployment.address, signer);

    await deploy(CONTRACTS.bondingCalculator, {
        from: deployer,
        args: [time.address],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};

func.tags = [CONTRACTS.bondingCalculator, "staking", "bonding"];
func.dependencies = [CONTRACTS.time];

export default func;
