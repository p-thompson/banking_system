import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Form, InputGroup} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './makeLoanPayment.css';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
  

class MakeLoanPayment extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            accounts: [],
            loans: [],
        }
    }

    componentDidMount(){
        
        let { id } = this.props.params;
        
        const urls = [
            'http://localhost:3000/users/logged/'+id,
            'http://localhost:3000/users/account/'+id,
            'http://localhost:3000/users/loans/'+id,

        ]
        this.state.user_id = id;
        let requests = urls.map((url) => fetch(url));
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                this.setState({
                    user : responses[0],
                    accounts : responses[1],
                    loans : responses[2],
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
                                    <h2> New Loan Payment for User #: {user.user_id}</h2>
                                )}
                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="6">
                                    <Row>
                                        <h5>Loan Payment Amount:</h5>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Form.Control aria-label="Amount (to the nearest dollar)" />
                                            <InputGroup.Text>.00</InputGroup.Text>
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <h5>From Account #:</h5>
                                        <Form.Select aria-label="Select Account"
                                            onChange={e => this.setState({ fromAccount: e.target.value })}
                                        >
                                            {this.state.accounts.map(account =>
                                                <option value={account.account_id}>{account.account_id}</option>

                                            )}
                                        </Form.Select>
                                    </Row>
                                    <Row>
                                        <h1> </h1>
                                    </Row>
                                    <Row>
                                        <h5>For Loan #:</h5>
                                        <Form.Select aria-label="Select Type"
                                            onChange={e => this.setState({ forLoan: e.target.value })}

                                        >
                                            {this.state.loans.map(loan =>
                                                <option value={loan.loan_id}>{loan.loan_id}</option>

                                            )}
                                        </Form.Select>
                                    </Row>
                                    <Row>
                                        <h5> </h5>
                                    </Row>
                                    <Button variant="dark">Submit</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        );
    }  
}

export default withParams(MakeLoanPayment);
