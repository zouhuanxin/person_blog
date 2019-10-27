const pool = require('./mysqlpool');

//comments cannotn be delect and update but can only can be add and query
const table_name = 'blog_comments';

//query all article data
function get_all_comments(page, number) {
    var sql = 'SELECT * FROM ' + table_name + ' LIMIT ' + page + ',' + number + '';
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

//add blog comments
function add_comments(arr){
    var sql = 'INSERT INTO '+table_name+' (blog_article_id,blog_id,comments_content,create_time) VALUES (?,?,?,?)';
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
    get_all_comments,
    add_comments
}