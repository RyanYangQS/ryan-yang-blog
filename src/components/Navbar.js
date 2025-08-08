import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, Code, FileText, Home, Menu, User, X, LogIn, LogOut, UserPlus, Settings, ChevronDown, Users, Eye, Activity } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import analyticsService from '../lib/analyticsService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [stats, setStats] = useState({
    onlineUsers: 0,
    totalViews: 0,
    todayViews: 0
  });
  const userDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 检查用户登录状态
  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  // 加载统计数据
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await analyticsService.getRealTimeStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/blog', label: '博客', icon: FileText },
    { path: '/skills', label: '技能', icon: Code },
    { path: '/resume', label: '简历', icon: User },
    { path: '/analytics', label: '统计', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setShowUserDropdown(false);
    window.dispatchEvent(new Event('storage'));
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-900/90 backdrop-blur-md border-b border-dark-700 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">Ryan Yang</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* 统计信息 */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1 text-green-400">
                  <Users className="w-3 h-3" />
                  <span>{formatNumber(stats.onlineUsers)}</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-400">
                  <Activity className="w-3 h-3" />
                  <span>{formatNumber(stats.todayViews)}</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-400">
                  <Eye className="w-3 h-3" />
                  <span>{formatNumber(stats.totalViews)}</span>
                </div>
              </div>

              {/* 导航菜单 */}
              <div className="flex items-center space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                          isActive(item.path)
                            ? 'bg-primary-600 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-dark-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* 用户认证区域 */}
              <div className="flex items-center space-x-2" ref={userDropdownRef}>
                {currentUser ? (
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex items-center space-x-3 px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="text-gray-300 text-sm hidden lg:block">
                        {currentUser.name || currentUser.nickname || currentUser.email}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
                    </motion.button>

                    {/* 用户下拉菜单 */}
                    <AnimatePresence>
                      {showUserDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-64 bg-dark-800 rounded-xl border border-dark-600 shadow-2xl overflow-hidden"
                        >
                          {/* 用户信息头部 */}
                          <div className="p-4 border-b border-dark-600">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-lg font-medium">
                                  {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-white font-semibold">
                                  {currentUser.name || currentUser.nickname || '用户'}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  {currentUser.email}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* 菜单选项 */}
                          <div className="py-2">
                            <Link
                              to="/profile"
                              onClick={() => setShowUserDropdown(false)}
                              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors"
                            >
                              <User className="w-5 h-5" />
                              <span>个人信息</span>
                            </Link>
                            <button
                              onClick={() => setShowUserDropdown(false)}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors"
                            >
                              <Settings className="w-5 h-5" />
                              <span>设置</span>
                            </button>
                            <div className="border-t border-dark-600 my-2"></div>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
                            >
                              <LogOut className="w-5 h-5" />
                              <span>退出登录</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>登录</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-dark-800/95 backdrop-blur-md border-t border-dark-700"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ delay: navItems.indexOf(item) * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                            isActive(item.path)
                              ? 'bg-primary-600 text-white'
                              : 'text-gray-300 hover:text-white hover:bg-dark-700'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* 移动端用户认证 */}
                  <div className="border-t border-dark-600 pt-2 mt-2">
                    {currentUser ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 px-3 py-2 text-gray-300">
                          <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <span className="text-sm">
                            {currentUser.name || currentUser.nickname || currentUser.email}
                          </span>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 text-primary-400 hover:text-primary-300 hover:bg-dark-700 rounded-lg w-full"
                        >
                          <User className="w-5 h-5" />
                          <span>个人信息</span>
                        </Link>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-gray-300 hover:bg-dark-700 rounded-lg w-full"
                        >
                          <Settings className="w-5 h-5" />
                          <span>设置</span>
                        </button>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                          className="flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-dark-700 rounded-lg w-full"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>退出登录</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setShowAuthModal(true);
                          setIsOpen(false);
                        }}
                        className="flex items-center space-x-3 px-3 py-2 text-primary-400 hover:text-primary-300 hover:bg-dark-700 rounded-lg w-full"
                      >
                        <LogIn className="w-5 h-5" />
                        <span>登录</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* 认证模态框 */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar; 