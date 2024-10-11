import { Contract, BrowserProvider } from "ethers";
import { concat as uint8ArrayConcat } from "uint8arrays/concat";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";
import all from "it-all";
import CrowdfundingArtifact from "@/artifacts/contracts/Crowdfunding.sol/Crowdfunding.json";
import { Crowdfunding, CrowdfundingMetadata } from "@/types/Crowdfunding";
import { createIPFSClient } from "./ipfs";
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

    const metadataCID = await contract.metadataCID();
    const data = uint8ArrayConcat(
      await all(createIPFSClient().cat(metadataCID))
    );
    const metadata = JSON.parse(
      uint8ArrayToString(data)
    ) as CrowdfundingMetadata;

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
      categories: metadata.categories,
      target,
      current,
      title: metadata.title,
      description: metadata.description,
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
