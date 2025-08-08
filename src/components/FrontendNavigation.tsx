'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Package, Settings, Code, BarChart3, Globe, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const FrontendNavigation = () => {
  const [activeSection, setActiveSection] = useState('libraries')

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
  }

  const sections = [
    { id: 'libraries', label: '前端库', icon: Package },
    { id: 'tools', label: '开发工具', icon: Settings },
    { id: 'node', label: 'Node.js生态', icon: Code },
    { id: 'build', label: '编译构建', icon: Settings },
    { id: 'visualization', label: '可视化', icon: BarChart3 },
    { id: 'community', label: '生态社区', icon: Globe }
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="glass-effect rounded-3xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">本页目录</h3>
              <div className="space-y-2">
                {sections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-dark-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                        activeSection === section.id ? 'rotate-90' : ''
                      }`} />
                    </motion.button>
                  )
                })}
              </div>

              {/* Quick Access */}
              <div className="mt-8 pt-6 border-t border-dark-600">
                <h4 className="text-lg font-bold text-white mb-4">快速访问</h4>
                <div className="space-y-2">
                  {[
                    { name: "React 官方文档", url: "https://react.dev", icon: "⚛️" },
                    { name: "Vue.js 官方文档", url: "https://vuejs.org", icon: "🟢" },
                    { name: "TypeScript 官方文档", url: "https://www.typescriptlang.org", icon: "🔷" },
                    { name: "MDN Web Docs", url: "https://developer.mozilla.org", icon: "📚" }
                  ].map((quickLink, index) => (
                    <motion.a
                      key={quickLink.name}
                      href={quickLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-700 transition-all duration-300"
                    >
                      <span className="text-lg">{quickLink.icon}</span>
                      <span className="text-sm font-medium">{quickLink.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                  {navigationData[activeSection as keyof typeof navigationData].icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{navigationData[activeSection as keyof typeof navigationData].title}</h2>
                  <p className="text-gray-400">精选相关资源和工具</p>
                </div>
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {navigationData[activeSection as keyof typeof navigationData].items.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FrontendNavigation
