import { Contract, BrowserProvider } from "ethers";
import KBTokenArtifact from "@/artifacts/contracts/KBToken.sol/KBToken.json";
import { kbToken as address } from "@/config/contract_address.json";
export const getTokenBalance = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("metamask is not connected");
    }
    const provider = new BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const contract = new Contract(address, KBTokenArtifact.abi, signer);
    const balance = await contract.balanceOf(signer.address);
    return balance;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
