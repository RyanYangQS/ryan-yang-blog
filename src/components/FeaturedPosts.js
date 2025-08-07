import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, formatDate } from '../utils/blogUtils';

// 计算阅读时间（基于中文字符数）
const calculateReadTime = (content) => {
  const chineseCharCount = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWordCount = content.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).length;
  const totalWords = chineseCharCount + englishWordCount;
  const readTimeMinutes = Math.ceil(totalWords / 300); // 假设每分钟300字
  return `${readTimeMinutes}分钟`;
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        // 获取最新的三篇文章
        const latestPosts = allPosts.slice(0, 3).map((post, index) => ({
          id: index + 1,
          slug: post.slug,
          title: post.frontmatter.title,
          excerpt: post.frontmatter.excerpt || '文章摘要加载中...',
          category: post.frontmatter.tags?.[0] || '技术',
          readTime: calculateReadTime(post.content),
          publishDate: formatDate(post.frontmatter.date),
          image: post.frontmatter.coverImage || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          tags: post.frontmatter.tags || []
        }));
        
        setFeaturedPosts(latestPosts);
      } catch (error) {
        console.error('加载最新文章失败:', error);
        // 设置默认文章
        setFeaturedPosts([
          {
            id: 1,
            slug: 'react-hooks-depth-analysis',
            title: "React Hooks 深度解析",
            excerpt: "深入解析React Hooks的核心概念和使用技巧，从useState到自定义Hooks，掌握函数式组件的新范式。",
            category: "React",
            readTime: "8分钟",
            publishDate: "2024-12-15",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["React", "Hooks", "前端"]
          },
          {
            id: 2,
            slug: 'typescript-frontend-practice',
            title: "TypeScript 在前端开发中的实践",
            excerpt: "深入探讨TypeScript在前端开发中的应用实践，从基础类型到高级特性，掌握类型安全的JavaScript开发。",
            category: "TypeScript",
            readTime: "12分钟",
            publishDate: "2024-12-10",
            image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["TypeScript", "JavaScript", "类型系统"]
          },
          {
            id: 3,
            slug: 'modern-frontend-engineering',
            title: "现代前端工程化实践",
            excerpt: "深入探讨现代前端工程化的核心概念和实践经验，从构建工具到自动化部署，掌握企业级前端开发流程。",
            category: "工程化",
            readTime: "10分钟",
            publishDate: "2024-12-05",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["前端工程化", "Webpack", "CI/CD"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadLatestPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl overflow-hidden border border-dark-600 animate-pulse">
            <div className="h-48 bg-dark-600"></div>
            <div className="p-6">
              <div className="h-4 bg-dark-600 rounded mb-4"></div>
              <div className="h-6 bg-dark-600 rounded mb-2"></div>
              <div className="h-4 bg-dark-600 rounded mb-2"></div>
              <div className="h-4 bg-dark-600 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredPosts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          className="group"
        >
          <Link to={`/blog/${post.slug}`} className="block">
            <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl overflow-hidden border border-dark-600 hover:border-primary-500 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.publishDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-dark-600 text-gray-300 text-xs rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-primary-400 text-sm font-medium group-hover:text-primary-300 transition-colors duration-300">
                    阅读全文
                  </span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
};

export default FeaturedPosts; 