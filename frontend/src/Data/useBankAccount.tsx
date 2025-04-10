import { BankAccount } from "./useBankAccountData";
import { Empty, observePromise, type AsyncData } from "@ekz/async-data";
import React from "react";
import useBankaccountData from "./useBankAccountData";
import useRefresh from "./useRefresh";

export interface BankAccountApi {
  bankAccounts: AsyncData<BankAccount[]>;
  createBankAccount: (request: string) => Promise<void>;
  getBankAccountByUserID: (userID: string) => void;
}

export default function useBankAccount(): BankAccountApi {
  const [userID, setUserID] = React.useState("");
  const [token, setRefresh] = useRefresh();
  const bankAccountDataData = useBankaccountData();
  const [bankAccount, setBankAccount] =
    React.useState<AsyncData<BankAccount[]>>(Empty);

    console.log(userID)

  React.useEffect(() => {
    if (userID !== "")
      observePromise(
        bankAccountDataData.getBankAccountByUserID(userID),
        setBankAccount
      );
    else observePromise(bankAccountDataData.fetchBankAccount(), setBankAccount);
  }, [bankAccountDataData, token, userID]);

  const createBankAccount = React.useCallback((request: string) => {
    const promise = bankAccountDataData
      .createBankAccount(request)
      .finally(() => {});
    return promise;
  }, []);

  const getBankAccountByUserID = React.useCallback(
    (userID: string) => {
      setUserID(userID)
    },
    [bankAccountDataData]
  );

  return React.useMemo(() => {
    return {
      bankAccounts: bankAccount,
      createBankAccount: createBankAccount,
      getBankAccountByUserID: getBankAccountByUserID,
    };
  }, [setRefresh, bankAccount, userID]);
}
