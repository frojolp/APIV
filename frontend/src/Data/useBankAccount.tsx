import { BankAccount } from "./useBankAccountData";
import { Empty, observePromise, type AsyncData } from "@ekz/async-data";
import React from "react";
import useBankaccountData from "./useBankAccountData";
import useRefresh from "./useRefresh";

export interface BankAccountApi {
  bankAccounts: AsyncData<BankAccount[]>;
  createBankAccount: (request: string) => Promise<void>;
  depositMoney: (accountID: string, amount: number) => Promise<void>;
  withdrawMoney: (accountID: string, amount: number) => Promise<void>;
}

export default function useBankAccount(userID: string): BankAccountApi {
  const [token, setRefresh] = useRefresh();
  const bankAccountDataData = useBankaccountData();
  const [bankAccount, setBankAccount] =
    React.useState<AsyncData<BankAccount[]>>(Empty);

    console.log(bankAccount)

  React.useEffect(() => {
    if (userID && userID !== "") {
     return observePromise(
        bankAccountDataData.getBankAccountByUserID(userID),
        setBankAccount
      );
    } else {
      return observePromise(bankAccountDataData.fetchBankAccount(), setBankAccount);
    }
  }, [bankAccountDataData, token, userID]);

  const createBankAccount = React.useCallback((request: string) => {
    const promise = bankAccountDataData
      .createBankAccount(request)
      .finally(() => setRefresh());
    return promise;
  }, []);

  const depositMoney = React.useCallback(
    (accountID: string, amount: number) => {
      const promise =  bankAccountDataData
        .depositMoney(accountID, amount)
        .finally(() => setRefresh());
        return promise
    },
    [setRefresh, bankAccountDataData]
  );

  const withdrawMoney = React.useCallback(
    (accountID: string, amount: number) => {
      const promise =  bankAccountDataData
        .withdrawMoney(accountID, amount)
        .finally(() => setRefresh());
        return promise
    },
    [setRefresh, bankAccountDataData]
  );

  return React.useMemo(() => {
    return {
      bankAccounts: bankAccount,
      createBankAccount: createBankAccount,
      depositMoney: depositMoney,
      withdrawMoney: withdrawMoney,
    };
  }, [setRefresh, bankAccount, userID]);
}
