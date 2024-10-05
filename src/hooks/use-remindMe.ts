import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

const initialState = (): Record<string, Record<string, boolean>> => {
  const data = localStorage.getItem("remind-me");
  if (data === null) {
    return {};
  }

  try {
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

export function useRemindMe() {
  const [remindMe, setRemindMe] = useState(initialState());
  const { account } = useSDK();

  const addRemindMe = (address: string) => {
    let key = "anon";
    if (account) {
      key = account;
    }
    const clone: Record<string, Record<string, boolean>> = JSON.parse(
      JSON.stringify(remindMe)
    );
    if (!(key in clone)) {
      clone[key] = {};
    }
    clone[key][address] = true;
    setRemindMe(clone);
    localStorage.setItem("remind-me", JSON.stringify(clone));
  };

  const removeRemindMe = (address: string) => {
    let key = "anon";
    if (account) {
      key = account;
    }
    const clone: Record<string, Record<string, boolean>> = JSON.parse(
      JSON.stringify(remindMe)
    );
    clone[key][address] = false;
    setRemindMe(clone);
    localStorage.setItem("remind-me", JSON.stringify(clone));
  };

  const isRemindingMe = (address: string) => {
    let key = "anon";
    if (account) {
      key = account;
    }

    if (!(key in remindMe)) {
      return false;
    }

    if (!(address in remindMe[key])) {
      return false;
    }

    return remindMe[key][address];
  };

  return {
    isRemindingMe,
    addRemindMe,
    removeRemindMe,
  };
}
