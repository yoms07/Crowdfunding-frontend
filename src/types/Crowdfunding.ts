export type CrowdfundingContribution = {
  contributor: string;
  amount: number;
  timestamp: Date;
};

export type CrowdfundingBurning = {
  to: string;
  amount: number;
  timestamp: Date;
};

export type CrowdfundingMetadata = {
  title: string;
  description: string;
  categories: string[];
};

export type Crowdfunding = CrowdfundingMetadata & {
  address: string;
  current: number;
  target: number;
  deadline: Date;
  isOpen: boolean;
  totalRaised: number;
  contributions: CrowdfundingContribution[];
  burnings: CrowdfundingBurning[];
  starter: {
    address: string;
  };
  createdAt: Date;
};

export const countBacker = (c: Crowdfunding): number => {
  const backerList = new Set();
  c.contributions.forEach((cont) => {
    backerList.add(cont.contributor);
  });

  return backerList.size;
};
