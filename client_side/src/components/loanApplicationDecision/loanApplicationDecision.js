import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Form, InputGroup} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate} from 'react-router-dom'
import styles from './loanApplicationDecision.css';

import AdminHome from '../adminHome/adminHome';

import 'bootstrap/dist/css/bootstrap.min.css'

async function loanApplicationDecision(details) {
    return fetch('http://localhost:3000/users/loanApplicationDecision/', {
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


class LoanApplicationDecision extends Component {  
    constructor(){
        super();
        this.state = {
            loanApplication: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async handleSubmit(e){
        e.preventDefault()
        console.log(this.state.decision,this.state.interest, this.state.loanApplication[0].loan_application)
        const choice = await loanApplicationDecision({
            decision: this.state.decision, interest: this.state.interest, user_id: this.state.loanApplication[0].user_id, loan_id: this.state.loanApplication[0].loan_id, total_value: this.state.loanApplication[0].amount_requested, loan_type: this.state.loanApplication[0].loan_type, final_payment_date: ((this.state.loanApplication[0].final_payment_date).slice(0,10)), loan_id: this.state.loanApplication[0].loan_application
        });
        alert("Application Entered Successfully");
        console.log(choice)
        this.props.navigate("/adminHome/");
                
    }

    componentDidMount(){
        let { currLoan } = this.props.params;
        console.log('this.props.params', this.props.params.loan_id)
        const urls = [
            'http://localhost:3000/users/loanApplications/' + this.props.params.loan_id,

        ]
        let requests = urls.map((url) => fetch(url));
        
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                this.setState({
                    loanApplication : responses[0],
                });

            });
    
    }

    

    render (){
        return (
                <Container fluid style={{ fontcolor: 'black' }}>

                    <Row >
                        <Col className="mh-100" md lg="12">
                            <Row>
                                {this.state.loanApplication.map(account =>
                                    <h2> Loan Application for User #: {account.fk_user_num}</h2>
                                )}

                            </Row>
                            <Row>
                                {this.state.loanApplication.map(loan =>
                                    <h2> Loan Application for Loan #: {loan.loan_application}</h2>
                                )}
                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="12">
                                    <Row>
                                    {this.state.loanApplication.map( user =>
                                        <h5>Full Name: {user.first_name} {user.last_name}</h5>
                                    )}
                                    </Row>
                                    <Row>
                                        {this.state.loanApplication.map(loan =>
                                            <h5>Amount Requested: {loan.amount_requested}</h5>
                                        )}
                                    </Row>
                                    
                                    <Row>
                                        {this.state.loanApplication.map(loan =>
                                            <h5>Expected Date to Collect: {(loan.final_payment_date).slice(0,10)}</h5>
                                        )}
                                    </Row>
                                    <Row>
                                        {this.state.loanApplication.map(loan =>
                                            <h5>Type: {loan.loan_type}</h5>
                                        )}
                                    </Row>
                                    <Row>
                                        {this.state.loanApplication.map( user =>
                                            <h5>User Credit Score: {user.credit_score}</h5>
                                        )}
                                    </Row>
                                    <Row>
                                        <h5>Approval Decision:</h5>
                                        <Form.Select aria-label="Make Decision"
                                            onChange={e => this.setState({ decision: e.target.value })}
                                        >
                                            <option value={"select"}>Make Decision</option>
                                            <option value={"approved"}>Approve</option>
                                            <option value={"denied"}>Deny</option>


                                        </Form.Select>
                                    </Row>
                                    <Row>
                                        <h5>Interest:</h5>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                            placeholder="Interest"
                                            aria-label="Interest"
                                            aria-describedby="basic-addon2"
                                            onChange={e => this.setState({ interest: e.target.value })}

                                            />
                                            <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <h1> </h1>
                                    </Row>
                                    <Button variant="dark"
                                        onClick={this.handleSubmit}
                                    >Submit</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        );
    }  
}

export default withParams(LoanApplicationDecision);
