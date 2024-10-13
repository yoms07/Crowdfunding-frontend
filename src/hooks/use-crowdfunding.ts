import { FIND_CROWDFUNDING } from "@/lib/graphql";
import { useQuery } from "@apollo/client";

export const useCrowdfunding = (address: String) => {
  const { loading, error, data } = useQuery(FIND_CROWDFUNDING, {
    variables: {
      address: address,
    },
  });

  return {
    loading,
    error,
    data: data && data.crowdfunding ? data.crowdfunding : null,
  };
};
