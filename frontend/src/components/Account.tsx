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

export default function Account({ showTransaction, showPopup }) {

    const

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
          {accounts.map((account) => (
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
          ))}
        </tbody>
      </Table>
    </div>
  );
}