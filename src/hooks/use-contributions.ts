import { GET_MY_CONTRIBUTIONS } from "@/lib/graphql";
import { useQuery } from "@apollo/client";
import { useSDK } from "@metamask/sdk-react";

export const useContribution = () => {
  const { account } = useSDK();
  const { loading, error, data } = useQuery(GET_MY_CONTRIBUTIONS, {
    variables: {
      myAddress: account ? account : "0x0000",
    },
  });

  return {
    loading,
    error,
    data:
      data && data.crowdfundingContributions
        ? data.crowdfundingContributions
        : [],
  };
};
