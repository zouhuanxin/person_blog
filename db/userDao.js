const pool = require('./mysqlpool');

const table_name = 'blog_user';
function login(blog_name,blog_password){
    //查询数据
    var connection = pool.connstart();
    var sql = 'SELECT * FROM ' + table_name + ' where blog_name=\'' + blog_name + '\' and blog_password=\''+blog_password+'\'';
    return new Promise(function (resolve, reject) {
        connection.query(sql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                reject(err);
            }
            resolve(result);
            pool.connstop();
        });
    })
}

function register(arr){
    var connection = pool.connstart();
    var sql = 'INSERT INTO '+table_name+' (blog_name,blog_password,blog_email,blog_notice) VALUES (?,?,?,?)';
    return new Promise(function (resolve, reject) {
        connection.query(sql,arr,function (err,result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                reject(err);
            }
            resolve('success');
            pool.connstop();
        });
    })
}

module.exports = {
    login,
    register
};