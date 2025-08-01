import { motion } from 'framer-motion';
import { Code, Edit, FileText, Lock, Plus, Save, Trash2, User } from 'lucide-react';
import React, { useState } from 'react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // 博客文章数据
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'React 18 新特性详解',
      content: 'React 18 带来了许多激动人心的新特性...',
      category: '前端开发',
      published: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'TypeScript 高级技巧',
      content: '深入探讨 TypeScript 的高级用法...',
      category: '编程语言',
      published: false,
      date: '2024-01-10'
    }
  ]);

  // 技能数据
  const [skills, setSkills] = useState([
    { id: 1, name: 'React', level: 90, category: '前端开发' },
    { id: 2, name: 'Vue', level: 85, category: '前端开发' },
    { id: 3, name: 'Node.js', level: 80, category: '后端开发' },
    { id: 4, name: 'MongoDB', level: 75, category: '数据库' }
  ]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('密码错误！');
    }
  };

  const handleDelete = (id, type) => {
    if (window.confirm('确定要删除这个项目吗？')) {
      switch (type) {
        case 'blog':
          setBlogPosts(blogPosts.filter(post => post.id !== id));
          break;
        case 'skill':
          setSkills(skills.filter(skill => skill.id !== id));
          break;
        default:
          break;
      }
    }
  };

  const togglePublish = (id) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === id ? { ...post, published: !post.published } : post
    ));
  };

  const handleSave = (type) => {
    alert(`${type}设置已保存！`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="max-w-md mx-auto mt-20 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <Lock className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">管理员登录</h2>
              <p className="text-gray-400">请输入管理员密码</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                登录
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            管理后台
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            管理博客文章、技能配置和简历信息
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-dark-800 rounded-lg p-1 flex flex-row">
            {[
              { id: 'blog', label: '博客管理', icon: FileText },
              { id: 'skills', label: '技能配置', icon: Code },
              { id: 'resume', label: '简历配置', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 mx-1 ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-effect rounded-2xl p-8"
        >
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">博客文章管理</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>新建文章</span>
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-dark-700 rounded-lg p-4 border border-dark-600"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">{post.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{post.content.substring(0, 100)}...</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{post.category}</span>
                          <span>{post.date}</span>
                          <span className={`px-2 py-1 rounded ${post.published ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}>
                            {post.published ? '已发布' : '草稿'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => togglePublish(post.id)}
                          className="p-2 text-green-400 hover:text-green-300"
                          title={post.published ? '取消发布' : '发布'}
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(post.id, 'blog')}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">技能配置</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>添加技能</span>
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-dark-700 rounded-lg p-4 border border-dark-600"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(skill.id, 'skill')}
                          className="p-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">熟练度</span>
                        <span className="text-primary-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-dark-600 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">{skill.category}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">简历配置</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSave('resume')}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>保存更改</span>
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white">个人信息</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      defaultValue="Ryan Yang"
                      placeholder="姓名"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      defaultValue="前端开发工程师"
                      placeholder="职位"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      defaultValue="ryan@example.com"
                      placeholder="邮箱"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      defaultValue="+86 138-0000-0000"
                      placeholder="电话"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    />
                    <textarea
                      defaultValue="热爱技术，专注于前端开发，有5年+开发经验..."
                      placeholder="个人简介"
                      rows={4}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin; 