
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Users from './components/users/users'
import Login from './components/login/login'
import MakeTransaction from './components/makeTransaction/makeTransaction';
import CustomerDetails from './components/customerDetails/customerDetails';
import LimitChangeReq from './components/limitChangeReq/limitChangeReq';
import CustomerLoans from './components/customerLoans/customerLoans';
import LoanApplication from './components/loanApplication/loanApplication';
import MakeLoanPayment from './components/makeLoanPayment/makeLoanPayment';
import CustomerHistory from './components/customerHistory/customerHistory';
import AdminCreditLimitApplications from './components/adminCreditLimitApplications/adminCreditLimitApplications';
import CreditChangeApplicationDecision from './components/creditChangeApplicationDecision/creditChangeApplicationDecision';
import AdminHome from './components/adminHome/adminHome';
import AdminLoanApplications from './components/adminLoanApplications/adminLoanApplications';
import LoanApplicationDecision from './components/loanApplicationDecision/loanApplicationDecision';

function App() {

  return (
    
      <Container id="main-container" fluid style={{ fontcolor: 'black' }}>
          <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">Bank</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                {localStorage.getItem("type") == "customer" && 
                    <Nav.Link href={"http://localhost:3001/users/" + localStorage.getItem("user")}>Home</Nav.Link>

                }
                {localStorage.getItem("type") == "customer" &&             
                  <Nav.Link href={"http://localhost:3001/maketransaction/" + localStorage.getItem("user")}>
                    Make Transaction
                  </Nav.Link>
                }
                {localStorage.getItem("type") == "customer" && 
                  <Nav.Link href={"http://localhost:3001/customerLoans/" + localStorage.getItem("user")}>
                    Loan Information
                  </Nav.Link>
                }
                {localStorage.getItem("type") == "customer" && 
                  <Nav.Link href={"http://localhost:3001/history/" + localStorage.getItem("user") + "/" + localStorage.getItem("account")}>
                    History
                  </Nav.Link>
                }
                {/* if they are admin */}
                {localStorage.getItem("type") == "admin" && 
                    <Nav.Link href="http://localhost:3001/adminHome">
                    Home
                    </Nav.Link>
                }
                {localStorage.getItem("type") == "admin" && 
                    <Nav.Link href="http://localhost:3001/creditLimitApplications">
                    Credit Limit Applications
                    </Nav.Link>
                }
                {localStorage.getItem("type") == "admin" && 
                    <Nav.Link href="http://localhost:3001/loanApplications">
                    Loan Applications
                    </Nav.Link>
                }
                
                
              </Nav>
                
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Router>
          <Routes>
            <Route path="/users/:id" element={<Users/>}/>
            <Route path="/customerDetails/:id/:account_id" element={<CustomerDetails/>}/>
            <Route path="/maketransaction/:id" element={<MakeTransaction/>}/>
            <Route path="/limitChangeRequest/:id/:account_id" element={<LimitChangeReq/>}/>
            <Route path="/customerLoans/:id" element={<CustomerLoans/>}/>
            <Route path="/loanApplication/:id" element={<LoanApplication/>}/>
            <Route path="/makeLoanPayment/:id" element={<MakeLoanPayment/>}/>
            <Route path="/history/:id/:account_id" element={<CustomerHistory/>}/>
            <Route path="/creditLimitApplications" element={<AdminCreditLimitApplications/>}/>
            <Route path="/creditChangeDecision/:id/:account_id" element={<CreditChangeApplicationDecision/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/adminHome" element={<AdminHome/>}/>
            <Route path="/loanApplications" element={<AdminLoanApplications/>}/>
            <Route path="/loanApplicationDecision/:loan_id" element={<LoanApplicationDecision/>}/>



          </Routes>
              
        </Router>
        
      </Container>
  
  );
}

export default App;
