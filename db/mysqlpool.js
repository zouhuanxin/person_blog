const mysql = require('mysql');

function connstart() {
    var mysql = require('mysql');
    try {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'personal_blog'
        });

        connection.connect();
    } catch (e) {
        //TODO handle the exception
    }
    return connection;
}

function connstop(){
    try {
        if (connection != null) {
            connection.end();
        }
    } catch (e) {

    }
}
//公开pool对象
module.exports = {
    connstart,
    connstop
};