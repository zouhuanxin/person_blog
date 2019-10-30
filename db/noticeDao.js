const pool = require('./mysqlpool');

const table_name = 'blog_notice';
function search_all(blog_id){
    var connection = pool.connstart();
    var sql = 'SELECT * FROM ' + table_name + ' where blog_id=\'' + blog_id + '\'';
    return new Promise(function (resolve, reject) {
        connection.query(sql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                reject(err);
            }
            resolve(result);
            connection.end();
        });
    })
}

function add_notice(arr){
    var connection = pool.connstart();
    var sql = 'INSERT INTO '+table_name+' (blog_id,text,create_time) VALUES (?,?,?)';
    return new Promise(function (resolve, reject) {
        connection.query(sql,arr,function (err,result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                reject(err);
            }
            resolve('success');
            connection.end();
        });
    })
}


module.exports = {
    search_all,
    add_notice
};