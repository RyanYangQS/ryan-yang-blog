import { motion } from 'framer-motion';
import { ExternalLink, Code, Package, Globe, Settings, BarChart3 } from 'lucide-react';
import React, { useState } from 'react';

const FrontendNavigation = () => {
  const [activeTab, setActiveTab] = useState('libraries');

  const navigationData = {
    libraries: {
      title: "前端库",
      icon: <Package className="w-5 h-5" />,
      items: [
        {
          name: "React",
          description: "用于构建用户界面的JavaScript库",
          url: "https://react.dev",
          category: "框架"
        },
        {
          name: "Vue.js",
          description: "渐进式JavaScript框架",
          url: "https://vuejs.org",
          category: "框架"
        },
        {
          name: "Angular",
          description: "Google开发的前端框架",
          url: "https://angular.io",
          category: "框架"
        },
        {
          name: "TypeScript",
          description: "JavaScript的超集，添加了类型系统",
          url: "https://www.typescriptlang.org",
          category: "语言"
        },
        {
          name: "Lodash",
          description: "JavaScript实用工具库",
          url: "https://lodash.com",
          category: "工具库"
        },
        {
          name: "Axios",
          description: "基于Promise的HTTP客户端",
          url: "https://axios-http.com",
          category: "HTTP"
        }
      ]
    },
    tools: {
      title: "开发工具",
      icon: <Settings className="w-5 h-5" />,
      items: [
        {
          name: "VS Code",
          description: "轻量级但功能强大的代码编辑器",
          url: "https://code.visualstudio.com",
          category: "编辑器"
        },
        {
          name: "Chrome DevTools",
          description: "Chrome浏览器开发者工具",
          url: "https://developers.google.com/web/tools/chrome-devtools",
          category: "调试"
        },
        {
          name: "Postman",
          description: "API开发和测试工具",
          url: "https://www.postman.com",
          category: "API"
        },
        {
          name: "Figma",
          description: "协作式界面设计工具",
          url: "https://www.figma.com",
          category: "设计"
        },
        {
          name: "Git",
          description: "分布式版本控制系统",
          url: "https://git-scm.com",
          category: "版本控制"
        },
        {
          name: "Docker",
          description: "容器化平台",
          url: "https://www.docker.com",
          category: "容器"
        }
      ]
    },
    node: {
      title: "Node.js生态",
      icon: <Code className="w-5 h-5" />,
      items: [
        {
          name: "Node.js",
          description: "JavaScript运行时环境",
          url: "https://nodejs.org",
          category: "运行时"
        },
        {
          name: "Express",
          description: "Node.js Web应用框架",
          url: "https://expressjs.com",
          category: "框架"
        },
        {
          name: "Koa",
          description: "Express团队设计的轻量级框架",
          url: "https://koajs.com",
          category: "框架"
        },
        {
          name: "NestJS",
          description: "构建可扩展的服务器端应用程序",
          url: "https://nestjs.com",
          category: "框架"
        },
        {
          name: "PM2",
          description: "Node.js进程管理器",
          url: "https://pm2.keymetrics.io",
          category: "进程管理"
        },
        {
          name: "Nodemon",
          description: "开发环境自动重启工具",
          url: "https://nodemon.io",
          category: "开发工具"
        }
      ]
    },
    build: {
      title: "编译构建",
      icon: <Settings className="w-5 h-5" />,
      items: [
        {
          name: "Webpack",
          description: "JavaScript模块打包工具",
          url: "https://webpack.js.org",
          category: "打包工具"
        },
        {
          name: "Vite",
          description: "下一代前端构建工具",
          url: "https://vitejs.dev",
          category: "构建工具"
        },
        {
          name: "Rollup",
          description: "JavaScript模块打包器",
          url: "https://rollupjs.org",
          category: "打包工具"
        },
        {
          name: "Babel",
          description: "JavaScript编译器",
          url: "https://babeljs.io",
          category: "编译器"
        },
        {
          name: "ESLint",
          description: "JavaScript代码检查工具",
          url: "https://eslint.org",
          category: "代码检查"
        },
        {
          name: "Prettier",
          description: "代码格式化工具",
          url: "https://prettier.io",
          category: "格式化"
        }
      ]
    },
    visualization: {
      title: "可视化",
      icon: <BarChart3 className="w-5 h-5" />,
      items: [
        {
          name: "D3.js",
          description: "数据驱动的文档操作库",
          url: "https://d3js.org",
          category: "图表库"
        },
        {
          name: "ECharts",
          description: "百度开源的图表库",
          url: "https://echarts.apache.org",
          category: "图表库"
        },
        {
          name: "Chart.js",
          description: "简单而灵活的图表库",
          url: "https://www.chartjs.org",
          category: "图表库"
        },
        {
          name: "Three.js",
          description: "3D图形库",
          url: "https://threejs.org",
          category: "3D"
        },
        {
          name: "Framer Motion",
          description: "React动画库",
          url: "https://www.framer.com/motion",
          category: "动画"
        },
        {
          name: "GSAP",
          description: "专业级动画库",
          url: "https://greensock.com/gsap",
          category: "动画"
        }
      ]
    },
    community: {
      title: "生态社区",
      icon: <Globe className="w-5 h-5" />,
      items: [
        {
          name: "GitHub",
          description: "代码托管平台",
          url: "https://github.com",
          category: "代码托管"
        },
        {
          name: "Stack Overflow",
          description: "程序员问答社区",
          url: "https://stackoverflow.com",
          category: "问答"
        },
        {
          name: "MDN Web Docs",
          description: "Web技术文档",
          url: "https://developer.mozilla.org",
          category: "文档"
        },
        {
          name: "CSS-Tricks",
          description: "CSS技巧和教程",
          url: "https://css-tricks.com",
          category: "教程"
        },
        {
          name: "Dev.to",
          description: "开发者社区",
          url: "https://dev.to",
          category: "社区"
        },
        {
          name: "Frontend Masters",
          description: "前端学习平台",
          url: "https://frontendmasters.com",
          category: "学习"
        }
      ]
    }
  };

  const tabs = [
    { id: 'libraries', label: '前端库', icon: <Package className="w-4 h-4" /> },
    { id: 'tools', label: '开发工具', icon: <Settings className="w-4 h-4" /> },
    { id: 'node', label: 'Node.js生态', icon: <Code className="w-4 h-4" /> },
    { id: 'build', label: '编译构建', icon: <Settings className="w-4 h-4" /> },
    { id: 'visualization', label: '可视化', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'community', label: '生态社区', icon: <Globe className="w-4 h-4" /> }
  ];

  return (
    <div className="py-20 px-4">
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

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {navigationData[activeTab].items.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group block"
            >
              <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl p-6 border border-dark-600 hover:border-primary-500 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-dark-600 text-primary-400 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-primary-400 group-hover:text-primary-300 transition-colors duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Quick Access Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FrontendNavigation;
