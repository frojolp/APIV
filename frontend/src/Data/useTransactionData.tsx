import axios from "axios";
import React from "react";
import Bluebird from "bluebird";

export type Transaction = {
  accountid: string;
  transaction: string;
  amount: number;
  date: Date;
  transactionid: String;
};

type transactionDataAPI = {
  getTransactionsFromBankID: (bankId: string) => Promise<Transaction[]>;
};

export default function useTransactionData(): transactionDataAPI {
  return React.useMemo(() => {
    return {
      getTransactionsFromBankID(bankId: string) {
        return axios
          .get<Transaction[]>("/api/transaction/fromBank/" + bankId)
          .then((response) => response.data);
      },
    };
  }, []);
}
