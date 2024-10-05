export type CrowdfundingContribution = {
  contributor: string;
  amount: number;
  timestamp: Date;
};
export type Crowdfunding = {
  address: string;
  title: string;
  current: number;
  target: number;
  categories: string[];
  deadline: Date;
  isOpen: boolean;
  contributions: CrowdfundingContribution[];
  starter: {
    address: string;
  };
};
