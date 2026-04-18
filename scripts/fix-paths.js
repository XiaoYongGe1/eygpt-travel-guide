#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BASE_PATH = '/eygpt-travel-guide';
const DIST_DIR = path.join(__dirname, '../dist');

// 递归查找所有 HTML 文件
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 修复 HTML 文件中的路径
function fixPaths(htmlFile) {
  let content = fs.readFileSync(htmlFile, 'utf8');
  
  // 修复 href 路径 (排除外部链接和锚点链接)
  content = content.replace(
    /href="\/(?!\/|eygpt-travel-guide)([^"]*)"/g,
    `href="${BASE_PATH}/$1"`
  );
  
  // 修复 src 路径 (图片和脚本)
  content = content.replace(
    /src="\/(?!\/|eygpt-travel-guide)([^"]*)"/g,
    `src="${BASE_PATH}/$1"`
  );
  
  fs.writeFileSync(htmlFile, content, 'utf8');
  console.log(`✓ Fixed: ${htmlFile}`);
}

// 主函数
function main() {
  console.log('Fixing paths for GitHub Pages deployment...');
  
  const htmlFiles = findHtmlFiles(DIST_DIR);
  htmlFiles.forEach(fixPaths);
  
  console.log(`\n✓ Done! Fixed ${htmlFiles.length} files.`);
}

main();
