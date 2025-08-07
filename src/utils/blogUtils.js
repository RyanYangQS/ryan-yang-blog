// 博客文章读取工具
import matter from 'gray-matter';

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
      
      // 使用markdown文件头部的frontmatter信息
      const frontmatter = {
        title: document.data.title || slug,
        date: document.data.date || new Date().toISOString(),
        author: document.data.author || '杨青松',
        tags: document.data.tags || [],
        excerpt: document.data.excerpt || '',
        coverImage: document.data.coverImage || '',
        // 保留所有原始的frontmatter数据
        ...document.data
      };
      
      posts.push({
        slug,
        frontmatter,
        content: document.content,
      });
    } catch (error) {
      console.error(`Error parsing post ${slug}:`, error);
      // 添加默认文章数据以防解析失败
      posts.push({
        slug,
        frontmatter: {
          title: slug,
          date: new Date().toISOString(),
          author: '杨青松',
          tags: [],
          excerpt: '文章加载中...',
          coverImage: '',
        },
        content: '文章内容加载失败，请稍后重试。',
      });
    }
  }

  // 按日期排序
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
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
    const document = matter(fileContent);
    
    // 使用markdown文件头部的frontmatter信息
    const frontmatter = {
      title: document.data.title || slug,
      date: document.data.date || new Date().toISOString(),
      author: document.data.author || '杨青松',
      tags: document.data.tags || [],
      excerpt: document.data.excerpt || '',
      coverImage: document.data.coverImage || '',
      // 保留所有原始的frontmatter数据
      ...document.data
    };
    
    return {
      slug,
      frontmatter,
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
  if (!dateString) {
    return '无效日期';
  }
  
  try {
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
  } catch (error) {
    console.error('日期格式化错误:', error);
    return '无效日期';
  }
};
