# 将 GitHub 仓库部署到 Cloudflare Pages 的完整指南

## 一、准备工作

### 1. 确认 GitHub 仓库状态
- 仓库名称：chucai
- 仓库地址：https://github.com/chenyaoyue/chucai.git
- 主要分支：main
- 包含文件：index.html, styles.css, script.js, image/, _headers

### 2. 确认 Cloudflare 账户
- 已注册 Cloudflare 账户
- 已登录 Cloudflare 仪表板

## 二、部署步骤

### 步骤1：登录 Cloudflare
1. 打开 [Cloudflare 仪表板](https://dash.cloudflare.com/)
2. 使用您的账户登录

### 步骤2：进入 Workers & Pages
1. 在左侧导航栏中，找到并点击 **Workers & Pages**
2. 进入 Workers & Pages 页面

### 步骤3：创建新项目
1. 点击 **Create application** 或 **Create project** 按钮
2. 选择 **Pages** 选项

### 步骤4：连接 GitHub 仓库
1. 在创建项目页面中，选择 **GitHub** 作为源
2. 点击 **Connect to GitHub** 按钮
3. 如果是首次连接，需要授权 Cloudflare 访问您的 GitHub 账户
4. 选择要连接的仓库：**chucai**
5. 点击 **Connect repository** 按钮

### 步骤5：配置构建设置
1. 连接仓库后，配置以下构建设置：

#### 构建命令
```
# 如果使用 npm 构建项目
npm run build

# 如果是静态网站，直接使用现有文件
# 无需构建命令
```

#### 构建输出目录
```
# 如果有构建输出目录，设置为：
dist/
build/
public/

# 如果是静态网站，留空或设置为：
/
```

#### 根目录
```
# 设置为项目根目录
/
```

### 步骤6：选择部署分支
1. 在 **Production branch** 中选择：**main**
2. 确保分支名称正确

### 步骤7：环境变量（可选）
如果需要，可以添加环境变量：
- 变量名：NODE_ENV
- 值：production

### 步骤8：开始部署
1. 点击 **Save and Deploy** 按钮
2. 等待部署完成（通常需要 1-3 分钟）

## 三、部署后配置

### 1. 查看部署状态
1. 在 Workers & Pages 页面中，找到您的项目
2. 点击项目名称进入项目详情
3. 查看 **Deployments** 标签
4. 查看最新的部署状态

### 2. 获取访问 URL
部署成功后，您将获得一个类似以下的 URL：
```
https://<项目名>.pages.dev
```

例如：
```
https://chucai.pages.dev
```

### 3. 配置自定义域名（可选）
1. 在项目设置中，点击 **Custom domains**
2. 添加您的自定义域名
3. 按照提示配置 DNS 记录

## 四、自动部署

### 配置自动部署
Cloudflare Pages 支持自动部署，当您推送代码到 GitHub 时自动重新部署：

1. 在项目设置中，找到 **Build & deployments**
2. 确保以下设置正确：
   - **Production branch**: main
   - **Build command**: （根据需要设置）
   - **Build output directory**: （根据需要设置）

### 推送代码触发部署
当您推送新代码到 GitHub main 分支时：
1. Cloudflare 会自动检测到更新
2. 自动开始新的构建和部署
3. 部署完成后，网站会自动更新

## 五、常见问题解决

### Q1: 连接 GitHub 时提示权限错误
A: 
1. 确保您在 GitHub 中有足够的权限
2. 重新授权 Cloudflare 访问您的 GitHub 账户
3. 确保仓库是公开的（public）

### Q2: 部署失败
A:
1. 检查构建命令是否正确
2. 检查构建输出目录是否正确
3. 查看 Cloudflare Pages 的部署日志
4. 确认仓库中包含 index.html 文件

### Q3: 部署成功但网站无法访问
A:
1. 等待 DNS 传播（可能需要几分钟）
2. 清除浏览器缓存
3. 检查防火墙设置
4. 查看 Cloudflare Pages 的部署日志

### Q4: 如何查看部署日志
A:
1. 进入项目详情页面
2. 点击 **Deployments** 标签
3. 点击具体的部署记录
4. 查看构建日志和错误信息

### Q5: 如何回滚到之前的部署
A:
1. 进入 **Deployments** 标签
2. 找到之前的部署记录
3. 点击 **Rollback** 按钮
4. 确认回滚操作

## 六、优化配置

### 1. 启用 Cloudflare 优化
部署成功后，按照 `CLOUDFLARE_PAGES_OPTIMIZATION.md` 中的步骤配置：
- Auto Minify
- Brotli 压缩
- 图片优化
- HTTP/2 和 HTTP/3
- 缓存策略

### 2. 配置自定义域名（可选）
如果您有自己的域名：
1. 在项目设置中添加自定义域名
2. 按照提示配置 DNS 记录
3. 启用 HTTPS（Cloudflare 会自动提供）

## 七、验证部署

### 1. 检查网站访问
打开部署后的 URL，确认网站正常显示：
```
https://chucai.pages.dev
```

### 2. 测试所有功能
- 图片是否正常加载
- 点击弹窗是否正常工作
- 响应式布局是否正常
- 所有链接是否正确跳转

### 3. 性能测试
使用性能测试工具验证优化效果：
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 八、持续维护

### 1. 更新代码
当您需要更新网站时：
1. 在本地修改代码
2. 提交到 GitHub main 分支
3. Cloudflare 会自动检测并重新部署

### 2. 监控性能
定期检查：
- Cloudflare Analytics
- 部署日志
- 性能指标

### 3. 备份
定期备份：
- GitHub 仓库（已自动备份）
- 重要配置文件
- 自定义域名配置

## 九、总结

按照以上步骤，您将能够：
1. ✅ 成功将 GitHub 仓库部署到 Cloudflare Pages
2. ✅ 配置自动部署，推送代码时自动更新
3. ✅ 获得 Cloudflare CDN 加速
4. ✅ 启用各种性能优化
5. ✅ 配置自定义域名（可选）

## 十、快速参考

### GitHub 仓库信息
- 仓库：https://github.com/chenyaoyue/chucai.git
- 分支：main
- 主要文件：index.html, styles.css, script.js, image/, _headers

### Cloudflare Pages URL
- 默认 URL：https://chucai.pages.dev
- 自定义 URL：根据您的域名设置

### 重要文件
- index.html：网站入口
- styles.css：样式文件
- script.js：JavaScript 文件
- image/：图片文件夹
- _headers：缓存配置

---

按照这些步骤操作，您将成功将 GitHub 仓库部署到 Cloudflare Pages，并享受 Cloudflare 的 CDN 加速和性能优化！