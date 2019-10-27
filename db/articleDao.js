const pool = require('./mysqlpool');

const table_name = 'blog_article';

//query all article data
function get_all_article(page, number) {
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

//query the data by name
//There is no paging here because this query is accurate
function query_name(name){
    var sql = 'SELECT * FROM '+table_name+' WHERE blog_name=\''+name+'\''
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(function (err,result) {
            if(err){
                console.log(`err:${err.message}`);
                reject(err);
            }
            resolve(result);
            pool.connstop();
        });
    })
}

//query all data by title
//query of dim
//more query result so use paging
function query_title(title,page,number){
    var sql = 'SELECT * FROM '+table_name+' WHERE blog_title like \'%'+title+'%\' LIMIT '+page+','+number+''
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,function (err,result) {
            if(err){
                console.log(`err:${err.message}`)
                reject(err);
            }
            resolve(result);
            pool.connstop();
        });
    });
}

//add blog article
function add_article(arr){
    var sql = 'INSERT INTO '+table_name+' (blog_id,blog_title,blog_content,create_time) VALUES (?,?,?,?)';
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

//update blog article
function update_article(arr){
    var sql = 'UPDATE '+table_name+' SET blog_title=? ,blog_content=?';
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

//delct blog article
function delect_article(id){
    var sql = 'DELECT FORM '+table_name+' id='+id+'';
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,function (err,result) {
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
    get_all_article,
    query_name,
    query_title,
    add_article,
    update_article,
    delect_article
}