import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../scripts/constant";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
   
    const daoAddress = "0xCD15Fc3f3C3375D075D182e22a80F45a3F9084E5";

    await deploy(CONTRACTS.zapin, {
        from: deployer,
        args : [daoAddress],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};

func.tags = [CONTRACTS.zapin,  "DAO"];
export default func;
