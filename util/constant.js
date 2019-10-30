//全局变量
const userarr=[];

function getuserarr(){
    return userarr;
}

function setuserarr(ctx){
    userarr.push(ctx);
}

exports.getuserarr=getuserarr;
exports.setuserarr=setuserarr;