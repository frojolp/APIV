import { BankAccount } from "./useBankAccountData";
import { Empty, observePromise, type AsyncData } from "@ekz/async-data";
import React from "react";
import useBankaccountData from "./useBankAccountData";

export interface BankAccountApi {
  bankAccounts: AsyncData<BankAccount[]>;
  createBankAccount: (request: string) => Promise<void>;
}

export default function useBankAccount(): BankAccountApi {
  const bankAccountDataData = useBankaccountData();
  const [bankAccount, setBankAccount] =
    React.useState<AsyncData<BankAccount[]>>(Empty);

  React.useEffect(() => {
    return observePromise(
      bankAccountDataData.fetchBankAccount(),
      setBankAccount
    );
  }, []);

  const createBankAccount = React.useCallback((request: string) => {
    const promise = bankAccountDataData
      .createBankAccount(request)
      .finally(() => {});
    return promise;
  }, []);

  return React.useMemo(() => {
    return {
      bankAccounts: bankAccount,
      createBankAccount: createBankAccount,
    };
  }, []);
}
