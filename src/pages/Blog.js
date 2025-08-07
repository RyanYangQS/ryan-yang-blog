import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, Clock, Filter, Search, Tag } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, getExcerpt, formatDate } from '../utils/blogUtils';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取所有博客文章
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // 获取所有分类
  const getCategories = () => {
    const categories = new Set();
    posts.forEach(post => {
      if (post.frontmatter.tags) {
        post.frontmatter.tags.forEach(tag => categories.add(tag));
      }
    });

    return [
      { id: 'all', name: '全部', count: posts.length },
      ...Array.from(categories).map(category => ({
        id: category,
        name: category,
        count: posts.filter(p => p.frontmatter.tags && p.frontmatter.tags.includes(category)).length
      }))
    ];
  };

  const categories = getCategories();

  useEffect(() => {
    let filtered = posts;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.frontmatter.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.frontmatter.tags && post.frontmatter.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // 分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.frontmatter.tags && post.frontmatter.tags.includes(selectedCategory)
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载博客文章...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            分享前端开发经验、技术心得和最佳实践
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white hover:border-primary-500 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>分类</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-dark-800 border border-gray-600 rounded-lg shadow-lg z-10"
                  >
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-dark-700 transition-colors ${
                          selectedCategory === category.id ? 'text-primary-400 bg-dark-700' : 'text-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-sm text-gray-500">({category.count})</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-gray-400">
            找到 {filteredPosts.length} 篇文章
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.frontmatter.coverImage || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 图片加载失败时使用默认图片
                      e.target.src = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  {post.frontmatter.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.frontmatter.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-400"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {post.frontmatter.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.frontmatter.excerpt || getExcerpt(post.content)}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.frontmatter.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{Math.ceil(post.content.split(' ').length / 200)}分钟</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <span>阅读全文</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">没有找到相关文章</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-primary-400 hover:text-primary-300 transition-colors"
            >
              清除筛选条件
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog; 