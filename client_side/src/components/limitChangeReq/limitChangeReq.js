import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Form, InputGroup} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './limitChangeReq.css';

async function submitLimitChangeRequest(details) {
    return fetch('http://localhost:3000/users/loanApplicationSubmission/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
        })
        .then(data => data.json())
    }


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }


class LimitChangeReq extends Component {  
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
        console.log(this.state.amountRequested, this.state.loanType, this.state.collectDate)
        const application = await submitLimitChangeRequest({
            id: this.state.user_id, amountRequested: this.state.amountRequested, loanType: this.state.loanType, collectDate: this.state.collectDate
        });
        alert("Application Entered Successfully");
        console.log(application)
        this.props.navigate("/users/" + localStorage.getItem("user"));
                
    }

    componentDidMount(){
        
        let { id, account_id} = this.props.params;
        
        const urls = [
            'http://localhost:3000/users/logged/'+id,
            'http://localhost:3000/users/account/' + id + '/' + account_id,
            
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
                    account : responses[1],
                    
                });
            });
            {this.state.account.map(account =>
                {console.log('account', account)}
            )}
            
    }

    

    render (){
        return (
                <Container fluid style={{ fontcolor: 'black' }}>
                    <Row >
                        <Col className="mh-100" md lg="12">
                            <Row>
                                {this.state.account.map(account =>
                                    <h2> Limit Change Request for Account #: {account.account_id}</h2>
                                )}
                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="12">
                                    <Row>
                                        {this.state.account.map(account =>
                                                <h5>Current Limit: {account.credit_limit}</h5>
                                            )}
                                    </Row>
                                    <Row>
                                        <h5>Change Type:</h5>
                                        <Form>
                                            {['radio'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                <Form.Check 
                                                    type={type}
                                                    id={`default-${type}`}
                                                    label={`Increase`}
                                                    name = "select"
                                                />

                                                <Form.Check 
                                                    type={type}
                                                    id={`default-${type}`}
                                                    label={`Decrease`}
                                                    name = "select"
                                                />
                                                </div>
                                            ))}
                                        </Form>
                                    </Row>
                                    <Row>
                                        <h5>New Limit:</h5>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Form.Control aria-label="Amount (to the nearest dollar)" />
                                            <InputGroup.Text>.00</InputGroup.Text>
                                        </InputGroup>
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

export default withParams(LimitChangeReq);
