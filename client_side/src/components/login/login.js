import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Table} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate} from 'react-router-dom'
import Users from '../users/users'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './login.css';


async function loginUser(credentials) {
return fetch('http://localhost:3000/users/login/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
  }

class Login extends Component {  
    constructor(){
        super();
                
        this.state = {
            username: "username",
            password: "password",
            
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    async handleSubmit(e){
        e.preventDefault()
        
        const user = await loginUser({
            username: this.state.username, password: this.state.password
        });
        console.log(user)
        
        localStorage.setItem("authenticated", true);
        localStorage.setItem("user", user[0].user_id);
        localStorage.setItem("type", user[0].type);
        localStorage.setItem("account", user[0].account_id);
        if (localStorage.getItem("type") == "customer") {
            this.props.navigate("/users/" + user[0].user_id);
        }
        else {this.props.navigate("/adminHome" );}
                
    }

    componentDidMount(){
        
        
    }

    

    render (){
        return (
           
            <div>
            <p>Welcome Back</p>
            <form onSubmit={this.handleSubmit}>
            <input
            type="text"
            name="Username"
            value={this.username}
            onChange={(e) => this.setState({username: e.target.value})}
            />
            <input
            type="password"
            name="Password"
            onChange={(e) => this.setState({password: e.target.value})}
            />
            <input type="submit" value="Submit" />
            </form>
            </div>
                
                 
                
           
        );
    }  
}

export default withParams(Login);