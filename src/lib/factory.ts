import { Contract, BrowserProvider } from "ethers";
import KBFactoryArtifact from "@/artifacts/contracts/KBFactory.sol/KBFactory.json";
import { kbFactory as address } from "@/config/contract_address.json";
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
