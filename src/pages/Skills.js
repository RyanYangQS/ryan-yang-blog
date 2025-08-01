import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, Code, Database, Globe, Shield, Star, TrendingUp, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';

// 注册Chart.js组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const Skills = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // 雷达图数据
  const radarData = {
    labels: ['前端开发', '后端开发', '数据库', 'DevOps', '设计', '移动端'],
    datasets: [
      {
        label: '技能熟练度',
        data: [95, 85, 80, 75, 70, 90],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: '项目经验',
        data: [88, 78, 72, 68, 65, 82],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(16, 185, 129, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // 柱状图数据改为条形图
  const barData = {
    labels: ['React', 'Vue', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
    datasets: [
      {
        label: '项目经验',
        data: [15, 12, 10, 8, 6, 5, 4, 3],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(251, 146, 60, 1)',
        ],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // 环形图数据
  const doughnutData = {
    labels: ['前端开发', '后端开发', '数据库', 'DevOps', '设计'],
    datasets: [
      {
        data: [40, 25, 15, 12, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)', // 蓝色
          'rgba(16, 185, 129, 0.9)', // 浅绿色
          'rgba(245, 158, 11, 0.9)', // 黄色
          'rgba(239, 68, 68, 0.9)', // 红色
          'rgba(6, 182, 212, 0.9)', // 浅蓝色
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(6, 182, 212, 1)',
        ],
        borderWidth: 4,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
      },
    },
  };

  // 雷达图专用配置
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold',
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rect',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          color: '#fff',
          backdropColor: 'transparent',
          font: {
            size: 11,
            weight: 'bold',
          },
          stepSize: 20,
          padding: 6,
          callback: function(value) {
            return value;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          lineWidth: 1,
          circular: true,
        },
        pointLabels: {
          color: '#fff',
          font: {
            size: 13,
            weight: 'bold',
          },
          padding: 12,
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.3)',
          lineWidth: 1,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: 'rgba(59, 130, 246, 1)',
        borderColor: '#fff',
        borderWidth: 2,
      },
      line: {
        borderWidth: 2,
        tension: 0,
        fill: false,
      },
    },
  };

  // 条形图专用配置
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // 水平条形图
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold',
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(16, 185, 129, 0.8)',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
          font: {
            size: 11,
            weight: 'bold',
          },
          padding: 8,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1,
        },
        border: {
          color: 'rgba(255, 255, 255, 0.2)',
          width: 1,
        },
      },
      y: {
        ticks: {
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold',
          },
          padding: 8,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1,
        },
        border: {
          color: 'rgba(255, 255, 255, 0.2)',
          width: 1,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
        borderSkipped: false,
      },
    },
  };

  // 环形图专用配置
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold',
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(245, 158, 11, 0.8)',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      },
    },
    cutout: '60%',
    radius: '90%',
  };

  const skillCategories = [
    {
      icon: Code,
      title: "前端基础",
      skills: [
        { name: "HTML5", level: 95, description: "语义化标签、表单验证、多媒体支持" },
        { name: "CSS3", level: 90, description: "Flexbox、Grid、动画、响应式设计" },
        { name: "JavaScript", level: 88, description: "ES6+、异步编程、DOM操作" },
        { name: "TypeScript", level: 85, description: "类型系统、接口、泛型、装饰器" }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "框架生态",
      skills: [
        { name: "React", level: 90, description: "Hooks、Context、性能优化、状态管理" },
        { name: "Vue", level: 85, description: "Composition API、Vuex、Vue Router" },
        { name: "Next.js", level: 80, description: "SSR、SSG、API Routes、中间件" },
        { name: "Nuxt.js", level: 75, description: "服务端渲染、静态生成、模块系统" }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "后端技术",
      skills: [
        { name: "Node.js", level: 80, description: "Express、中间件、异步处理、性能优化" },
        { name: "MongoDB", level: 75, description: "聚合管道、索引优化、数据建模" },
        { name: "PostgreSQL", level: 70, description: "SQL查询、事务处理、性能调优" },
        { name: "Redis", level: 65, description: "缓存策略、数据结构、集群配置" }
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "部署运维",
      skills: [
        { name: "Docker", level: 75, description: "容器化、镜像构建、编排部署" },
        { name: "AWS", level: 70, description: "EC2、S3、Lambda、CloudFormation" },
        { name: "Vercel", level: 85, description: "静态部署、Serverless Functions" },
        { name: "Netlify", level: 80, description: "持续部署、表单处理、函数" }
      ],
      color: "from-indigo-500 to-purple-500"
    }
  ];

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
            技术技能
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            掌握现代前端开发的核心技术栈，持续学习新技术
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
              { id: 'overview', label: '概览', icon: TrendingUp },
              { id: 'charts', label: '图表', icon: BarChart3 },
              { id: 'details', label: '详情', icon: Code }
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
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Code, label: "技术栈", value: "20+", description: "掌握的技术" },
                  { icon: Star, label: "项目经验", value: "50+", description: "完成的项目" },
                  { icon: TrendingUp, label: "学习时长", value: "5年+", description: "持续学习" },
                  { icon: Shield, label: "认证", value: "10+", description: "技术认证" }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass-effect rounded-2xl p-6 text-center"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                      <div className="text-white font-medium mb-1">{stat.label}</div>
                      <div className="text-gray-400 text-sm">{stat.description}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Skills Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="skill-card"
                    >
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                      </div>
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white font-medium">{skill.name}</span>
                              <span className="text-primary-400 font-bold">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-dark-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                              />
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{skill.description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'charts' && (
            <motion.div
              key="charts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Radar Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 border border-blue-500/30 shadow-2xl shadow-blue-500/20 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)",
                  borderColor: "rgba(59, 130, 246, 0.6)",
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">技能雷达图</h3>
                <motion.div 
                  className="max-w-2xl mx-auto h-80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {radarData && radarData.labels && (
                    <Radar data={radarData} options={radarOptions} />
                  )}
                </motion.div>
              </motion.div>

              {/* Bar Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20 border border-green-500/30 shadow-2xl shadow-green-500/20 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.4)",
                  borderColor: "rgba(16, 185, 129, 0.6)",
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">项目经验分布</h3>
                <motion.div 
                  className="max-w-4xl mx-auto h-80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {barData && barData.labels && (
                    <Bar data={barData} options={barOptions} />
                  )}
                </motion.div>
              </motion.div>

              {/* Doughnut Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20 border border-orange-500/30 shadow-2xl shadow-orange-500/20 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.4)",
                  borderColor: "rgba(245, 158, 11, 0.6)",
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">技能分布</h3>
                <motion.div 
                  className="max-w-md mx-auto h-80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {doughnutData && doughnutData.labels && (
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="skill-card"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                        <p className="text-gray-400">详细技能展示</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="bg-dark-700 rounded-xl p-4 border border-dark-600 hover:border-primary-500 transition-all duration-300"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-white font-semibold">{skill.name}</span>
                            <span className="text-primary-400 font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-dark-600 rounded-full h-2 mb-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 + skillIndex * 0.1 + 0.3 }}
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                            />
                          </div>
                          <p className="text-gray-300 text-sm">{skill.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Skills; 