/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = 'daben';
  // icon 源文件目录 
  config.iconSourceDir = '/home/fanyongdong/iconfont/source/';

  // iconfont 最终生成的目录
  config.iconDistDir = '/home/fanyongdong/iconfont/dist/'

  // iconfont 访问地址
  config.iconUrl = 'http://192.168.110.17:12305/'

  // add your middleware config here
  config.middleware = [];

  return {
    ...config,
  };
};
