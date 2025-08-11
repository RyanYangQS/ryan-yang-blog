#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 检查是否有未提交的更改
function hasChanges() {
  try {
    const result = execSync('git status --porcelain', { encoding: 'utf8' });
    return result.trim().length > 0;
  } catch (error) {
    return false;
  }
}

// 获取更改的文件列表
function getChangedFiles() {
  try {
    const result = execSync('git status --porcelain', { encoding: 'utf8' });
    return result.split('\n').filter(line => line.trim()).map(line => {
      const status = line.substring(0, 2).trim();
      const file = line.substring(3);
      return { status, file };
    });
  } catch (error) {
    return [];
  }
}

// 自动生成提交信息
function generateCommitMessage(files) {
  const fileTypes = {
    'src/': '代码',
    'public/': '静态资源',
    'docs/': '文档',
    'scripts/': '脚本',
    'package.json': '依赖',
    'package-lock.json': '依赖锁定',
    'pnpm-lock.yaml': '依赖锁定'
  };

  const changes = [];
  
  files.forEach(({ status, file }) => {
    for (const [pattern, type] of Object.entries(fileTypes)) {
      if (file.startsWith(pattern) || file === pattern) {
        changes.push(type);
        break;
      }
    }
  });

  const uniqueChanges = [...new Set(changes)];
  
  if (uniqueChanges.length === 0) {
    return '更新项目文件';
  } else if (uniqueChanges.length === 1) {
    return `更新${uniqueChanges[0]}`;
  } else {
    return `更新${uniqueChanges.join('、')}`;
  }
}

// 主函数
function main() {
  log('🚀 开始智能推送流程...', 'blue');

  // 检查是否有更改
  if (!hasChanges()) {
    log('✅ 没有需要提交的更改', 'green');
    return;
  }

  // 获取更改的文件
  const changedFiles = getChangedFiles();
  log(`📦 检测到 ${changedFiles.length} 个文件有更改`, 'yellow');

  // 生成提交信息
  const commitMessage = generateCommitMessage(changedFiles);
  log(`💡 自动生成提交信息: ${commitMessage}`, 'blue');

  try {
    // 添加所有更改
    log('📦 添加文件到暂存区...', 'blue');
    execSync('git add .', { stdio: 'inherit' });

    // 提交更改
    log('💾 提交更改...', 'blue');
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    // 推送到远程仓库
    log('🚀 推送到远程仓库...', 'blue');
    execSync('git push origin master', { stdio: 'inherit' });

    log('✅ 推送成功！', 'green');
    log(`📝 提交信息: ${commitMessage}`, 'green');
    log('🌐 远程仓库已更新', 'green');

  } catch (error) {
    log('❌ 推送失败，请检查网络连接或Git配置', 'red');
    log(`错误信息: ${error.message}`, 'red');
    process.exit(1);
  }

  log('🎉 智能推送完成！', 'green');
}

// 运行主函数
main();
