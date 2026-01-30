const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'image');
const backupDir = path.join(__dirname, 'image-backup');

async function compressImages() {
  console.log('开始压缩图片...\n');

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log('创建备份目录: image-backup\n');
  }

  const files = fs.readdirSync(imageDir);
  const pngFiles = files.filter(file => file.endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log('没有找到PNG图片文件');
    return;
  }

  console.log(`找到 ${pngFiles.length} 个PNG文件\n`);

  let totalOriginalSize = 0;
  let totalCompressedSize = 0;

  for (const file of pngFiles) {
    const inputPath = path.join(imageDir, file);
    const outputPath = path.join(imageDir, file);
    const backupPath = path.join(backupDir, file);

    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    totalOriginalSize += originalSize;

    console.log(`处理: ${file}`);
    console.log(`  原始大小: ${(originalSize / 1024).toFixed(2)} KB`);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      const tempPath = outputPath + '.compressed';

      await image
        .png({
          quality: 80,
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true
        })
        .toFile(tempPath);

      const compressedStats = fs.statSync(tempPath);
      const compressedSize = compressedStats.size;
      totalCompressedSize += compressedSize;

      const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

      console.log(`  压缩后大小: ${(compressedSize / 1024).toFixed(2)} KB`);
      console.log(`  压缩率: ${reduction}%`);

      if (compressedSize < originalSize) {
        fs.copyFileSync(inputPath, backupPath);
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        console.log(`  ✓ 压缩完成，已替换原文件`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`  ✗ 压缩后文件更大，保持原文件`);
      }

      console.log();

    } catch (error) {
      console.log(`  ✗ 压缩失败: ${error.message}\n`);
    }
  }

  const totalReduction = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);

  console.log('='.repeat(50));
  console.log('压缩完成！');
  console.log('='.repeat(50));
  console.log(`原始总大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`压缩后总大小: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`节省空间: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)} MB (${totalReduction}%)`);
  console.log('='.repeat(50));
  console.log(`\n原始文件已备份到: ${backupDir}`);
}

compressImages().catch(console.error);
