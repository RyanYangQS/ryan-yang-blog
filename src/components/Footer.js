import { motion } from 'framer-motion';
import { Code, Github, Heart, Linkedin, Mail } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Ryan Yang</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              前端开发工程师，专注于现代Web技术栈。热爱创造优秀的用户体验，擅长React、Vue、TypeScript等现代前端技术。
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/ryanyang"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-dark-800 rounded-lg hover:bg-primary-600 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/ryanyang"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-dark-800 rounded-lg hover:bg-primary-600 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:ryan.yang@example.com"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-dark-800 rounded-lg hover:bg-primary-600 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  博客
                </Link>
              </li>
              <li>
                <Link
                  to="/skills"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  技能
                </Link>
              </li>
              <li>
                <Link
                  to="/resume"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  简历
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-4">联系方式</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="text-primary-400">邮箱：</span>
                ryan.yang@example.com
              </li>
              <li className="text-gray-300">
                <span className="text-primary-400">电话：</span>
                +86 138-0000-0000
              </li>
              <li className="text-gray-300">
                <span className="text-primary-400">地址：</span>
                北京，中国
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Ryan Yang. 保留所有权利。
          </p>
          <div className="flex items-center space-x-2 text-gray-400 text-sm mt-4 md:mt-0">
            <span>用</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>制作</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 