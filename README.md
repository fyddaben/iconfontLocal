# deepwise-iconfont

iconfont project


### 项目说明
https://deepwise.feishu.cn/docx/doxcnsGYjToz9Gu72phROAF5SXc
### 配置说明
```
// icon 源文件目录 
  config.iconSourceDir = '/Users/iconfontall/';

  // iconfont 最终生成的目录,需要在这里起一个静态服务，指向这个目录
  config.iconDistDir = '/Users/iconfonthtml/'

  // iconDistDir起一个静态服务的访问地址
  config.iconUrl = 'http://127.0.0.1:4004/'
```



### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```
### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org