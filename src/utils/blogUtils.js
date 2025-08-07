// 博客文章读取工具
import matter from 'gray-matter';
// 直接导入buffer包
import { Buffer } from 'buffer';

// 调试日志：检查Buffer是否正确导入
console.log('Buffer imported:', Buffer);
console.log('Buffer is defined:', typeof Buffer !== 'undefined');

// 从src/content/blog目录动态导入所有markdown文件
const postsContext = require.context('../content/blog', false, /\.md$/);

// 文章映射
const postsMap = {};

// 遍历所有markdown文件并构建postsMap
postsContext.keys().forEach((key) => {
  // 提取文件名作为slug（移除 ./ 和 .md 后缀）
  const slug = key.replace(/^\.\//, '').replace(/\.md$/, '');
  // 导入文件内容
  const content = postsContext(key);
  postsMap[slug] = content;
});

// 获取所有博客文章
export const getAllPosts = async () => {
  const posts = [];

  for (const [slug, content] of Object.entries(postsMap)) {
    try {
      // 确保在浏览器环境中安全地处理内容
      const fileContent = typeof content === 'string' ? content : content.default;
      const document = matter(fileContent);
      
      posts.push({
        slug,
        frontmatter: document.data,
        content: document.content,
      });
    } catch (error) {
      console.error(`Error parsing post ${slug}:`, error);
    }
  }

  // 按日期排序
  return posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
};

// 获取单个博客文章
export const getPostBySlug = async (slug) => {
  try {
    const content = postsMap[slug];
    if (!content) {
      console.error(`Post not found: ${slug}`);
      return null;
    }

    // 确保在浏览器环境中安全地处理内容
    const fileContent = typeof content === 'string' ? content : content.default;
    // 显式使用导入的Buffer
    const document = matter(fileContent, { Buffer });
    
    return {
      slug,
      frontmatter: document.data,
      content: document.content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    // 输出详细错误信息以调试
    console.error('Error details:', error.message, error.stack);
    return null;
  }
};

// 获取文章摘要
export const getExcerpt = (content, maxLength = 150) => {
  const text = content.replace(/[#*`]/g, '').replace(/\n/g, ' ').trim();
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// 格式化日期
export const formatDate = (dateString) => {
  // 添加调试日志
  console.log('格式化日期:', dateString);
  const date = new Date(dateString);
  
  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    console.error('无效的日期字符串:', dateString);
    return '无效日期';
  }
  
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};