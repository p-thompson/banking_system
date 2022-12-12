import React, {Component} from 'react'
import {Button , Card , Container, Row, Col} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './customerDetails.css';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class CustomerDetails extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            account: [],
            
        }
    }

    componentDidMount(){
        
        let { id, account_id } = this.props.params;
        console.log(this.props.params.account_id)
        const urls = [
            'http://localhost:3000/users/logged/'+id,
            'http://localhost:3000/users/account/'+id+'/'+ account_id
            
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
                                <h2> Account Details for #: {this.props.params.account_id}</h2>
                            </Row>
                            <Row>
                                {this.state.account.map(account =>
                                    <h5> Balance: {account.balance}</h5>
                                )}
                            </Row>
                            <Row>
                                {this.state.account.map(account =>
                                            <h5> Type: {account.account_type}</h5>
                                        )}
                            </Row>
                            <Row>
                                {this.state.account.map(account =>
                                            <h5> Limit: {account.credit_limit}</h5>
                                        )}
                                    
                                <a href={"http://localhost:3001/limitChangeRequest/"+ this.props.params.id + "/" + this.props.params.account_id}>
                                    Create Limit Change Request
                                </a>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        );
    }  
}

export default withParams(CustomerDetails);
