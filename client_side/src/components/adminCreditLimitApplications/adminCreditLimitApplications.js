import React, {Component} from 'react'
import {Button , Card , Container, Row, Col} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './adminCreditLimitApplications.css';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class AdminCreditLimitApplications extends Component {  
    constructor(){
        super();
        this.state = {
            creditLimitApplications: [],
        }
    }

    componentDidMount(){
        
        const urls = [

            'http://localhost:3000/users/creditLimitApplications',
            
        ]
        
        let requests = urls.map((url) => fetch(url));
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                this.setState({
                    creditLimitApplications: responses[0],
                    
                });
            });
    
    }

    

    render (){
        return (
                <Container fluid style={{ fontcolor: 'black' }}>
                    <Row >
                        <Col className="mh-100" md lg="12">
                            <Row>
                                <h2>Credit Limit Change Applcations</h2>
                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="12">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Account #</th>
                                            <th scope="col">User ID #</th>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Requested Change Type</th>
                                            <th scope="col">Requested Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.creditLimitApplications.map(change =>
                                                <tr key={change.account_id}>
                                                    <td>
                                                        <a href={"http://localhost:3001/creditChangeDecision/" + change.user_id + "/" + change.account_id} >
                                                        {change.account_id}
                                                        </a>
                                                    </td>
                                                    <th scope="row">
                                                        {change.user_id}
                                                    </th>
                                                    <td>
                                                        
                                                        <p>{change.first_name} {change.last_name}</p>
                                                        
                                                    </td>
                                                    <td>
                                                        {change.limit_type}
                                                    </td>
                                                    <td>
                                                        {change.limit_request}
                                                    </td>
                                                </tr>      
                                            )}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        );
    }  
}

export default withParams(AdminCreditLimitApplications);
