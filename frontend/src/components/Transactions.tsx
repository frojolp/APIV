import React from "react";
import { Table } from "react-bootstrap";

export default function Transactions({transactions}) {
    console.log(transactions)
    if (transactions.length === 0) {
      return;
    }
  
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>TransactionID</th>
            <th>accountID</th>
            <th>transaction</th>
            <th>datum</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <th>{transaction.transactionID}</th>
              <th>{transaction.accountID}</th>
              <th>{transaction.transaction}</th>
              <th>{new Date(transaction.datum).toLocaleDateString()}</th>
              <th>{transaction.amount}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }