const express = require('express')
var cors = require('cors');
const conn = require('./routes/db')
const app = express()

var bodyParser = require('body-parser');
const { createPool } = require('mysql');

var jsonParser = bodyParser.json()

const port = 3000

app.use(cors({origin: 'http://localhost:3001'}));


function insert_withdraw_transaction(fromAccount, transactAmount){
  var promise = new Promise( function(resolve, reject) {
    conn.query(`INSERT INTO bank_database.transaction
    (fk_account_id, amount, date, type, purchase_sector)
    VALUES ('${fromAccount}', '${transactAmount}', 'now()', 'withdraw', 'other')`, (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from logged is: ', rows)
        res.json(rows)
    });
  });
 
  return promise;
}

function insert_deposit_transaction(toAccount, transactAmount){
  var promise = new Promise( function(resolve, reject) {
    conn.query(`INSERT INTO bank_database.transaction
    (fk_account_id, amount, date, type, purchase_sector)
    VALUES ('${toAccount}', '${transactAmount}', 'now()', 'deposit', 'other')`, (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from logged is: ', rows)
        res.json(rows)
    });
  });
 
  return promise;
}

function subtract_balance_transaction(fromAccount, transactAmount){
  var promise = new Promise( function(resolve, reject) {
    conn.query(`update bank_database.account as acct
    set acct.balance = acct.balance - ${transactAmount}
    Where account_id = ${fromAccount}`, (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from logged is: ', rows)
        res.json(rows)
    });
  });
 
  return promise;
}

function add_balance_transaction(toAccount, transactAmount){
  var promise = new Promise( function(resolve, reject) {
    conn.query(`update bank_database.account as acct
    set acct.balance = acct.balance + ${transactAmount}
    Where account_id = ${toAccount}`, (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from logged is: ', rows)
        res.json(rows)
    });
  });
 
  return promise;
}


app.post('/users/login', jsonParser , (req, res) => {
  conn.query(`SELECT * FROM bank_database.user as User 
  LEFT JOIN bank_database.account as Acct 
  ON User.user_id = Acct.fk_user_id 
  WHERE username='${String(req.body.username)}' and password='${String(req.body.password)}'
  LIMIT 1`, (err, rows, fields) => {
      if (err) throw err
    
      console.log('The solution from logged is: ', rows)
      res.json(rows)
  })
  
  
})

app.post('/users/loanApplicationSubmission', jsonParser , (req, res) => {
  conn.query(`INSERT INTO bank_database.loan_application
  (fk_user_num, amount_requested, loan_type, final_payment_date, application_decision)
  VALUES ('${String(req.body.id)}', '${String(req.body.amountRequested)}', '${String(req.body.loanType)}', '${String(req.body.collectDate)}', 'pending')`, (err, rows, fields) => {
      if (err) throw err
    
      console.log('The solution from logged is: ', rows)
      res.json(rows)
  })
  
  
})

app.post('/users/performTransactions', jsonParser ,  async (req, res) => {
  console.log(req.body);
  conn.beginTransaction(); 
  try{

    //add balance
    conn.query(`update bank_database.account as acct
    set acct.balance = acct.balance + ${req.body.transactAmount}
    Where account_id = ${req.body.toAccount}`)

    //subtract balance

    conn.query(`update bank_database.account as acct
    set acct.balance = acct.balance - ${req.body.transactAmount}
    Where account_id = ${req.body.fromAccount}`)

    //insert deposit

    conn.query(`INSERT INTO bank_database.transaction
    (fk_account_id, amount, date, type, purchase_sector)
    VALUES ('${req.body.toAccount}', '${req.body.transactAmount}', '2022-12-08 12:30:20', 'deposit', 'other')`)

    //insert withdraw

    conn.query(`INSERT INTO bank_database.transaction
    (fk_account_id, amount, date, type, purchase_sector)
    VALUES ('${req.body.fromAccount}', '${req.body.transactAmount}', '2022-12-08 12:30:20', 'withdraw', 'other')`)

    conn.commit();
    res.json({response: "yay"})

  }catch (error){
    conn.rollback();
    throw error
  }
})


function insert_loan(user_id, total_value, interest, loan_type, final_payment_date, decision){
  var promise = new Promise( function(resolve, reject) {
    conn.query(`INSERT INTO bank_database.loan (fk_user_number, amount_owed, total_value, interest, type, final_payment_due, approval)
    VALUES ('${user_id}', '${total_value}', '${total_value}', '${interest}', '${loan_type}', '${final_payment_date}', '${decision}')`, (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from logged is: ', rows)
        res.json(rows)
    });
  });
 
  return promise;
}

function delete_loan_app(loan_id){
  var promise = new Promise( function(resolve, reject) {
    conn.query(`DELETE FROM bank_database.loan_application
    WHERE (loan_application = ${loan_id})`, (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from logged is: ', rows)
        res.json(rows)
    });
  });
 
  return promise;
}

