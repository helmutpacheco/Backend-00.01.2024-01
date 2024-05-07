var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "chat3",
    password: "chat3",
    database: "chatweb3"
});
con.connect(function (err) {
    if (err) throw err;
	var sql = "CREATE TABLE IF NOT EXISTS  message (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, message VARCHAR(2550) , user VARCHAR(250))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "CREATE TABLE IF NOT EXISTS  login (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(250) unique , password VARCHAR(250))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});

module.exports = con;