const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'paige',
  database: 'bank_database'
})
connection.connect()

module.exports = connection