app.post('/users/loanApplicationDecision', jsonParser , (req, res) => {
  console.log('req body', req.body);
  conn.beginTransaction(); 
  try{

    //write in loan table
    conn.query(`INSERT INTO bank_database.loan (fk_user_number, amount_owed, total_value, interest, type, final_payment_due, approval)
    VALUES ('${req.body.user_id}', '${req.body.total_value}', '${req.body.total_value}', '${req.body.interest}', '${req.body.loan_type}', '${req.body.final_payment_date}', '${req.body.decision}')`);

    //delete loan app
    conn.query(`DELETE FROM bank_database.loan_application
    WHERE (loan_application = ${req.body.loan_id})`);

    conn.commit();
    res.json({response: "complete"})

  }catch (error){
    conn.rollback();
    throw error
  }
  
})


app.get('/users/logged/:id', (req, res) => {
  id = req.params.id.substring(req.params.id.indexOf(':')+1);
    conn.query(`SELECT * FROM User as User where user_id=${id}`, (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution from logged is: ', rows)
        res.json(rows)
    })


})

app.get('/users/adminHome', (req, res) => {
    conn.query(`SELECT * FROM bank_database.account as Account`, (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from adminHome is: ', rows)
        res.json(rows)
    })


})

app.get('/users/account/:id', (req, res) => {
  id = req.params.id.substring(req.params.id.indexOf(':')+1);
   
    conn.query(`SELECT * FROM Account as Account where fk_user_id=${id}`, (err, rows, fields) => {
      if (err) throw err
    
      //console.log('The accounts are: ', rows)
      res.json(rows)
    })
})


app.get('/users/account/:id/:account_id', (req, res) => {
  account_id = req.params.account_id;
   
    conn.query(`SELECT * FROM Account as Account where account_id=${account_id}`, (err, rows, fields) => {
      if (err) throw err
    
      console.log('The accounts are: ', rows)
      res.json(rows)
    })
})

app.get('/users/transactions/:id/:account_id/:type', (req, res) => {
  id = req.params.id;
  account_id = req.params.account_id
  type = req.params.type;
    if (type == 0){
      conn.query(`SELECT * FROM bank_database.transaction AS transaction WHERE transaction.fk_account_id=${account_id} AND transaction.date >= now() - interval 7 day`, (err, rows, fields) => {
        if (err) throw err
      
        res.json(rows)
      })
    };
    if (type == 1){
      conn.query(`SELECT * FROM bank_database.transaction AS transaction WHERE transaction.fk_account_id=${account_id} AND transaction.date >= now() - interval 30 day`, (err, rows, fields) => {
        if (err) throw err
      
        res.json(rows)
      })
    };
    if (type == 2){
      conn.query(`SELECT * FROM bank_database.transaction AS transaction WHERE transaction.fk_account_id=${account_id} AND transaction.date >= now() - interval 365 day`, (err, rows, fields) => {
        if (err) throw err
      
        res.json(rows)
      })
    }
})

app.get('/users/frequentDay/:id/:account_id/:type', (req, res) => {
  id = req.params.id;
  account_id = req.params.account_id
  type = req.params.type;
    if (type == 0){
      conn.query(`SELECT (WEEKDAY(transaction.date)) as mostFrequent 
      FROM bank_database.transaction AS transaction 
      WHERE transaction.fk_account_id=${account_id} 
      AND transaction.date >= now() - interval 7 day
      GROUP BY mostFrequent ORDER BY COUNT(mostFrequent) DESC LIMIT 1`, (err, rows, fields) => {
        if (err) throw err
      
        res.json(rows)
      })
    };
    if (type == 1){
      conn.query(`SELECT (WEEKDAY(transaction.date)) as mostFrequent 
      FROM bank_database.transaction AS transaction 
      WHERE transaction.fk_account_id=${account_id} 
      AND transaction.date >= now() - interval 30 day
      GROUP BY mostFrequent ORDER BY COUNT(mostFrequent) DESC LIMIT 1`, (err, rows, fields) => {
        if (err) throw err
      
        res.json(rows)
      })
    };
    if (type == 2){
      conn.query(`SELECT (WEEKDAY(transaction.date)) as mostFrequent 
      FROM bank_database.transaction AS transaction 
      WHERE transaction.fk_account_id=${account_id} 
      AND transaction.date >= now() - interval 365 day
      GROUP BY mostFrequent ORDER BY COUNT(mostFrequent) DESC LIMIT 1`, (err, rows, fields) => {
        if (err) throw err
      
        res.json(rows)
      })
    }
})

