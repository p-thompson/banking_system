import React, {Component} from 'react'
import {Button , Card , Container, Row, Col} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './adminLoanApplications.css';



function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
class AdminLoanApplications extends Component {  
    constructor(){
        super();
        this.state = {
            loanApplications: [],
        }
    }

    componentDidMount(){
        const urls = [
            'http://localhost:3000/users/loanApplications'

        ]
        let requests = urls.map((url) => fetch(url));
        
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                this.setState({
                    loanApplications : responses[0],
                });
            })
    
    }

    

    render (){
        return (
                <Container fluid style={{ fontcolor: 'black' }}>
                    <Row >
                        <Col className="mh-100" md lg="12">
                            <Row>
                                <h2> Loans Applcations</h2>
                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="12">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Loan Application #</th>
                                            <th scope="col">User ID #</th>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Requested Value ($)</th>
                                            <th scope="col">Final Payment Date</th>
                                            <th scope="col">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.loanApplications.map(loan =>
                                                <tr key={loan.loan_application}>
                                                    <td>
                                                        <a href={"http://localhost:3001/loanApplicationDecision/" + loan.loan_application}>
                                                            {loan.loan_application}
                                                        </a>
                                                    </td>

                                                    <td>
                                                        {loan.fk_user_num}
                                                    </td>
                                                    
                                                    <td>
                                                        <p>{loan.first_name} {loan.last_name}</p>
                                                        
                                                    </td>
                                                    <td>
                                                        {loan.amount_requested}
                                                    </td>
                                                    <td>
                                                        {(loan.final_payment_date).slice(0,10)}
                                                        {console.log(typeof(loan.final_payment_date))}
                                                    </td>
                                                    <td>
                                                        {loan.loan_type}
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

export default withParams(AdminLoanApplications);
