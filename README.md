# iconfontLocal

iconfont project


### 项目说明
- 模仿iconfont，本地部署的icon生成平台，争取做到最小成本的过渡
- 主要转化模块，来自 https://www.npmjs.com/package/@daipeng7/iconfont-webpack-plugin
- 支持多个项目
### 图片
![image](https://user-images.githubusercontent.com/3349863/174603114-1abecd68-3d4c-44a2-bac0-420e291d250a.png)
![image](https://user-images.githubusercontent.com/3349863/174603642-5ef77d80-eae0-4703-b57d-aa021a221d55.png)
![image](https://user-images.githubusercontent.com/3349863/174604243-7b1ce317-e1c3-407d-9c66-cb4e5ed5ba30.png)


### 配置说明
``` 
// icon 源文件目录 
  config.iconSourceDir = '/Users/iconfontall/';

  // iconfont 最终生成的目录,需要在这里起一个静态服务，指向这个目录
  config.iconDistDir = '/Users/iconfonthtml/'

  // iconDistDir起一个静态服务的访问地址
  config.iconUrl = 'http://127.0.0.1:4005/'
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
