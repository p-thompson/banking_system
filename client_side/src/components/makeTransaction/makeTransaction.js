import React, {Component} from 'react'
import {Button , Container, Row, Col, Form, InputGroup} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './makeTransaction.css';


async function performTransactions(details) {
    return fetch('http://localhost:3000/users/performTransactions/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
        })
        .then(data => data.json())
    }




function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()}/>;
  }

class MakeTransaction extends Component {  
    constructor(){

        super();
        this.state = {
            user:[],
            account: [],
            
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async handleSubmit(e){
        e.preventDefault()
        console.log(localStorage.getItem("user"), this.state.transactAmount, this.state.fromAccount, this.state.toAccount)
        const transaction = await performTransactions({
            id: localStorage.getItem("user"), transactAmount: this.state.transactAmount, fromAccount: this.state.fromAccount, toAccount: this.state.toAccount,
        });
        alert("Transaction Entered Successfully");
        console.log(transaction)
        this.props.navigate("/users/" + localStorage.getItem("user"));
                
    }

    componentDidMount(){

        let { id } = this.props.params;
        id = localStorage.getItem("user");

        const urls = [
            'http://localhost:3000/users/logged/'+id,
            'http://localhost:3000/users/account/'+id
            
        ]
        let requests = urls.map((url) => fetch(url));

        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                this.setState({
                    user : responses[0],
                    account : responses[1],
                    
                });
            });
    
    }

    

    render (){


        return (
                <Container fluid style={{ fontcolor: 'black' }}>
                    <Row >
                        <Col className="mh-100" md lg="12">
                            <Row>
                                {this.state.user.map(user =>
                                    <h2> New Transaction for User #: {localStorage.getItem("user")}</h2>
                                )}
                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="6">
                                    <Row>
                                        <h5>Transaction Amount:</h5>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Form.Control aria-label="Amount (to the nearest dollar)" 
                                                onChange={(e) => this.setState({ transactAmount: e.target.value })}
                                            />
                                            <InputGroup.Text>.00</InputGroup.Text>
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <h5>From Account #:</h5>
                                        <Form.Select aria-label="Select Account"
                                            onChange={(e) => this.setState({ fromAccount: e.target.value })}
                                        >
                                            <option value={'select'}>Select Account</option>
                                            {this.state.account.map(account =>
                                                <option value={account.account_id}>{account.account_id}</option>

                                            )}
                                        </Form.Select>
                                    </Row>
                                    <Row>
                                        <h1> </h1>
                                    </Row>
                                    <Row>
                                        <h5>To Account #:</h5>
                                        <Form.Select 
                                            aria-label="Select Account"

                                            onChange={(e) => this.setState({toAccount: e.target.value})}
                                        >
                                            <option value={'select'}>Select Account</option>

                                            {this.state.account.map(account =>
                                                <option value={account.account_id}>{account.account_id}</option>

                                            )}
                                        </Form.Select>
                                    </Row>
                                    <Row>
                                        <h5> </h5>
                                    </Row>
                                
                                </Col>
                            </Row>
                            <Button variant="dark"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Container>
        );
    }  
}

export default withParams(MakeTransaction);
