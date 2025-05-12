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
import React from "react";
import useBankAccount from "../Data/useBankAccount";
import { AsyncDataRenderer } from "../Data/AsyncDataRenderer";

type Props = {
  userID: string;
  showTransaction: (accountID: string) => void;
  showPopup: (accountID: string, popupType: string) => void;
};

export default function Account(props: Props) {
  const { userID, showTransaction, showPopup } = props;
  const { bankAccounts } = useBankAccount(userID);
  // console.log(bankAccounts);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>AccountID</th>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            <AsyncDataRenderer
              asyncData={bankAccounts}
              renderData={(bankAccounts) =>
                bankAccounts.map((account) => (
                  <tr key={account.accountid}>
                    <th>{account.accountid}</th>
                    <th>{account.vorname + " " + account.nachname}</th>
                    <th>{account.amount}</th>
                    <td>
                      <ButtonGroup>
                        <Button
                          type="button"
                          className="mb-2"
                          variant="outline-primary"
                          onClick={() => {
                            showTransaction(account.accountid);
                          }}
                        >
                          show Transactions
                        </Button>
                        <Button
                          type="button"
                          className="mb-2"
                          variant="outline-primary"
                          onClick={() => {
                            showPopup(account.accountid, "deposit");
                          }}
                        >
                          deposit Money
                        </Button>
                        <Button
                          type="button"
                          className="mb-2"
                          variant="outline-primary"
                          onClick={() => {
                            showPopup(account.accountid, "withdraw");
                          }}
                        >
                          withdraw Money
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              }
            />
          }
        </tbody>
      </Table>
    </div>
  );
}
