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
  config.keys = appInfo.name + '_1655373533675_772';

  // add your middleware config here
  config.middleware = [];
  // icon 源文件目录 
  config.iconSourceDir = '/Users/fanyongdong/deepwise/iconfontall/';

  // iconfont 最终生成的目录
  config.iconDistDir = '/Users/fanyongdong/deepwise/iconfonthtml/'

  // iconfont 访问地址
  config.iconUrl = 'http://127.0.0.1:4004/'

  // 上传多个图片
  config.multipart = {
    mode: 'file',
  };
  // csrf 关掉
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    view: {
      mapping: {
        '.ejs': 'ejs',
      }
    }
  };
  return {
    ...config,
    ...userConfig,
  };
};
