import axios from "axios";
import React from "react";
import Bluebird from "bluebird";
import { Transaction } from "./transactionData";

type transactionDataAPI = {
    getTransactionsFromBankID: (bankId: string) => Promise<Transaction[]>;
};

export default function useTransactionData(): transactionDataAPI {
  return React.useMemo(() => {
    return {getTransactionsFromBankID(bankId: string) {
        return axios
          .get<Transaction[]>("/api/transaction/fromBank/" + bankId)
          .then((response) => response.data);
      }}
  }, []);
}
