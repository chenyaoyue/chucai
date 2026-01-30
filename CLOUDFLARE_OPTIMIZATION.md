# Cloudflare Pages 网站加速优化指南

## 一、Cloudflare Pages 优化设置

### 1. 启用 Cloudflare CDN
Cloudflare Pages 默认已启用CDN，确保以下设置正确：
- **Caching Level**: Standard 或 Aggressive
- **Auto Minify**: 开启（HTML、CSS、JavaScript）
- **Brotli**: 开启

### 2. 配置缓存规则
1. 登录 Cloudflare 账户
2. 选择您的 Pages 项目（chucaiditu.pages.dev）
3. 进入 **Settings** → **Functions & Redirects**
4. 在 **Cache Rules** 中添加规则：
   - 规则名称：Static Assets Cache
   - 匹配条件：URL Path 包含 `image/` 或 `*.css` 或 `*.js`
   - 操作：Cache Level = Aggressive
   - Edge Cache TTL = 1 month
   - Browser Cache TTL = 1 month

### 3. 启用图片优化
1. 进入 **Speed** → **Optimization**
2. 开启以下选项：
   - **Image Resizing**: 开启
   - **Polish**: 选择 Lossless（无损）
   - **WebP**: 开启

### 4. 启用网络协议优化
1. 进入 **Network** 标签
2. 开启以下选项：
   - **HTTP/2**: 开启
   - **HTTP/3 (QUIC)**: 开启
   - **0-RTT Connection Resumption**: 开启
   - **Early Hints**: 开启

### 5. 配置压缩
1. 进入 **Speed** → **Optimization**
2. 开启 **Auto Minify**：
   - HTML: 开启
   - CSS: 开启
   - JavaScript: 开启
3. 开启 **Brotli** 压缩

## 二、代码层面优化

### 1. 图片延迟加载
在 HTML 中为图片添加 `loading="lazy"` 属性：

```html
<img src="image/map-main.png" class="frame" alt="frame" loading="lazy">
<img src="image/jingzhou-turtle-soup.png" class="frame2" alt="frame2" loading="lazy">
```

### 2. 预加载关键资源
在 HTML 头部添加预加载标签：

```html
<link rel="preload" href="image/底图.png" as="image">
<link rel="preload" href="styles.css" as="style">
<link rel="preload" href="script.js" as="script">
```

### 3. 添加缓存头
在 Cloudflare Pages 项目根目录创建 `_headers` 文件：

```
# 缓存静态资源
/image/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

*.css
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

*.js
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

# HTML 文件缓存时间较短
*.html
  Cache-Control: public, max-age=3600
```

## 三、图片优化

### 1. 压缩图片
使用在线工具压缩所有图片：
- [TinyPNG](https://tinypng.com/) - 推荐
- [Compressor.io](https://compressor.io/)
- [ImageOptim](https://imageoptim.com/)

### 2. 转换为 WebP 格式
WebP 格式比 PNG/JPEG 小 25-35%，现代浏览器都支持。

转换命令（需要安装 cwebp）：
```bash
cwebp -q 80 input.png -o output.webp
```

### 3. 使用合适的图片尺寸
确保图片尺寸与显示尺寸匹配，避免浏览器缩放。

## 四、DNS 优化

### 1. 使用 Cloudflare DNS
1. 进入 **DNS** 标签
2. 确保您的域名使用 Cloudflare DNS
3. 设置 DNS 记录指向 Cloudflare Pages

### 2. 启用 DNSSEC
在 **DNS** 设置中启用 DNSSEC 以提高安全性。

## 五、性能监控

### 1. 使用 Cloudflare Analytics
1. 进入 **Analytics** → **Web Analytics**
2. 查看以下指标：
   - 请求时间
   - 带宽使用
   - 缓存命中率

### 2. 使用性能测试工具
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 六、具体操作步骤

### 步骤1：创建 _headers 文件
在项目根目录创建 `_headers` 文件，添加缓存规则。

### 步骤2：更新 HTML 文件
为所有图片添加 `loading="lazy"` 属性。

### 步骤3：添加预加载标签
在 HTML 头部添加关键资源预加载。

### 步骤4：压缩图片
使用 TinyPNG 压缩所有图片文件。

### 步骤5：配置 Cloudflare 设置
按照上述步骤配置 Cloudflare 的优化选项。

### 步骤6：测试效果
使用性能测试工具验证优化效果。

## 七、预期效果

优化后，您应该能看到以下改进：
- **首屏加载时间**: 减少 30-50%
- **总加载时间**: 减少 20-40%
- **缓存命中率**: 提升至 80% 以上
- **带宽使用**: 减少 30-50%

## 八、常见问题

### Q1: Cloudflare Pages 的 Speed 设置在哪里？
A: Cloudflare Pages 的 Speed 设置可能与普通网站不同，需要进入 Pages 项目的 Settings 页面查找。

### Q2: 如何启用 Brotli 压缩？
A: 在 Speed → Optimization 中开启 Brotli 选项。

### Q3: 图片优化会影响质量吗？
A: 使用 Lossless（无损）模式不会影响图片质量。

### Q4: 缓存时间设置多久合适？
A: 静态资源（图片、CSS、JS）可以设置 1 个月，HTML 文件设置 1 小时。

## 九、总结

通过以上优化措施，您的 Cloudflare Pages 网站 `https://chucaiditu.pages.dev/` 将获得显著的性能提升：

1. **CDN 加速**: 全球节点分发，就近访问
2. **缓存优化**: 减少重复请求，加快加载
3. **图片优化**: 压缩和格式转换，减少文件大小
4. **协议优化**: HTTP/2/3 提升传输效率
5. **代码优化**: 延迟加载和预加载，改善用户体验

按照这些步骤操作，您的网站加载速度将大幅提升！