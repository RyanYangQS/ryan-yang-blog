import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, Clock, Filter, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // 模拟博客数据
  const blogPosts = [
    {
      id: 1,
      title: "React 18 新特性深度解析",
      excerpt: "深入探讨React 18的并发特性、自动批处理、Suspense等新功能，以及如何在实际项目中应用这些特性提升用户体验。",
      category: "React",
      readTime: "8分钟",
      publishDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "JavaScript", "前端"],
      content: "React 18带来了许多激动人心的新特性..."
    },
    {
      id: 2,
      title: "TypeScript 高级类型技巧",
      excerpt: "分享TypeScript中高级类型的使用技巧，包括条件类型、映射类型、模板字面量类型等，帮助你写出更安全的代码。",
      category: "TypeScript",
      readTime: "12分钟",
      publishDate: "2024-01-10",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["TypeScript", "JavaScript", "类型系统"],
      content: "TypeScript的类型系统非常强大..."
    },
    {
      id: 3,
      title: "现代CSS布局技术对比",
      excerpt: "对比Flexbox、Grid、Container Queries等现代CSS布局技术，分析它们的适用场景和最佳实践。",
      category: "CSS",
      readTime: "10分钟",
      publishDate: "2024-01-05",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["CSS", "布局", "响应式"],
      content: "CSS布局技术在过去几年中发展迅速..."
    },
    {
      id: 4,
      title: "Vue 3 Composition API 实战指南",
      excerpt: "详细介绍Vue 3 Composition API的使用方法，通过实际项目案例展示如何构建可复用的逻辑。",
      category: "Vue",
      readTime: "15分钟",
      publishDate: "2024-01-01",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Vue", "JavaScript", "前端"],
      content: "Vue 3的Composition API是一个革命性的特性..."
    },
    {
      id: 5,
      title: "Node.js 性能优化实践",
      excerpt: "分享Node.js应用性能优化的实用技巧，包括内存管理、异步处理、缓存策略等方面的最佳实践。",
      category: "Node.js",
      readTime: "18分钟",
      publishDate: "2023-12-28",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Node.js", "性能优化", "后端"],
      content: "Node.js的性能优化是一个复杂的话题..."
    },
    {
      id: 6,
      title: "前端工程化最佳实践",
      excerpt: "探讨现代前端项目的工程化实践，包括构建工具、代码规范、自动化测试等方面的经验分享。",
      category: "工程化",
      readTime: "20分钟",
      publishDate: "2023-12-20",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["工程化", "Webpack", "自动化"],
      content: "前端工程化是现代开发中不可或缺的一部分..."
    }
  ];

  const categories = [
    { id: 'all', name: '全部', count: blogPosts.length },
    { id: 'React', name: 'React', count: blogPosts.filter(p => p.category === 'React').length },
    { id: 'Vue', name: 'Vue', count: blogPosts.filter(p => p.category === 'Vue').length },
    { id: 'TypeScript', name: 'TypeScript', count: blogPosts.filter(p => p.category === 'TypeScript').length },
    { id: 'CSS', name: 'CSS', count: blogPosts.filter(p => p.category === 'CSS').length },
    { id: 'Node.js', name: 'Node.js', count: blogPosts.filter(p => p.category === 'Node.js').length },
    { id: '工程化', name: '工程化', count: blogPosts.filter(p => p.category === '工程化').length }
  ];

  useEffect(() => {
    setPosts(blogPosts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            技术博客
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            分享前端开发经验、技术深度解析和实用技巧
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white hover:bg-dark-700 hover:border-primary-500 transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              <span>分类</span>
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-dark-800 rounded-lg border border-dark-600"
              >
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
                      }`}
                    >
                      {category.name} ({category.count})
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-gray-400">
            找到 {filteredPosts.length} 篇文章
            {searchTerm && ` (搜索: "${searchTerm}")`}
            {selectedCategory !== 'all' && ` (分类: ${categories.find(c => c.id === selectedCategory)?.name})`}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={`/blog/${post.id}`} className="block">
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
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">
              没有找到相关文章
            </div>
            <p className="text-gray-500 mt-2">
              尝试调整搜索条件或分类筛选
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog; 