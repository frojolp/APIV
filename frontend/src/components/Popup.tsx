import React from "react";
import {Button, DropdownButton, DropdownItem, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, } from "react-bootstrap"

export default function Popup({
    show,
    onClose,
    onConfirm,
    inputValue,
    setInputValue,
    popupType,
    users,
  }) {
    if (!show) return null;
    let title;
    if (popupType === "deposit") {
      title = "Wieviel möchten sie einzahlen";
    } else if (popupType === "withdraw") {
      title = "Wieviel möchten sie auszahlen";
    } else if (popupType === "createUser") {
      title = "Geben sie ihre persönlichen Daten ein";
    } else if (popupType === "createBankAccount") {
      title = "Geben sie einen User ein";
    }
    let form;
  
    if (popupType === "deposit" || popupType === "withdraw") {
      form = (
        <Form>
          <Form.Group>
            <Form.Control
              name="amount"
              type="number"
              value={inputValue.amount}
              onChange={(e) => handleChange(e)}
              placeholder="Gib eine Zahl ein..."
            />
          </Form.Group>
        </Form>
      );
    } else if (popupType === "createUser") {
      form = (
        <Form.Group>
          <Form.Label>Vorname</Form.Label>
          <Form.Control
            name="vorname"
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Geben sie einen Vornamen ein"
          />
          <Form.Label>Nachname</Form.Label>
          <Form.Control
            name="nachname"
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Geben sie einen Nachnamen ein"
          />
          <Form.Label>Geburtstag</Form.Label>
          <Form.Control
            name="geburtstag"
            type="Date"
            onChange={(e) => handleChange(e)}
            placeholder="Geben sie ihren Geburtstag ein"
          />
          <Form.Label>telefonnummer</Form.Label>
          <Form.Control
            name="telefonnummer"
            type="number"
            onChange={(e) => handleChange(e)}
            placeholder="Geben sie ihre Telefonnummer ein"
          />
          <Form.Label>Email-Adresse</Form.Label>
          <Form.Control
            name="email"
            type="email"
            onChange={(e) => handleChange(e)}
            placeholder="Geben sie ihre Email-Adresse ein"
          />
        </Form.Group>
      );
    } else if (popupType === "createBankAccount") {
      form = (
        <FormGroup>
          <Form.Label>Select User</Form.Label>
          <DropdownButton id="dropdown-basic-button" title={inputValue.userid}>
            {users.map((user) => (
              <DropdownItem
                key={user.userid}
                onClick={() => {
                  setInputValue({
                    ...inputValue,
                    userid: user.userid,
                  });
                }}
              >
                {user.userid}
              </DropdownItem>
            ))}
          </DropdownButton>
        </FormGroup>
      );
    }
  
    const handleChange = (event) => {
      setInputValue({
        ...inputValue,
        [event.target.name]: event.target.value,
      });
    };
  
    return (
      <Modal show={show} onHide={onClose} centered>
        <ModalHeader closeButton>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>{form}</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>
            Abbrechen
          </Button>
          <Button variant="success" onClick={onConfirm}>
            Bestätigen
          </Button>
        </ModalFooter>
      </Modal>
    );
  }