import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS, TREASURY_TIMELOCK, AMOUNT_LIMIT } from "../scripts/constant";
//import { DAI, FRAX, OlympusERC20Token, OlympusTreasury } from "../types";
import { TimeTreasury__factory } from "../../types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const timeDeployment = await deployments.get(CONTRACTS.time);

    const memoryDeployment = await deployments.get(CONTRACTS.memories);

    // TODO: TIMELOCK SET TO 0 FOR NOW, CHANGE FOR ACTUAL DEPLOYMENT
    const treasuryDeployment = await deploy(CONTRACTS.treasury, {
        from: deployer,
        args: [timeDeployment.address, memoryDeployment.address,TREASURY_TIMELOCK,AMOUNT_LIMIT ],
        log: true,
        skipIfAlreadyDeployed: true,
    });

    await TimeTreasury__factory.connect(treasuryDeployment.address, signer);
};

func.tags = [CONTRACTS.treasury, "treasury"];
func.dependencies = [CONTRACTS.time];

export default func;
