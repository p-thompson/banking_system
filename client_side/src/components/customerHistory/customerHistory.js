import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Dropdown} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './customerHistory.css';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class CustomerHistory extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            account: [],
            weekTransactions: [],
            monthTransactions: [],
            yearTransactions: [],
            weekDay: [],
            monthDay: [],
            yearDay: [],
            frequentMonth: [],
            frequentWeekMonth: [],
            frequentWeekYear: [],
            allAccounts: [],
        }
    }

    componentDidMount(){
        
        let { id , account_id } = this.props.params;

        console.log(id)
        const urls = [
            'http://localhost:3000/users/logged/'+id,
            'http://localhost:3000/users/account/'+id+"/"+account_id,
            'http://localhost:3000/users/transactions/'+id+"/"+account_id+"/0",
            'http://localhost:3000/users/transactions/'+id+"/"+account_id+"/1",
            'http://localhost:3000/users/transactions/'+id+"/"+account_id+"/2",
            'http://localhost:3000/users/frequentDay/'+id+"/"+account_id+"/0",
            'http://localhost:3000/users/frequentDay/'+id+"/"+account_id+"/1",
            'http://localhost:3000/users/frequentDay/'+id+"/"+account_id+"/2",
            'http://localhost:3000/users/frequentMonth/'+id+"/"+account_id,
            'http://localhost:3000/users/frequentWeek/'+id+"/"+account_id+"/1",
            'http://localhost:3000/users/frequentWeek/'+id+"/"+account_id+"/2",
            'http://localhost:3000/users/account/'+ id,

            
        ]
        this.state.user_id = id;
        this.state.account_id = account_id;
        let requests = urls.map((url) => fetch(url));
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                this.setState({
                    user : responses[0],
                    account : responses[1],
                    weekTransactions: responses[2],
                    monthTransactions: responses[3],
                    yearTransactions: responses[4],
                    weekDay: responses[5],
                    monthDay: responses[6],
                    yearDay: responses[7],
                    frequentMonth: responses[8],
                    frequentWeekMonth: responses[9],
                    frequentWeekYear: responses[10],
                    allAccounts: responses[11],
                });
            });
        console.log(this.state.weekTransactions);    
    }

    render (){
        var weeklyShoppingTotal = 0.00;
        var weeklyFAndD = 0.00;
        var weeklyTransportation = 0.00;
        var weeklyOther = 0.00;
        
        var dayDict = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"};
        var monthDict = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"};

        var monthlyShoppingTotal = 0.00;
        var monthlyFAndD = 0.00;
        var monthlyTransportation = 0.00;
        var monthlyOther = 0.00;

        var yearlyShoppingTotal = 0.00;
        var yearlyFAndD = 0.00;
        var yearlyTransportation = 0.00;
        var yearlyOther = 0.00;
       
        return (
                <Container fluid style={{ fontcolor: 'black' }}>
                    <Row >
                        <Col md lg="12">
                            <Col md lg= "7">
                                <Dropdown>
            
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Select Account
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu 
                                        onSelect={e => localStorage.setItem("account", e)}
                                    >
                                        {this.state.allAccounts.map(account =>
                                            <Dropdown.Item href={"http://localhost:3001/history/" + this.state.user_id + "/" + account.account_id} >{account.account_id}</Dropdown.Item>

                                        )}                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md lg="10">
                                <h2> Account History Report for Account #: {this.state.account_id}</h2>
                            </Col>
                        </Col>
                        <Col className="mh-100" md lg="4">
                            <Row>
                                <h5>Past Week</h5>
                            </Row>
                            <Row>
                                {this.state.weekTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "shopping"){
                                            weeklyShoppingTotal += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Shopping: {weeklyShoppingTotal}</p>

                            </Row>
                            <Row>
                                {this.state.weekTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "food and drink"){
                                            weeklyFAndD += transaction.amount;
                                        };
                                        console.log(weeklyFAndD);
                                    }
                                    
                                )}
                                <p> Food and Drink: {weeklyFAndD}</p>
                                
                            </Row>
                            <Row>

                                {this.state.weekTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "transportation"){
                                            weeklyTransportation += transaction.amount;
                                        };
                                        console.log(weeklyTransportation);
                                    }
                                    
                                )}
                                <p> Transportation: {weeklyTransportation}</p>
                            </Row>
                            
                            <Row>
                                {this.state.weekTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "other"){
                                            weeklyOther += transaction.amount;
                                        };
                                        console.log(weeklyOther);
                                    }
                                    
                                )}
                                <p> Other: {weeklyOther}</p>
                            </Row>
                            <Row>
                                {this.state.weekDay.map(weekDay =>
                                    <p>The weekday you spend the most money on is {dayDict[weekDay.mostFrequent]}</p>
                                )}
                            </Row>
                        </Col>
                        <Col className="mh-100" md lg="4">
                            <Row>
                                <h5>Past Month</h5>
                            </Row>
                            <Row>
                                {this.state.monthTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "shopping"){
                                            monthlyShoppingTotal += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Shopping: {monthlyShoppingTotal}</p>

                            </Row>
                            <Row>
                                {this.state.monthTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "food and drink"){
                                            monthlyFAndD += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Food and Drink: {monthlyFAndD}</p>
                                
                            </Row>
                            <Row>

                                {this.state.monthTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "transportation"){
                                            monthlyTransportation += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Transportation: {monthlyTransportation}</p>
                            </Row>
                            
                            <Row>
                                {this.state.monthTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "other"){
                                            monthlyOther += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Other: {monthlyOther}</p>
                            </Row>
                            <Row>
                                {this.state.weekDay.map(monthDay =>
                                    <p>The weekday you spend the most money on is {dayDict[monthDay.mostFrequent]}</p>
                                )}
                            </Row>
                            <Row>
                                {this.state.frequentWeekMonth.map(date =>
                                        <p>You spend the most money during the week of {date.startDay} to {date.endDay}</p>
                                )}
                            </Row>
                        </Col>
                        <Col className="mh-100" md lg="4">
                            <Row>
                                <h5>Past Year</h5>
                            </Row>
                            <Row>
                                {this.state.yearTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "shopping"){
                                            yearlyShoppingTotal += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Shopping: {yearlyShoppingTotal}</p>

                            </Row>
                            <Row>
                                {this.state.yearTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "food and drink"){
                                            yearlyFAndD += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Food and Drink: {yearlyFAndD}</p>
                                
                            </Row>
                            <Row>

                                {this.state.yearTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "transportation"){
                                            yearlyTransportation += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Transportation: {yearlyTransportation}</p>
                            </Row>
                            
                            <Row>
                                {this.state.yearTransactions.map(transaction =>
                                    {
                                        if (transaction.purchase_sector == "other"){
                                            yearlyOther += transaction.amount;
                                        };
                                    }
                                    
                                )}
                                <p> Other: {yearlyOther}</p>
                            </Row>
                            <Row>
                                {this.state.yearDay.map(weekDay =>
                                    <p>The weekday you spend the most money on is {dayDict[weekDay.mostFrequent]}</p>
                                )}
                            </Row>
                            <Row>
                                {this.state.frequentWeekYear.map(date =>
                                        <p>You spend the most money during the week of {date.startDay} to {date.endDay}</p>
                                )}
                            </Row>
                            <Row>
                                {this.state.frequentMonth.map(month =>
                                    <p>The month you spend the most money is {monthDict[month.mostFrequent]}</p>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
        );
    }  
}

export default withParams(CustomerHistory);
