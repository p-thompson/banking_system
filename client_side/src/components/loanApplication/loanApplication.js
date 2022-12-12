import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Form, InputGroup} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import users from '../users/users'
import styles from './loanApplication.css';


async function submitApplication(details) {
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
    return props => <Component {...props} params={useParams()} navigate={useNavigate()}/>;
  }
  


class LoanApplication extends Component {  
    constructor(){
        super();
        this.state = {
            user:[ ],
            accounts: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault()
        console.log(this.state.amountRequested, this.state.loanType, this.state.collectDate)
        const application = await submitApplication({
            id: this.state.user_id, amountRequested: this.state.amountRequested, loanType: this.state.loanType, collectDate: this.state.collectDate
        });
        alert("Application Entered Successfully");
        console.log(application)
        this.props.navigate("/users/" + localStorage.getItem("user"));
                
    }

    componentDidMount(){
        
        let { id } = this.props.params;
        
        const urls = [
            'http://localhost:3000/users/logged/'+id,
            'http://localhost:3000/users/account/'+id
            
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
                                {this.state.user.map(user =>
                                            <h2> New Loan Application for User #: {user.user_id}</h2>
                                        )}
                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="6">
                                    <Row>
                                        <h5>Amount Requested:</h5>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Form.Control aria-label="Amount (to the nearest dollar)" 
                                                onChange={(e) => this.setState({amountRequested: e.target.value})}
                                            />
                                            <InputGroup.Text>.00</InputGroup.Text>
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <h5>Select Loan Type:</h5>
                                        <Form.Select aria-label="Select Type"
                                            onChange={(e) => this.setState({loanType: e.target.value})}
                                        >
                                            <option value="house">House</option>
                                            <option value="car">Car</option>
                                            <option value="college">College</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                    </Row>
                                    <Row>
                                        <h1> </h1>
                                    </Row>
                                    <Row>
                                        <h5>Expected Date to Collect</h5>
                                        <Form.Control
                                            type="collectdate"
                                            id="inputdate"
                                            aria-describedby="collecinputdate"
                                            onChange={(e) => this.setState({collectDate: e.target.value})}

                                        />
                                        <Form.Text id="inputdate">
                                            Format: YYYY-MM-DD
                                        </Form.Text>
                                    </Row>
                                    <Row>
                                        <h5> </h5>
                                    </Row>
                                    <Button variant="dark"
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        );
    }  
}

export default withParams(LoanApplication);
