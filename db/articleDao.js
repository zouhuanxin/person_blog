const pool = require('./mysqlpool');

const table_name = 'blog_article';

//query all article data
function get_all_article(blog_id,page, number) {
    var sql = 'SELECT * FROM ' + table_name + ' WHERE blog_id='+blog_id+' LIMIT ' + page + ',' + number + '';
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

//query the data by name
//There is no paging here because this query is accurate
function query_name(name){
    var sql = 'SELECT * FROM '+table_name+' WHERE blog_name=\''+name+'\'';
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(function (err,result) {
            if(err){
                console.log(`err:${err.message}`);
                reject(err);
            }
            resolve(result);
            connection.end();
        });
    })
}

//query all data by title
//query of dim
//more query result so use paging
function query_title(blog_id,title,page,number){
    var sql = 'SELECT * FROM '+table_name+' WHERE blog_id='+blog_id+' and blog_title like \'%'+title+'%\' LIMIT '+page+','+number+''
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,function (err,result) {
            if(err){
                console.log(`err:${err.message}`)
                reject(err);
            }
            resolve(result);
            connection.end();
        });
    });
}

//query all data by article_type
function query_type(blog_id,type,page,number){
    var sql = 'SELECT * FROM '+table_name+' WHERE blog_id='+blog_id+' and article_type like \''+type+'\' LIMIT '+page+','+number+''
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,function (err,result) {
            if(err){
                console.log(`err:${err.message}`)
                reject(err);
            }
            resolve(result);
            connection.end();
        });
    });
}

//query all data by order readnumber
function query_readortime(blog_id,rt,page,number){
    var sql;
    if(rt=='read'){
        sql = 'SELECT * FROM ' + table_name + ' WHERE blog_id='+blog_id+' order by  read_number desc  LIMIT ' + page + ',' + number + '';
    }else if(rt=='time'){
        sql = 'SELECT * FROM ' + table_name + ' WHERE blog_id='+blog_id+' order by  create_time desc  LIMIT ' + page + ',' + number + '';
    }
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,function (err,result) {
            if(err){
                console.log(`err:${err.message}`);
                reject(err);
            }
            resolve(result);
            connection.end();
        });
    });
}

//query all data by id
function query_id(id){
    var sql = 'SELECT * FROM '+table_name+' WHERE id = '+id+''
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,function (err,result) {
            if(err){
                console.log(`err:${err.message}`)
                reject(err);
            }
            resolve(result);
            connection.end();
        });
    });
}


//add blog article
function add_article(arr){
    var sql = 'INSERT INTO '+table_name+' (blog_id,blog_title,blog_content,create_time,read_number,article_type) VALUES (?,?,?,?,?,?)';
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

//update blog article
function update_article(arr){
    var sql = 'UPDATE '+table_name+' SET blog_title=? ,blog_content=? ,article_type=? WHERE id = ?';
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

//update blog article by read_number
function update_readnumber(arr) {
    var sql = 'UPDATE '+table_name+' SET read_number=? WHERE id = ?';
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

//delct blog article
function delect_article(id){
    var sql = 'DELETE FROM '+table_name+' WHERE id='+id+'';
    console.log(sql);
    var connection = pool.connstart();
    return new Promise(function (resolve, reject) {
        connection.query(sql,function (err,result) {
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
    get_all_article,
    query_name,
    query_title,
    add_article,
    update_article,
    delect_article,
    query_type,
    query_readortime,
    query_id,
    update_readnumber
}