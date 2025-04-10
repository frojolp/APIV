import { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Button,
  Form,
  Dropdown,
  ButtonGroup,
  Table,
  FormGroup,
  DropdownButton,
} from "react-bootstrap";

import useBankAccountGenerationAPI from "./Data/useBankAccountData";
import useUserGenerationAPI from "./Data/userData";
import transactionData from "./Data/transactionData";
import Login from "./components/login";
import Account from "./components/Account";
import Users from "./components/Users";
import DropDown from "./components/DropDown";
import Popup from "./components/Popup";
import Transactions from "./components/Transactions";
import useBankAccount from "./Data/useBankAccount";
import useRefresh from "./Data/useRefresh";

function App() {
  const defaultInputValue = {
    amount: 0,
    vorname: "",
    nachname: "",
    geburtstag: new Date(),
    telefonnummer: 0,
    email: "",
    userid: "",
  };
  const {
    depositMoney,
    withdrawMoney,
    createBankAccount,
    getBankAccountByUserID,
    bankAccounts,
  } = useBankAccount();

  const [token, setRefresh] = useRefresh();
  const { fetchUser, createUser, users } = useUserGenerationAPI();
  const { getTransactionsFromBankID, transactions } = transactionData();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("bankAccounts");
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [showTransaction, setShowTransaction] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [accountID, setAccountID] = useState("");

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleConfirm = () => {
    if (popupType === "deposit" || popupType === "withdraw") {
      popupType === "deposit"
        ? depositMoney(accountID, inputValue.amount)
        : withdrawMoney(accountID, inputValue.amount);
    } else if (popupType === "createUser") {
      createUser({
        vorname: inputValue.vorname,
        nachname: inputValue.nachname,
        geburtstag: inputValue.geburtstag,
        telefonnummer: inputValue.telefonnummer,
        email: inputValue.email,
      });
    } else if (popupType === "createBankAccount") {
      createBankAccount(inputValue.userid);
    }

    setInputValue(defaultInputValue);
    setShow(false);
    setAccountID("");
    setPopupType("");
  };

  function showPopup(accountID, popupType) {
    setShow(true);
    setAccountID(accountID);
    setPopupType(popupType);
  }

  function showTransactions(accountID) {
    getTransactionsFromBankID(accountID).then(setShowTransaction(true));
  }

  const changeContent = (content) => {
    setContent(content);
    setShowTransaction(false);
  };

  const handleLogin = (newRequestUser) => {
    if (newRequestUser === loggedInUser) {
      setLoggedInUser("");
      setRefresh();
    } else {
      if (newRequestUser === "") setRefresh();
      else {
        setLoggedInUser(newRequestUser);
        getBankAccountByUserID(newRequestUser);
      }
    }
  };

  return (
    <div class="container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <ButtonGroup>
            <DropDown setContent={changeContent} />
            <Button
              onClick={() => {
                showPopup(
                  "",
                  content === "bankAccounts"
                    ? "createBankAccount"
                    : "createUser"
                );
              }}
            >
              create new {content === "bankAccounts" ? "bank account" : "user"}
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <Login setLoggedInUser={handleLogin} loggedUser={loggedInUser} />
        </div>
      </div>
      <div>
        {content === "bankAccounts" ? (
          <Account
            accounts={bankAccounts}
            showTransaction={showTransactions}
            showPopup={showPopup}
          />
        ) : (
          <Users users={users} />
        )}
        {showTransaction && <Transactions transactions={transactions} />}
        <Popup
          show={show}
          onClose={() => setShow(false)}
          onConfirm={handleConfirm}
          inputValue={inputValue}
          setInputValue={setInputValue}
          popupType={popupType}
          users={users}
        />
      </div>
    </div>
  );
}

export default App;
