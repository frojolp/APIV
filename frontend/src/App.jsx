import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Dropdown, ButtonGroup, Table, FormGroup, DropdownButton} from "react-bootstrap";
import * as users from "react-bootstrap/ElementChildren";

function App() {
    const defaultInputValue = {
        amount: 0,
        vorname: "",
        nachname: "",
        geburtstag: new Date(),
        telefonnummer: 0,
        email: "",
        userid: ""
    }
    const [show, setShow] = useState(false)
    const [content, setContent] = useState("bankAccounts")
    const [inputValue, setInputValue] = useState(defaultInputValue)
    const [accounts, setAccounts] = useState([])
    const [users, setUsers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [showTransaction, setShowTransaction] = useState(false)
    const [popupType, setPopupType] = useState("")
    const [accountID, setAccountID] = useState("")


    useEffect(() => {
        axios.get('/api/bankAccount').then(response => setAccounts(response.data))
        axios.get('/api/user').then(response => setUsers(response.data))
    }, []);

    function reloadBankAccount() {
        axios.get('/api/bankAccount').then(response => setAccounts(response.data))
    }

    const handleConfirm = () => {
        if (popupType === "deposit" || popupType === "withdraw") {
            axios.put('/api/bankAccount/' + popupType + '/' + accountID + ':' + inputValue.amount).then(r => r.data)
        } else if (popupType === "createUser") {
            const newUser = {
                vorname: inputValue.vorname,
                nachname: inputValue.nachname,
                geburtstag: inputValue.geburtstag,
                telefonnummer: inputValue.telefonnummer,
                email: inputValue.email
            }
            axios.post('/api/user', newUser).then(r => r.data)
        } else if (popupType === "createBankAccount") {
            const newBankAccount = {
                userid: inputValue.userid
            }
            axios.post('/api/bankAccount', newBankAccount).then(r => r.data)
        }

        setInputValue(defaultInputValue)
        setShow(false)
        setAccountID("")
        setPopupType("")
        reloadBankAccount()
    }

    function showPopup(accountID, popupType) {
        setShow(true)
        setAccountID(accountID)
        setPopupType(popupType)
    }

    function showTransactions(accountID) {
        axios.get('/api/transaction/fromBank/' + accountID).then(response => {
            setTransactions(response.data);
            setShowTransaction(true);
        })
    }

    const changeContent = (content) => {
        setContent(content)
        setShowTransaction(false)
    }

    return (<div class="container">
        <ButtonGroup>
            <DropDown setContent={changeContent}/>
            <Button onClick={() => {
                showPopup("", (content === "bankAccounts") ? "createBankAccount" : "createUser")
            }}>create
                new {(content === "bankAccounts") ? "bank account" : "user"}</Button>
        </ButtonGroup>
        <div>
            {(content === "bankAccounts") ?
                <Account accounts={accounts} showTransaction={showTransactions} showPopup={showPopup}/> :
                <Users users={users}/>}
            {showTransaction && <Transactions transactions={transactions}/>}
            <Popup show={show} onClose={() => setShow(false)} onConfirm={handleConfirm} inputValue={inputValue}
                   setInputValue={setInputValue} popupType={popupType} users={users}/>
        </div>
    </div>)
}

function DropDown({setContent}) {
    return (<Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Change Table Content
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item as="button" onClick={() => {
                setContent("bankAccounts")
            }}>Bank Accounts</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => {
                setContent("userAccounts")
            }}>User Accounts</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>)
}

function Account({accounts, showTransaction, showPopup}) {

    return (<div>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>AccountID</th>
                <th>UserID</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {accounts.map(account => <tr key={account.accountid}>
                <th>{account.accountid}</th>
                <th>{account.userid}</th>
                <th>{account.amount}</th>
                <td>
                    <ButtonGroup>
                        <Button type="button" className="mb-2" variant="outline-primary" onClick={() => {
                            showTransaction(account.accountid)
                        }}>show Transactions
                        </Button>
                        <Button type="button" className="mb-2" variant="outline-primary" onClick={() => {
                            showPopup(account.accountid, "deposit")
                        }}>deposit Money
                        </Button>
                        <Button type="button" className="mb-2" variant="outline-primary" onClick={() => {
                            showPopup(account.accountid, "withdraw")
                        }}>withdraw Money
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>)}
            </tbody>
        </Table>
    </div>)
}

function Popup({
                   show, onClose, onConfirm, inputValue, setInputValue, popupType, users
               }) {
    if (!show) return null;
    let title
    if (popupType === "deposit") {
        title = "Wieviel möchten sie einzahlen"
    } else if (popupType === "withdraw") {
        title = "Wieviel möchten sie auszahlen"
    } else if (popupType === "createUser") {
        title = "Geben sie ihre persönlichen Daten ein"
    } else if (popupType === "createBankAccount") {
        title = "Geben sie einen User ein"
    }
    let form;

    if (popupType === "deposit" || popupType === "withdraw") {
        form = (<Form>
            <Form.Group>
                <Form.Control
                    name="amount"
                    type="number"
                    value={inputValue.amount}
                    onChange={(e) => handleChange(e)}
                    placeholder="Gib eine Zahl ein..."
                />
            </Form.Group>
        </Form>)
    } else if (popupType === "createUser") {
        form = (<Form.Group>
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
        </Form.Group>)
    } else if (popupType === "createBankAccount") {
        form = (
            <FormGroup>
                <Form.Label>Select User</Form.Label>
                <DropdownButton id="dropdown-basic-button" title={inputValue.userid}>
                    {users.map(user => <Dropdown.Item key={user.userid} onClick={() => {
                        setInputValue({
                            ...inputValue,
                            userid: user.userid
                        })
                    }}>{user.userid}</Dropdown.Item>)}
                </DropdownButton>
            </FormGroup>)
    }

    const handleChange = (event) => {
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value,
        })
        console.log(inputValue)
    }

    return (<Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {form}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Abbrechen
            </Button>
            <Button variant="success" onClick={onConfirm}>
                Bestätigen
            </Button>
        </Modal.Footer>
    </Modal>)
}

function Transactions({transactions}) {

    if (transactions.length === 0) {
        return
    }


    return (<Table striped bordered hover>
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
        {transactions.map(transaction => <tr key={transaction.transactionID}>
            <th>{transaction.transactionID}</th>
            <th>{transaction.accountID}</th>
            <th>{transaction.transaction}</th>
            <th>{new Date(transaction.datum).toLocaleDateString()}</th>
            <th>{transaction.amount}</th>
        </tr>)}
        </tbody>
    </Table>)
}

function Users({users}) {


    return (<Table striped bordered hover>
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
        {users.map(user => <tr key={user.userid}>
            <th>{user.userid}</th>
            <th>{user.vorname}</th>
            <th>{user.nachname}</th>
            <th>{new Date(user.geburtstag).toLocaleDateString()}</th>
            <th>{user.telefonnummer}</th>
            <th>{user.email}</th>
        </tr>)}
        </tbody>
    </Table>)
}

export default App
