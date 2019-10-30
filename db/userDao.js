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
            connection.end();
        });
    })
}

//根据用户姓名查找用户唯一id标识符
function search_id(blog_name){
    //查询数据
    var connection = pool.connstart();
    var sql = 'SELECT * FROM ' + table_name + ' where blog_name=\'' + blog_name + '\'';
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

//根据用户唯一id标识符
function search_notice(id){
    //查询数据
    var connection = pool.connstart();
    var sql = 'SELECT * FROM ' + table_name + ' where id=\'' + id + '\'';
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
            connection.end();
        });
    })
}

function update_notice(arr) {
    var sql = 'UPDATE '+table_name+' SET blog_notice=? WHERE id = ?';
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,arr,function (err,result) {
            if(err){
                console.log(`err:${err}`);
                reject(err);
            }
            resolve(result);
            connection.end();
        });
    });
}

module.exports = {
    login,
    register,
    search_id,
    update_notice,
    search_notice
};