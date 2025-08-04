// 博客文章读取工具
import matter from 'gray-matter';

// 获取所有博客文章
export const getAllPosts = async () => {
  const context = require.context('../content/blog', false, /\.md$/);
  const posts = [];

  for (const key of context.keys()) {
    const post = key.slice(2); // 移除 './'
    const content = await import(`../content/blog/${post}`);
    const document = matter(content.default);
    
    posts.push({
      slug: post.replace('.md', ''),
      frontmatter: document.data,
      content: document.content,
    });
  }

  // 按日期排序
  return posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
};

// 获取单个博客文章
export const getPostBySlug = async (slug) => {
  try {
    const content = await import(`../content/blog/${slug}.md`);
    const document = matter(content.default);
    
    return {
      slug,
      frontmatter: document.data,
      content: document.content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
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
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}; 