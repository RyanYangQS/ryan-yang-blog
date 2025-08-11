#!/bin/bash

# 自动推送脚本
# 使用方法: ./scripts/auto-push.sh "提交信息"

# 检查是否提供了提交信息
if [ -z "$1" ]; then
    echo "请提供提交信息"
    echo "使用方法: ./scripts/auto-push.sh \"提交信息\""
    exit 1
fi

COMMIT_MESSAGE="$1"

echo "🚀 开始自动推送流程..."

# 检查是否有未提交的更改
if git diff-index --quiet HEAD --; then
    echo "✅ 没有需要提交的更改"
    exit 0
fi

# 添加所有更改
echo "📦 添加文件到暂存区..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "$COMMIT_MESSAGE"

# 推送到远程仓库
echo "🚀 推送到远程仓库..."
if git push origin master; then
    echo "✅ 推送成功！"
    echo "📝 提交信息: $COMMIT_MESSAGE"
    echo "🌐 远程仓库已更新"
else
    echo "❌ 推送失败，请检查网络连接"
    exit 1
fi

echo "🎉 自动推送完成！"
