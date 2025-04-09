import React from "react";
import {Table }from "react-bootstrap"

export default function Users({ users }) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Geburtstag</th>
            <th>Telefonnummer</th>
            <th>Email-Adresse</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <th>{user.userid}</th>
              <th>{user.vorname}</th>
              <th>{user.nachname}</th>
              <th>{new Date(user.geburtstag).toLocaleDateString()}</th>
              <th>{user.telefonnummer}</th>
              <th>{user.email}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }