import { motion } from 'framer-motion';
import { ArrowRight, Package, Settings, Code, BarChart3, Globe, ExternalLink } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedPosts from '../components/FeaturedPosts';
import HeroSection from '../components/HeroSection';
import SkillsOverview from '../components/SkillsOverview';
import StatsSection from '../components/StatsSection';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "前端开发工程师",
      subtitle: "专注于现代Web技术栈",
      description: "热爱创造优秀的用户体验，擅长React、Vue、TypeScript等现代前端技术",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "技术博客作者",
      subtitle: "分享前端开发经验",
      description: "定期分享前端开发技巧、最佳实践和项目经验",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "from-green-500 to-blue-600"
    },
    {
      title: "摄影爱好者",
      subtitle: "喜欢用相机记录生活",
      description: "记录美好瞬间 分享美好生活",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "from-purple-500 to-pink-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        slides={heroSlides} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide}
      />

      {/* Frontend Navigation Quick Access */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              前端开发导航
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              精选前端开发必备的工具、库和资源，助力提升开发效率
            </p>
          </motion.div>

          {/* Quick Navigation Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "前端库",
                description: "React、Vue、Angular等主流框架",
                icon: Package,
                color: "from-blue-500 to-cyan-500",
                count: "6个资源"
              },
              {
                title: "开发工具",
                description: "VS Code、Chrome DevTools等开发工具",
                icon: Settings,
                color: "from-green-500 to-emerald-500",
                count: "6个资源"
              },
              {
                title: "Node.js生态",
                description: "Node.js、Express、Koa等后端技术",
                icon: Code,
                color: "from-purple-500 to-pink-500",
                count: "6个资源"
              },
              {
                title: "编译构建",
                description: "Webpack、Vite、Babel等构建工具",
                icon: Settings,
                color: "from-orange-500 to-red-500",
                count: "6个资源"
              },
              {
                title: "可视化",
                description: "D3.js、ECharts、Chart.js等图表库",
                icon: BarChart3,
                color: "from-indigo-500 to-purple-500",
                count: "6个资源"
              },
              {
                title: "生态社区",
                description: "GitHub、MDN、Stack Overflow等社区",
                icon: Globe,
                color: "from-teal-500 to-cyan-500",
                count: "6个资源"
              }
            ].map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl p-6 border border-dark-600 hover:border-primary-500 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{category.count}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-400 text-sm font-medium">查看详情</span>
                      <Link to="/skills" className="text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Access Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="glass-effect rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                快速访问
              </h3>
              <p className="text-gray-300 mb-6">
                常用工具和资源的快速入口
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: "React 官方文档", url: "https://react.dev", icon: "⚛️" },
                  { name: "Vue.js 官方文档", url: "https://vuejs.org", icon: "🟢" },
                  { name: "TypeScript 官方文档", url: "https://www.typescriptlang.org", icon: "🔷" },
                  { name: "MDN Web Docs", url: "https://developer.mozilla.org", icon: "📚" },
                  { name: "GitHub", url: "https://github.com", icon: "🐙" },
                  { name: "Stack Overflow", url: "https://stackoverflow.com", icon: "💬" }
                ].map((quickLink, index) => (
                  <motion.a
                    key={quickLink.name}
                    href={quickLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-primary-600 rounded-full text-white transition-all duration-300"
                  >
                    <span className="text-lg">{quickLink.icon}</span>
                    <span className="text-sm font-medium">{quickLink.name}</span>
                  </motion.a>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
              >
                <Link
                  to="/skills"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>查看完整导航</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Posts */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              最新技术文章
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              分享前端开发的最新趋势、技术深度解析和实用技巧
            </p>
          </motion.div>
          <FeaturedPosts />
        </div>
      </section>

            {/* Skills Overview */}
      <section className="py-20 px-4 bg-gradient-to-r from-dark-800/50 to-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              技术技能概览
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              掌握现代前端开发的核心技术栈
            </p>
          </motion.div>
          <SkillsOverview />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              准备开始合作？
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              如果您正在寻找一位经验丰富的前端开发工程师，我很乐意与您讨论项目需求
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/resume"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>查看简历</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="mailto:13067915779@163.com"
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>联系我</span>
                </a>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      {/* <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center space-x-6"
          >
            <motion.a
              href="https://github.com/ryanyang"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-dark-800 rounded-full hover:bg-primary-600 transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/ryanyang"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-dark-800 rounded-full hover:bg-primary-600 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:13067915779@163.com"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-dark-800 rounded-full hover:bg-primary-600 transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default Home; 