import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
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
      title: "开源贡献者",
      subtitle: "积极参与开源项目",
      description: "为开源社区贡献代码，推动前端技术发展",
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="mailto:ryan.yang@example.com"
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>联系我</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 px-4">
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
              href="mailto:ryan.yang@example.com"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-dark-800 rounded-full hover:bg-primary-600 transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 