import { Contract, BrowserProvider } from "ethers";
import KBFactoryArtifact from "@/artifacts/contracts/KBFactory.sol/KBFactory.json";
import KBTokenArtifact from "@/artifacts/contracts/KBToken.sol/KBToken.json";
import {
  kbFactory as address,
  kbToken as tokenAddress,
} from "@/config/contract_address.json";
export const createCrowdfunding = async (
  title: string,
  categories: string[],
  target: number,
  deadline: number
) => {
  try {
    if (!window.ethereum) {
      throw new Error("metamask is not connected");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new Contract(address, KBFactoryArtifact.abi, signer);
    const tx = await contract.createCrowdfunding(
      title,
      categories,
      target,
      deadline
    );

    await tx.wait();

    console.log(tx);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const donateToCrowdfunding = async (
  targetCrowdfundingAddress: string,
  amount: number
) => {
  try {
    if (!window.ethereum) {
      throw new Error("metamask is not connected");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tokenContract = new Contract(
      tokenAddress,
      KBTokenArtifact.abi,
      signer
    );
    await tokenContract.approve(targetCrowdfundingAddress, amount);

    const contract = new Contract(address, KBFactoryArtifact.abi, signer);
    const tx = await contract.donate(targetCrowdfundingAddress, amount);

    await tx.wait();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const withdrawFromCrowdfunding = async (
  targetCrowdfundingAddress: string,
  amount: number
) => {
  try {
    if (!window.ethereum) {
      throw new Error("metamask is not connected");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new Contract(address, KBFactoryArtifact.abi, signer);
    const tx = await contract.withdraw(
      signer.address,
      targetCrowdfundingAddress,
      amount
    );

    await tx.wait();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
