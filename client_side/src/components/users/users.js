import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Table} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './users.css';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
  

class Users extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            account: [],
            
        }
        
        
    }

    componentDidMount(){
        
        let { id } = this.props.params;
        id = localStorage.getItem("user");
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
                                    <h2> User ID #: {user.user_id}</h2>
                                    )}
                            </Row>
                            <Row >
                                <Col className="mh-100" md lg="6">
                                    <table className="table">
                                
                                        <thead>
                                            <tr>
                                            <th scope="col">Account #</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Balance ($)</th>
                                            <th scope="col">Limit ($)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.account.map(account =>
                                                <tr key={account.account_id}>
                                                    <th scope="row">
                                                        <a 
                                                            href={"http://localhost:3001/customerDetails/" + this.state.user_id + "/" + account.account_id}
                                                            onClick={localStorage.setItem("account", account.account_id)}
                                                        >
                                                        {account.account_id}
                                                        </a>
                                                    </th>
                                                    <td key={account.account_type}>
                                                        {account.account_type}
                                                    </td>
                                                    <td key={account.balance}>
                                                        {account.balance}
                                                    </td>
                                                    <td key={account.credit_limit}>
                                                        {account.credit_limit}
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

export default withParams(Users);
