import axios from "axios";
import React from "react";

export type Transaction = {
  accountid: string;
  transaction: string;
  amount: number;
  date: Date;
  transactionid: String;
};

type transactionAPI = {
  getTransactionsFromBankID: (bankid: string) => void;
  transactions: Transaction[];
};

export default function transactionData(): transactionAPI {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const getTransactionsFromBankID = React.useCallback((bankid: String) => {
    return axios
      .get("/api/transaction/fromBank/" + bankid)
      .then((response) => setTransactions(response.data));
  }, []);

  return { getTransactionsFromBankID, transactions };
}
