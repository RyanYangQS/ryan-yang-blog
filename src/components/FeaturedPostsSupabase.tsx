import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../lib/supabaseService';
import { Post } from '../lib/supabase';

// 计算阅读时间（基于中文字符数）
const calculateReadTime = (content: string) => {
  const chineseCharCount = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWordCount = content.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).length;
  const totalWords = chineseCharCount + englishWordCount;
  const readTimeMinutes = Math.ceil(totalWords / 300); // 假设每分钟300字
  return `${readTimeMinutes}分钟`;
};

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const posts = await postService.getFeaturedPosts();
        setFeaturedPosts(posts);
      } catch (error) {
        console.error('加载特色文章失败:', error);
        // 设置默认文章
        setFeaturedPosts([
          {
            id: '1',
            title: "React Hooks 深度解析",
            slug: 'react-hooks-depth-analysis',
            content: "深入解析React Hooks的核心概念和使用技巧...",
            excerpt: "深入解析React Hooks的核心概念和使用技巧，从useState到自定义Hooks，掌握函数式组件的新范式。",
            published_at: '2024-12-15T00:00:00Z',
            created_at: '2024-12-15T00:00:00Z',
            updated_at: '2024-12-15T00:00:00Z',
            tags: ["React", "Hooks", "前端"],
            featured: true
          },
          {
            id: '2',
            title: "TypeScript 在前端开发中的实践",
            slug: 'typescript-frontend-practice',
            content: "深入探讨TypeScript在前端开发中的应用实践...",
            excerpt: "深入探讨TypeScript在前端开发中的应用实践，从基础类型到高级特性，掌握类型安全的JavaScript开发。",
            published_at: '2024-12-10T00:00:00Z',
            created_at: '2024-12-10T00:00:00Z',
            updated_at: '2024-12-10T00:00:00Z',
            tags: ["TypeScript", "JavaScript", "类型系统"],
            featured: true
          },
          {
            id: '3',
            title: "现代前端工程化实践",
            slug: 'modern-frontend-engineering',
            content: "深入探讨现代前端工程化的核心概念...",
            excerpt: "深入探讨现代前端工程化的核心概念和实践经验，从构建工具到自动化部署，掌握企业级前端开发流程。",
            published_at: '2024-12-05T00:00:00Z',
            created_at: '2024-12-05T00:00:00Z',
            updated_at: '2024-12-05T00:00:00Z',
            tags: ["前端工程化", "Webpack", "CI/CD"],
            featured: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPosts();
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
                  src={`https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                    {post.tags[0] || '技术'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{calculateReadTime(post.content)}</span>
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
