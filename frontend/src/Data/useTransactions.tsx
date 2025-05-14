import { BankAccount } from "./useBankAccountData";
import { Empty, observePromise, type AsyncData } from "@ekz/async-data";
import React from "react";
import useBankaccountData from "./useBankAccountData";
import useRefresh from "./useRefresh";
import { Transaction } from "./useTransactionData";
import useTransactionData from "./useTransactionData";

export interface TransactionApi {
  transactions: AsyncData<Transaction[]>;
}

export default function useTransactions(bankId: string): TransactionApi {
  // const [token, setRefresh] = useRefresh();
  const transactionsDataData = useTransactionData();
  const [transactions, setTransactions] =
    React.useState<AsyncData<Transaction[]>>(Empty);

  React.useEffect(() => {
    if (bankId && bankId !== "") {
      return observePromise(
        transactionsDataData.getTransactionsFromBankID(bankId),
        setTransactions
      );
    } else {
      setTransactions(Empty);
    }
  }, [transactionsDataData, bankId]);

  return React.useMemo(() => {
    return {
      transactions: transactions,
    };
  }, [transactions]);
}
