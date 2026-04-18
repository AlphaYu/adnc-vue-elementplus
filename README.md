# <div align="center"><img src="https://aspdotnetcore.net/wp-content/uploads/2023/04/adnc-github.png" alt="ADNC-基于.NET平台的微服务开源框架" style="zoom:50%;" /></div>
<div align='center'>
<a href="https://github.com/AlphaYu/Adnc/blob/master/LICENSE">
<img alt="GitHub license" src="https://img.shields.io/github/license/AlphaYu/Adnc"/>
</a>
<a href="https://github.com/AlphaYu/Adnc/stargazers">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/AlphaYu/Adnc"/>
</a>
<a href="https://github.com/AlphaYu/Adnc/network">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/AlphaYu/Adnc"/>
</a>
<a href="">
<img alt="Visitors" src="https://komarev.com/ghpvc/?username=alphayu&color=red&label=Visitors"/>
</a>
</div>

###### <div align="center">代码改变世界，开源推动社区</div>

## 概述

[adnc-vue-elementplus](https://github.com/AlphaYu/adnc-vue-elementplus) 基于 Vue3、Vite、TypeScript 、 Element-Plus和 [vue3-element-admin](https://github.com/youlaitech/vue3-element-admin) 搭建的极简开箱即用企业级后台管理前端模板并配套 .NET8 后端 [adnc](http://github.com/alphayu/adnc)。

- [在线预览](http://62.234.187.128/)


## 项目特色

- **简洁易用**：基于Vue3 版本，无过渡封装 ，易上手。
- **系统功能：** 提供用户管理、角色管理、菜单管理、部门管理、字典管理等功能模块。
- **权限管理：** 支持动态路由、按钮权限、角色权限和数据权限等多种权限管理方式。
- **基础设施：** 提供国际化、多布局、暗黑模式、全屏、水印、接口文档和代码生成器等功能。

## 环境准备

| 环境                 | 名称版本                                                     | 下载地址                                                     |
| -------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| **开发工具**         | VSCode    | [下载](https://code.visualstudio.com/Download)           |
| **运行环境**         | Node ≥18 && Node<= v20.18.3    | [下载](http://nodejs.cn/download)                        |


## 项目启动

```bash
# 克隆代码
git clone https://github.com/alphayu/adnc-vue-elementplus.git
# 切换目录
cd adnc-vue-elementplus
# 安装 pnpm
npm install pnpm -g
# 设置镜像源(可忽略)
pnpm config set registry https://registry.npmmirror.com
# 安装依赖
pnpm install
# 启动运行
pnpm run dev
```



## 项目部署

执行 `pnpm run build` 命令后，项目将被打包并生成 `dist` 目录。接下来，将 `dist` 目录下的文件上传到服务器 `/usr/share/nginx/html` 目录下，并配置 Nginx 进行反向代理。

```bash
pnpm run build
```

以下是 Nginx 的配置示例：
```nginx
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    gzip on;
    gzip_http_version 1.1;
    gzip_disable "MSIE [1-6]\.";
    gzip_min_length 1k;
    gzip_buffers 16 64k;
    gzip_comp_level 5;
    gzip_vary on;
    gzip_types text/plain application/javascript text/css;

    server {
        listen 80;
        server_name localhost;
        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
        }

        location /api/ {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://10.2.8.5:5000/api/;
        }
    }
}

```
更多详细信息，请参考这篇文章：[Nginx 安装和配置](https://aspdotnetcore.net/docs/deploy-docker/)。

## 本地Mock

项目同时支持在线和本地 Mock 接口，默认使用线上接口，如需替换为 Mock 接口，修改文件 `.env.development` 的 `VITE_MOCK_DEV_SERVER` 为  `true` **即可**。

## 后端接口

> 如果您具备.NET开发基础，按照以下步骤将在线接口转为本地后端接口，创建企业级前后端分离开发环境，助您走向全栈之路。

1. 获取基于 `.NET` 开发的后端 [adnc](https://github.com/alphayu/adnc) 源码。

## 注意事项

- **自动导入插件自动生成默认关闭**

  模板项目的组件类型声明已自动生成。如果添加和使用新的组件，请按照图示方法开启自动生成。在自动生成完成后，记得将其设置为 `false`，避免重复执行引发冲突。

- **项目启动浏览器访问空白**

  请升级浏览器尝试，低版本浏览器内核可能不支持某些新的 JavaScript 语法，比如可选链操作符 `?.`。

- **项目同步仓库更新升级**

  项目同步仓库更新升级之后，建议 `pnpm install` 安装更新依赖之后启动 。

- **项目组件、函数和引用爆红**

	重启 VSCode 尝试

## 问题交流
- QQ群号：780634162
- 都看到这里了，那就点个`star`吧！

## License

**MIT**   
**Free Software, Hell Yeah!**

