const mysql = require('mysql');

// --------- database--------------

const Connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myproject"
 
  });
  
  Connection.connect();

//   - - - - - Tester database - - -  - - - - - 
  Connection.query('select 1 + 1 AS sum', function(error, results, fields) {
      if (error) throw error;
      console.log('the solution is', results[0].sum);

  });

module.exports = Connection; 