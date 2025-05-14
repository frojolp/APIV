import {
  useState,
  useEffect,
  // , useCallback
} from "react";

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

// import useBankAccountGenerationAPI from "./Data/useBankAccountData";
import useUserGenerationAPI from "./Data/userData";
// import transactionData from "./Data/transactionData";
import Login from "./components/login";
import Account from "./components/Account";
import Users from "./components/Users";
import DropDown from "./components/DropDown";
import Popup from "./components/Popup";
import Transactions from "./components/Transactions";
import useBankAccount from "./Data/useBankAccount";
import useTransactions from "./Data/useTransactions";
import { AsyncDataRenderer } from "./Data/AsyncDataRenderer";
// import useRefresh from "./Data/useRefresh";

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
  const [loggedInUser, setLoggedInUser] = useState("");

  const { depositMoney, withdrawMoney, createBankAccount, bankAccounts } =
    useBankAccount(loggedInUser);

  const { fetchUser, createUser, users } = useUserGenerationAPI();
  const [bankId, setBankId] = useState("");
  const { transactions } = useTransactions(bankId);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("bankAccounts");
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [showTransaction, setShowTransaction] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [accountID, setAccountID] = useState("");

  console.log(transactions);

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
    if (bankId === accountID) {
      setShowTransaction(false);
    } else {
      setBankId(accountID);
      setShowTransaction(true);
    }
  }

  const changeContent = (content) => {
    setContent(content);
    setShowTransaction(false);
  };

  const handleLogin = (newRequestUser) => {
    if (newRequestUser === loggedInUser || newRequestUser === "") {
      setLoggedInUser("");
    } else {
      setLoggedInUser(newRequestUser);
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
          {content === "bankAccounts" && (
            <Login setLoggedInUser={handleLogin} loggedUser={loggedInUser} />
          )}
        </div>
      </div>
      <div>
        {content === "bankAccounts" ? (
          <Account
            showTransaction={showTransactions}
            showPopup={showPopup}
            bankAccounts={bankAccounts}
          />
        ) : (
          <Users users={users} />
        )}
        {showTransaction && (
          <AsyncDataRenderer
            asyncData={transactions}
            renderData={(transactions) => (
              <Transactions transactions={transactions} />
            )}
          />
        )}
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
