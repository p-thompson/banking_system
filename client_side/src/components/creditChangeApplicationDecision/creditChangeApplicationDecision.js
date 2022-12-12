import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Form, InputGroup} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './creditChangeApplicationDecision.css';




function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class CreditChangeApplicationDecision extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            accounts: [],
            //creditLimitApplication: [],
        }
    }

    componentDidMount(){
        
        let { id , account_id } = this.props.params;
        
        const urls = [
            'http://localhost:3000/users/logged/'+id,
            'http://localhost:3000/users/creditLimitApplications/'+id+"/"+account_id,
            
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
                    
                });
            });
    
    }

    

    render (){
        return (
                <Container fluid style={{ fontcolor: 'black' }}>
                    <Row >
                        <Col className="mh-100" md lg="12">
                            <Row>
                                {this.state.accounts.map(account =>
                                    <h2> Credit Limit Change for Account #: {account.account_id}</h2>
                                )}

                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="12">
                                    <Row>
                                        {this.state.user.map( user =>
                                            <h5>User ID #: {user.user_id}</h5>
                                        )}
                                    </Row>
                                    <Row>
                                    {this.state.user.map( user =>
                                        <h5>Full Name: {user.first_name} {user.last_name}</h5>
                                    )}
                                    </Row>
                                    <Row>
                                        {this.state.accounts.map(change =>
                                            <h5>Increase or Decrease: {change.limit_type}</h5>
                                        )}
                                    </Row>
                                    <Row>
                                        {this.state.accounts.map(change =>
                                            <h5> New Amount Requested: {change.limit_request}</h5>
                                        )}
                                    </Row>
                                    <Row>
                                        {this.state.user.map( user =>
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
                                        <h1> </h1>
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

export default withParams(CreditChangeApplicationDecision);
