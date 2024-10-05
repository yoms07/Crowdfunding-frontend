import { Contract, BrowserProvider } from "ethers";
import CrowdfundingArtifact from "@/artifacts/contracts/Crowdfunding.sol/Crowdfunding.json";
import { Crowdfunding } from "@/types/Crowdfunding";
export const findCrowdfunding = async (
  address: string
): Promise<Crowdfunding> => {
  try {
    if (!window.ethereum) {
      throw new Error("metamask is not connected");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new Contract(address, CrowdfundingArtifact.abi, signer);

    const title = await contract.title();
    const categories = await contract.getCategories();
    const target = Number(await contract.getTarget());
    const current = Number(await contract.current());
    const deadline = new Date(Number(await contract.deadline()) * 1000);
    const isOpen = await contract.isOpen();
    const contributions: {
      contributor: string;
      amount: number;
      timestamp: number;
    }[] = await contract.getContributions();
    const starter = await contract.starter();
    return {
      address,
      categories,
      target,
      current,
      title,
      deadline,
      isOpen,
      contributions: contributions.map((c) => ({
        contributor: c.contributor,
        amount: c.amount,
        timestamp: new Date(Number(c.timestamp) * 1000),
      })),
      starter: {
        address: starter,
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
