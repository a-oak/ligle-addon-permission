// 权限检查的中间件
var index = require('./index.js');
var ligle = index.ligle;
var logger = index.logger;

var status = {
  isLogin:'login',
  isLogout:'logout'
};
// 导出一些状态测试函数
for(var k in status){
  // 注意：循环定义闭包，循环变量不会保存到闭包里。因为循环内部并不是一个context
  (exports[k]=function(req){
    var k = arguments.callee.k;
    return req.session.status===status[k];
  }).k=k;
}
var groups = {
  isRoot:'root',
  isAdmin:'admin',
  isGuest:'guest',
  isMember:'member'
};
// 导出一些组别测试函数
for(var k in groups){
  (exports[k]=function(req){
    var k = arguments.callee.k;
    return req.session.group===groups[k];
  }).k=k;
}
function checkPermission(validGroup,validStatus,group,status){
  var msg;
  var succ;
  if(validGroup!==group){
    msg = group+'没有权限：'+'需要'+validGroup+'的权限';
    succ=false;
  }else if(validStatus!==status){
    msg = group+'状态错误'+status+'：需要状态：'+validStatus;
    succ=false;
  }else{
    msg = '';
    succ = true;
  }
  return {ok:succ,msg:msg};
}

exports.passIf = function(group,status){
  return function(req,res,next){
    req.session.group = req.session.group||'member';
    req.session.status = req.session.status||'logout';
    var result = checkPermission(
      group,
      status,
      req.session.group,
      req.session.status
    );
    if(result.ok)
      next();
    else
      res.rd.errorBack(result.msg,req.xhr);
  };
};

exports.changeTo = function(group,status){
  return function(req,res,next){
    req.session.group = group;
    req.session.status = status;
    next();
  };
};

exports.GROUPS = {
  root:'root',
  admin:'admin',
  guest:'guest',
  member:'member'
};

exports.STATUS = {
  login:'login',
  logout:'logout'
};
