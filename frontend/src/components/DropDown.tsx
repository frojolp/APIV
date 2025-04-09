import React from "react";
import { Dropdown } from "react-bootstrap";

export default function DropDown({ setContent }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Change Table Content
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          as="button"
          onClick={() => {
            setContent("bankAccounts");
          }}
        >
          Bank Accounts
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            setContent("userAccounts");
          }}
        >
          User Accounts
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
