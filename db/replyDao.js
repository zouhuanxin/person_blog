const pool = require('./mysqlpool');

//comments cannotn be delect and update but can only can be add and query
const table_name = 'blog_reply';

//query all reply data
//query data by blog_comments_id
function get_all_reply(blog_comments_id,page, number) {
    var sql = 'SELECT * FROM ' + table_name + 'WHERE blog_comments_id='+blog_comments_id+' LIMIT ' + page + ',' + number + '';
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                }
                resolve(result);
                pool.connstop();
            });
        }
    );
}

//add blog reply
function add_reply(arr){
    var sql = 'INSERT INTO '+table_name+' (blog_comments_id,commtens_id,reply_content,reply_id,create_time) VALUES (?,?,?,?,?)';
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,arr,function (err,result) {
            if(err){
                console.log(`err:${err}`);
                reject(err);
            }
            resolve(result);
            pool.connstop();
        });
    });
}


module.exports = {
    get_all_reply,
    add_reply
}