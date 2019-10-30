const pool = require('./mysqlpool');

//comments cannotn be delect and update but can only can be add and query
const table_name = 'blog_comments';

//query all article data
//query data by blog_article_id
function get_all_comments(blog_article_id,page, number) {
    var sql = 'SELECT * FROM ' + table_name + ' WHERE blog_article_id='+blog_article_id+' ORDER BY create_time DESC LIMIT ' + page + ',' + number + '';
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                }
                resolve(result);
                connection.end();
            });
        }
    );
}

//add blog comments
function add_comments(arr){
    var sql = 'INSERT INTO '+table_name+' (blog_article_id,comments_name,comments_content,create_time) VALUES (?,?,?,?)';
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
    get_all_comments,
    add_comments
}