import { gql } from "@apollo/client";
import { Crowdfunding } from "@/types/Crowdfunding";

export const GET_CROWDFUNDINGS_INPUT = gql`
  type GetCrowdfundingsInput {
    categories: [String]
    search: String
  }
`;

export const COMMON_CROWDFUNDING_FIELDS_FRAGMENT = gql`
  fragment CommonCrowdfundingFields on Crowdfunding {
    id
    title
    totalRaised
    categories
    description
    deadline
    isOpen
    current
    target
    contributions {
      contributor
      amount
      timestamp
    }

    burnings {
      to
      amount
      timestamp
    }
  }
`;
export const GET_CROWDFUNDINGS = gql`
  query GetCrowdfundings($categories: [String], $search: String) {
    crowdfundings(
      where: {
        and: [
          { categories_contains_nocase: $categories }
          { title_contains_nocase: $search }
        ]
      }
    ) {
      ...CommonCrowdfundingFields
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapCrowdfunding = (d: any): Crowdfunding => {
  console.log(d);
  return {
    address: d.id,
    title: d.title,
    totalRaised: d.totalRaised,
    createdAt: new Date(d.createdAt * 1000),
    target: d.target,
    categories: d.categories,
    current: d.current,
    deadline: new Date(d.deadline * 1000),
    description: d.description,
    isOpen: d.isOpen,
    starter: {
      address: d.starter,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contributions: d.contributions.map((c: any) => ({
      contributor: c.contributor,
      amount: c.amount,
      timestamp: new Date(c.timestamp * 1000),
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    burnings: d.burnings.map((c: any) => ({
      to: c.to,
      amount: c.amount,
      timestamp: new Date(c.timestamp * 1000),
    })),
  };
};
