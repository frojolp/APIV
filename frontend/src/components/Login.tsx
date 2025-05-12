import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import useBankAccount from "../Data/useBankAccount";
import { AsyncDataRenderer } from "../Data/AsyncDataRenderer";

type LoginProps = {
    setLoggedInUser: (string) => void,
    loggedUser: string,
}

export default function Login(props: LoginProps) {
    const[userInput, setUserInput] = useState('')
    const {setLoggedInUser, loggedUser} = props;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}> 
      <Form>
        <FormGroup>
          <FormLabel>user name</FormLabel>
          <FormControl type="string" onChange={(e) => setUserInput(e.target.value)} value={userInput} disabled={!!loggedUser} placeholder="Enter user name"></FormControl>
          <Button variant="primary" type = "button" onClick={() => setLoggedInUser(userInput)}>{(!loggedUser) ? "Login" : "Logout"}</Button>
        </FormGroup>
      </Form>
      </div>
  );
}
