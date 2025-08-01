import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedPosts = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "React 18 新特性深度解析",
      excerpt: "深入探讨React 18的并发特性、自动批处理、Suspense等新功能，以及如何在实际项目中应用这些特性提升用户体验。",
      category: "React",
      readTime: "8分钟",
      publishDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "JavaScript", "前端"]
    },
    {
      id: 2,
      title: "TypeScript 高级类型技巧",
      excerpt: "分享TypeScript中高级类型的使用技巧，包括条件类型、映射类型、模板字面量类型等，帮助你写出更安全的代码。",
      category: "TypeScript",
      readTime: "12分钟",
      publishDate: "2024-01-10",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["TypeScript", "JavaScript", "类型系统"]
    },
    {
      id: 3,
      title: "现代CSS布局技术对比",
      excerpt: "对比Flexbox、Grid、Container Queries等现代CSS布局技术，分析它们的适用场景和最佳实践。",
      category: "CSS",
      readTime: "10分钟",
      publishDate: "2024-01-05",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["CSS", "布局", "响应式"]
    }
  ];

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
    </div>
  );
};

export default FeaturedPosts; 