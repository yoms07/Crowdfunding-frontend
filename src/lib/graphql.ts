import { gql } from "@apollo/client";
import { Crowdfunding, CrowdfundingContribution } from "@/types/Crowdfunding";

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
    starter
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

export const GET_FEATURED_CROWDFUNDINGS = gql`
  query GetFeaturedCrowdfunding {
    crowdfundings(first: 3, orderBy: createdAt, orderDirection: desc) {
      ...CommonCrowdfundingFields
    }
  }
`;

export const GET_MY_CROWDFUNDINGS = gql`
  query GetMyCrowdfundings($myAddress: String!, $search: String) {
    crowdfundings(
      where: {
        and: [{ title_contains_nocase: $search }, { starter: $myAddress }]
      }
    ) {
      ...CommonCrowdfundingFields
    }
  }
`;

export const GET_RECENT_TRANSACTIONS = gql`
  query GetRecentTransaction($myAddress: String!) {
    crowdfundingContributions(
      where: { crowdfunding_: { starter: $myAddress } }
      orderBy: timestamp
      orderDirection: desc
    ) {
      contributor
      amount
      timestamp
    }
  }
`;

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData($myAddress: String!) {
    crowdfundingContributions(
      where: { crowdfunding_: { starter: $myAddress } }
      orderBy: timestamp
      orderDirection: desc
      first: 10
    ) {
      contributor
      amount
      timestamp
    }

    crowdfundings(where: { starter: $myAddress }) {
      ...CommonCrowdfundingFields
    }
  }
`;

export const GET_MY_CONTRIBUTIONS = gql`
  query GetMyContributions($myAddress: String!) {
    crowdfundingContributions(
      contributor: $myAddress
      orderBy: timestamp
      orderDirection: desc
    ) {
      contributor
      amount
      timestamp
      crowdfunding {
        id
        title
        totalRaised
        categories
        description
        deadline
        isOpen
        current
        target
        starter
      }
    }
  }
`;

export const FIND_CROWDFUNDING = gql`
  query FindCrowdfunding($address: String!) {
    crowdfunding(id: $address) {
      ...CommonCrowdfundingFields
    }
  }
`;

// export const STARTER_DASHBOARD_QUERY = gql``;

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
    contributions: d.contributions?.map(mapContribution),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    burnings: d.burnings?.map((c: any) => ({
      to: c.to,
      amount: c.amount,
      timestamp: new Date(c.timestamp * 1000),
    })),
  };
};

export const mapContribution = (c: any): CrowdfundingContribution => {
  return {
    contributor: c.contributor,
    amount: c.amount,
    timestamp: new Date(c.timestamp * 1000),
  };
};
