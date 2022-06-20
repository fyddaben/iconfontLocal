'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const iconOutDir = ctx.app.config.iconSourceDir
    const iconUrl = ctx.app.config.iconUrl
    const dirArray = await ctx.service.icon.findProDir(iconOutDir);
    await ctx.render('index.ejs', {
      dirArray,
      iconUrl
    });
  }
  async uploadSvg() {
    const { ctx } = this;
    const body = ctx.request.body
    const projectName = body.type
    const iconSrcDir = ctx.app.config.iconSourceDir 
    const iconDistDir = ctx.app.config.iconDistDir
    try {
      await ctx.service.icon.saveSvg(ctx.request.files,  projectName, iconSrcDir, iconDistDir)  
    } catch(e) {

    }
    ctx.body = {
      code: 0,
      msg: 'success'
    }
  }
}

module.exports = HomeController;
