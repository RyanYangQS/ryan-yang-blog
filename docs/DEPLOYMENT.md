# 部署说明

## 使用 Vercel 部署

### 1. 准备工作

1. 确保你的代码已经提交到 GitHub
2. 注册 [Vercel](https://vercel.com) 账号
3. 安装 Vercel CLI（可选）

### 2. 部署步骤

#### 方法一：通过 Vercel 网页界面

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 配置项目：
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
5. 点击 "Deploy"

#### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

### 3. 配置自定义域名

1. 在 Vercel 项目设置中找到 "Domains"
2. 添加你的域名：`yangqingsong.top`
3. 配置 DNS 记录：
   - 类型：CNAME
   - 名称：@ 或 www
   - 值：cname.vercel-dns.com

### 4. 环境变量配置（如果需要）

在 Vercel 项目设置中添加环境变量：
- `REACT_APP_API_URL`: API 地址
- `REACT_APP_SITE_NAME`: 网站名称

### 5. 自动部署

每次推送到 GitHub 主分支时，Vercel 会自动重新部署。

## 其他部署选项

### Netlify 部署

1. 访问 [netlify.com](https://netlify.com)
2. 拖拽 `build` 文件夹到部署区域
3. 配置自定义域名

### GitHub Pages 部署

1. 安装 gh-pages：`npm install --save-dev gh-pages`
2. 在 package.json 中添加：
   ```json
   "homepage": "https://yangqingsong.top",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. 运行：`npm run deploy`

## 注意事项

1. 确保所有依赖都已正确安装
2. 检查构建是否成功：`npm run build`
3. 测试本地构建：`npx serve -s build`
4. 确保路由配置正确（已配置在 vercel.json 中）

## 域名配置

### DNS 设置

在域名提供商处添加以下记录：

```
类型: CNAME
名称: @
值: cname.vercel-dns.com
TTL: 3600
```

或者：

```
类型: A
名称: @
值: 76.76.19.19
TTL: 3600
```

### SSL 证书

Vercel 会自动为你的域名配置 SSL 证书。

## 性能优化

1. 启用 Vercel 的 Edge Functions
2. 配置 CDN 缓存
3. 启用图片优化
4. 使用 Vercel Analytics 监控性能

## 故障排除

1. 构建失败：检查依赖和构建脚本
2. 路由问题：确保 vercel.json 配置正确
3. 域名解析：检查 DNS 记录是否正确
4. SSL 问题：等待证书自动配置完成 