app.get('/users/frequentMonth/:id/:account_id', (req, res) => {
  id = req.params.id;
  account_id = req.params.account_id
    conn.query(`SELECT (MONTH(transaction.date)) as mostFrequent
    FROM bank_database.transaction AS transaction
    WHERE transaction.fk_account_id=${account_id} 
    AND transaction.date >= now() - interval 365 day
    GROUP BY mostFrequent ORDER BY COUNT((mostFrequent)) DESC LIMIT 1`, (err, rows, fields) => {
      if (err) throw err
    
      res.json(rows)
    })

})


app.get('/users/frequentWeek/:id/:account_id/:type', (req, res) => {
  id = req.params.id;
  account_id = req.params.account_id
  type = req.params.type;
    if (type == 1){
      conn.query(`SELECT DATE_FORMAT(DATE_ADD(transaction.date, INTERVAL(1-DAYOFWEEK(transaction.date)) DAY), "%b %d") as startDay,
      DATE_FORMAT(DATE_ADD(transaction.date, INTERVAL(7-DAYOFWEEK(transaction.date)) DAY), "%b %d") as endDay
      FROM bank_database.transaction AS transaction
      WHERE transaction.fk_account_id=${account_id} 
      AND transaction.date >= now() - interval 30 day
      GROUP BY (WEEK(transaction.date)) ORDER BY COUNT((WEEK(transaction.date))) DESC LIMIT 1`, (err, rows, fields) => {
        if (err) throw err
      
        res.json(rows)
      })
    };
    if (type == 2){
      conn.query(`SELECT DATE_FORMAT(DATE_ADD(transaction.date, INTERVAL(1-DAYOFWEEK(transaction.date)) DAY), "%b %d") as startDay,
      DATE_FORMAT(DATE_ADD(transaction.date, INTERVAL(7-DAYOFWEEK(transaction.date)) DAY), "%b %d") as endDay
      FROM bank_database.transaction AS transaction
      WHERE transaction.fk_account_id=${account_id} 
      AND transaction.date >= now() - interval 365 day
      GROUP BY (WEEK(transaction.date)) ORDER BY COUNT((WEEK(transaction.date))) DESC LIMIT 1`, (err, rows, fields) => {
        if (err) throw err
      
        res.json(rows)
      })
    }
})

app.get('/users/loans/:id', (req, res) => {
  id = req.params.id.substring(req.params.id.indexOf(':')+1);
  //console.log("id is" , id); 
    conn.query(`SELECT * FROM Loan as Loan where fk_user_number=${id}`, (err, rows, fields) => {
      if (err) throw err
    
      //console.log('The accounts are: ', rows)
      //console.log(rows);
      res.json(rows)
    })
})


app.get('/users/creditLimitApplications', (req, res) => {
  //console.log("id is" , id); 
    conn.query(`SELECT * FROM bank_database.credit_limit_application AS CreditLimitApp
    JOIN bank_database.account as Acct 
    ON CreditLimitApp.fk_cl_account_number = Acct.account_id
    JOIN bank_database.user as User
    ON User.user_id = Acct.fk_user_id`, (err, rows, fields) => {
      if (err) throw err
    
      //console.log('The applications are: ', rows)
      //console.log(rows);
      res.json(rows)
    });
})

app.get('/users/loanApplications', (req, res) => {
  //console.log("id is" , id); 
    conn.query(`SELECT * FROM bank_database.loan_application AS LoanApp
    JOIN bank_database.user as User
    ON LoanApp.fk_user_num = User.user_id`, (err, rows, fields) => {
      if (err) throw err
    
      //console.log('The applications are: ', rows)
      //console.log(rows);
      res.json(rows)
    });
})

app.get('/users/loanApplications/:loan_id', (req, res) => {
  loan_id = req.params.loan_id;
  console.log(loan_id)
    conn.query(`SELECT * FROM bank_database.loan_application AS LoanApp
    JOIN bank_database.user as User
    ON LoanApp.fk_user_num = User.user_id
    WHERE LoanApp.loan_application= ${loan_id}`, (err, rows, fields) => {
      if (err) throw err
    
      console.log('The loan app: ', rows)
      //console.log(rows);
      res.json(rows)
    });
})

app.get('/users/creditLimitApplications/:id/:account_id', (req, res) => {
  account_id = req.params.account_id;
    conn.query(`SELECT * FROM bank_database.credit_limit_application AS CreditLimitApp
    JOIN bank_database.account as Acct 
    ON CreditLimitApp.fk_cl_account_number = Acct.account_id
    JOIN bank_database.user as User
    ON User.user_id = Acct.fk_user_id
    WHERE CreditLimitApp.fk_cl_account_number = ${account_id}`, (err, rows, fields) => {
      if (err) throw err
    
      //console.log('The applications are: ', rows)
      //console.log(rows);
      res.json(rows)
    });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})