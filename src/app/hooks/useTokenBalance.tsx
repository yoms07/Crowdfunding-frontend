import { useToast } from "@/hooks/use-toast";
import { getTokenBalance } from "@/lib/kbToken";
import { useSDK } from "@metamask/sdk-react";
import { createContext, useContext, useEffect, useState } from "react";

type TokenBalanceContextState = {
  balance?: number;
};
type TokenBalanceContextAction = {
  setBalance: (balance: number) => void;
  refetch: () => void;
};

const defaultValue: TokenBalanceContextState & TokenBalanceContextAction = {
  balance: 0,
  setBalance: () => {},
  refetch: () => {},
};

const TokenBalanceContext = createContext<
  TokenBalanceContextState & TokenBalanceContextAction
>(defaultValue);

export default function TokenBalanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [balance, setBalance] = useState<number>(0);
  const { account } = useSDK();
  const { toast } = useToast();

  const fetchTokenBalance = async () => {
    if (!account) {
      setBalance(0);
      return;
    }
    try {
      const balance = await getTokenBalance();
      setBalance(balance);
    } catch (err: unknown) {
      let description = "Unknown error";
      if (err instanceof Error) {
        description = err.message;
      }
      toast({
        title: "Failed retrieve account balance",
        description,
      });
    }
  };

  const refetch = fetchTokenBalance;

  useEffect(() => {
    fetchTokenBalance();
  }, [account]);
  return (
    <TokenBalanceContext.Provider
      value={{
        balance: balance,
        setBalance: (balance: number) => setBalance(balance),
        refetch,
      }}
    >
      {children}
    </TokenBalanceContext.Provider>
  );
}

export const useTokenBalance = () => useContext(TokenBalanceContext);
