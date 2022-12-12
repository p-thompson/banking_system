import React, {Component} from 'react'
import {Button , Card , Container, Row, Col} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './customerLoans.css';



function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
  

class CustomerLoans extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            account: [],
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
                    account : responses[1],
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
                                            <h2> Loans for User ID #: {user.user_id}</h2>
                                        )}
                            </Row>
                            <Row>
                                <Col className="mh-100" md lg="12">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Loan ID #</th>
                                            <th scope="col">Value ($)</th>
                                            <th scope="col">Amount Owed ($)</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Interest (%)</th>
                                            <th scope="col">Approved?</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.loans.map(loans =>
                                                <tr key={loans.loan_id}>
                                                    <th scope="row">
                                                        {loans.loan_id}
                                                        {console.log(loans.loan_id)}
                                                    </th>
                                                    <td>
                                                        {loans.total_value}
                                                    </td>
                                                    <td>
                                                        {loans.amount_owed}
                                                    </td>
                                                    <td>
                                                        {loans.type}
                                                    </td>
                                                    <td>
                                                        {loans.interest}
                                                    </td>
                                                    <td>
                                                        {loans.approval}
                                                    </td>
                                                </tr>      
                                            )}
                                        </tbody>
                                    </table>
                                </Col>
                                <a href={"http://localhost:3001/loanApplication/" + this.state.user_id}>Create New Loan Application</a>
                                <a href={"http://localhost:3001/makeLoanPayment/" + this.state.user_id}>Make Loan Payment</a>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        );
    }  
}

export default withParams(CustomerLoans);
