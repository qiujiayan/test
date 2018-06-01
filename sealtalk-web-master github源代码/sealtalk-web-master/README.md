# 融云 RongCloud Web IM V2.0

## Environment Setup

### Mac 环境下开发

如有必要，使用 `sudo npm`

需修改 typings 目录的访问权限，否则执行 grunt build 会报错

如 typescript 编译不过，请打开 node_modules/grunt-typescript/package.json 文件，将 typescript 版本改为 1.6.2， 然后在 grunt-typescript 执行 npm install


### 初始化开发工具

```
npm install -g typescript@1.6.0beta tsd coffee-script grunt-cli karma-cli
```

### 安装依赖库

在项目根目录下执行：

```
npm install
bower install
tsd install
```

### 修改配置，配置文件 /src/assets/app.config
```
appkey: 从融云注册的应用 key，注册地址：https://developer.rongcloud.cn/signup
serverUrl: App Server 地址，使用 https://github.com/sealtalk/sealtalk-server 部署后获取
```

### 编译开发代码

```
grunt build (输出Waiting...时，build成功)
```

### 发布正式代码

```
grunt release
```

### 启动本地服务器

```
grunt connect
```

### 在浏览器中打开

[http://localhost:8181](http://localhost:8181)  端口号请与Gruntfile中实际配置保持一致

## Coding Guidelines

https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines


## 站点部署说明

```
1.项目根目录执行命令 grunt release
2.将 dist 目录下的文件以静态文件形式部署在服务器上。程序入口页面 index.html
```
