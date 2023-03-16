---
title: 简易webpack
date: 2023-03-16
---

## 简易 Webpack - zekepack

目录结构

```sh
├── lib
|  ├── compiler.js
|  ├── index.js
|  └── parser.js
├── src
|  ├── greeting.js
|  └── index.js
└── zekepack.config.js
```

### 实现思路

1. 读取配置文件获取相关配置项
2. 解析文件转成 AST, 从 AST 上获取依赖及其他信息
3. AST 转成 code, 此处简易版通过 { [file-absolute-path]:code, ...} 组成一个运行时查找的对象键值映射
4. 构造外层执行函数, 从 require entry 开始执行, 也就是 3 的结果中执行代码查找


### 命令

> 首先在根目录创建 `dist` 文件夹, 否则会报错

```sh
nr build
```
