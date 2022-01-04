import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const timeDeployment = await deployments.get(CONTRACTS.time);
    const memoryDeployment = await deployments.get(CONTRACTS.memories);
    const treasuryDeployment = await deploy(CONTRACTS.treasury)
    const daoAddress = "0xCD15Fc3f3C3375D075D182e22a80F45a3F9084E5" //TESTNET AVAX DAO 
    const bondCalculator = await deploy(CONTRACTS.bondingCalculator)

    await deploy(CONTRACTS.bondDepo, {
        from: deployer,
        args: [timeDeployment, memoryDeployment, treasuryDeployment, daoAddress,bondCalculator],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};

func.tags = [CONTRACTS.bondDepo, "bondDeposit"];

export default func;
