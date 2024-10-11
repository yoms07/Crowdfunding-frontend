export type CrowdfundingContribution = {
  contributor: string;
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
  contributions: CrowdfundingContribution[];
  starter: {
    address: string;
  };
};
