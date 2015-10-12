
var defaultCfg={
  loggerName:'ligle-addon-permission',
  loggerLevel:'TRACE',
};

function checkDependencies(){
  // check dependencies here
  // example
  // if(!ligle.model.Member) throw Error('xxx-addon need ligle.model.Member');
}

module.exports = function(ligle,cfg){ // jshint ignore:line
  ligle.addon = ligle.addon || {};
  if(ligle.addon.permission) {
    return;
  }
  checkDependencies();

  var config = ligle.util.configure(cfg,defaultCfg);
  var engineLogLevel = ligle.cfg.loggerLevel;
  if(engineLogLevel) { // use loggerLevel of engine.
    config = ligle.util.configure({loggerLevel:engineLogLevel},config);
  }

  var logger = ligle.util.logger(config.loggerName,config.loggerLevel);
  // used for other files to get logger, cfg and ligle
  module.exports.logger = logger;
  module.exports.cfg = config;
  module.exports.ligle = ligle;

  logger.trace('permission addon:',config);

  // exported
  var exportObj;
  var perm = require('./permission.js');
  exportObj = perm;
  // 为了保持接口设计的一致性加上的下面的代码。
  exportObj.midware = {};
  exportObj.midware.passIf = perm.passIf;
  exportObj.midware.changeTo = perm.changeTo;

  ligle.addon.permission = exportObj;

  return exportObj;
};
