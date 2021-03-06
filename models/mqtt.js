var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://101.132.116.211:8201');
/*
  mqtt：
    1.开始实验 主题 编号 内容{expre 110}
    2.通知电源 内容{id:110}
*/
const beginExperiment = function (target,message) {
  client.publish(`e_000`, `1|${message}`);
}

const closeExperiment=function(){
  client.publish(`e_000`,"0")
}

const noticePower = function (target, message) {
  client.publish(`p_000`, message);
}


exports.beginExperiment = beginExperiment
exports.noticePower = noticePower
exports.closeExperiment=closeExperiment