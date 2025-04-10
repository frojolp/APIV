import axios from "axios";
import React from "react";
import Bluebird from "bluebird";

export type BankAccount = {
  accountid: string;
  userid: string;
  vorname: string;
  nachname: string;
  amount: number;
};

type bankAccountDataAPI = {
  fetchBankAccount: () => Promise<BankAccount[]>;
  getBankAccountByUserID: (userid: string) => Promise<BankAccount[]>;
  createBankAccount: (userid: string) => Promise<void>;
  depositMoney: (accountid: string, amount: number) => Promise<void>;
  withdrawMoney: (accountid: string, amount: number) => Promise<void>;
};

export default function useBankAccountData(): bankAccountDataAPI {
  return React.useMemo(() => {
    return {
      fetchBankAccount() {
        return axios
          .get<BankAccount[]>("/api/bankAccount")
          .then((response) => response.data);
      },
      getBankAccountByUserID(userid: string) {
        return axios
          .get<BankAccount[]>("/api/bankAccount/fromuser/" + userid)
          .then((response) => response.data);
      },
      depositMoney(accountid: string, amount: number) {
        return axios
          .put<void>("/api/bankAccount/deposit/" + accountid + ":" + amount)
          .then((response) => response.data);
      },
      withdrawMoney(accountid: string, amount: number) {
        return axios
          .put<void>("/api/bankAccount/withdraw/" + accountid + ":" + amount)
          .then((response) => response.data);
      },
      createBankAccount(userid: string) {
        return axios
          .post<void>("/api/bankAccount", { userid: userid })
          .then((response) => response.data);
      },
    };
  }, []);
}
