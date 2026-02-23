import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Building, Calendar, Code, Download, Mail, MapPin, Phone, LogIn, Lock } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import AuthModal from '../components/AuthModal';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('experience');
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const personalInfo = {
    name: "杨青松",
    title: "前端开发工程师",
    email: "13067915779@163.com",
    phone: "13067915779",
    location: "浙江杭州",
    blog: "https://blog.yangqingsong.top/"
  };

  const experience = [
    {
      id: 1,
      company: "华东勘测设计研究院-数智工程研究院",
      position: "前端开发",
      period: "2025.01 - 至今",
      description: "负责智能建设平台相关业务的开发和维护工作\n负责决策支持系统前端部分的搭建及开发维护工作\n负责多网融合通信相关项目的前期技术预研及调研工作\n前端项目优化及性能调优",
      achievements: [],
      technologies: ["Vue2", "Vue3", "凤翎UI", "Element Plus"]
    },
    {
      id: 2,
      company: "智研社(个人工作室)",
      position: "前端技术顾问",
      period: "2024.06 - 2024.12",
      description: "负责前端项目的需求分析、系统设计、编码实现等工作\n负责前端团队组建培训\n负责部分项目的支持和维护",
      achievements: [],
      technologies: ["React", "TypeScript", "SaaS"]
    },
    {
      id: 3,
      company: "浙江中吾科技有限公司",
      position: "前端负责人",
      period: "2022.08 - 2024.03",
      description: "负责一道迈 ERP 系统的搭建、功能开发及维护\n负责前端业务组件库的开发和维护\n负责 SSO 管理系统的搭建、开发、维护\n负责 PDA、H5 项目的搭建、开发、维护\n负责前端团队管理",
      achievements: [],
      technologies: ["React", "微前端", "H5", "PDA"]
    },
    {
      id: 4,
      company: "挖财网络技术有限公司",
      position: "高级前端开发工程师",
      period: "2020.12 - 2022.06",
      description: "负责AMX资产管理平台的开发工作\n负责墨子平台物料黑盒调试的开发\n负责运营中台系统 & 调解系统维护开发",
      achievements: [],
      technologies: ["React", "NodeJS", "低代码"]
    },
    {
      id: 5,
      company: "杭州菜鸟供应链管理有限公司",
      position: "高级前端开发工程师 P6+",
      period: "2020.07 - 2020.11",
      description: "负责大快递相关业务的开发工作\n负责菜鸟裹裹寄件功能的开发工作",
      achievements: [],
      technologies: ["React", "NodeJS", "埋点平台"]
    },
    {
      id: 6,
      company: "杭州海康威视系统技术有限公司",
      position: "前端开发工程师 & 项目经理",
      period: "2016.12 - 2020.04",
      description: "负责交通行业相关平台的开发工作以及各地试点项目开发\n负责雪亮工程、可视化大屏展示、公安联合实验室项目开发\n在可视天津项目中担任前端开发以及项目技术经理角色",
      achievements: [],
      technologies: ["Vue", "AR&VR", "Echarts", "地图引擎"]
    }
  ];

  const education = [
    {
      school: "燕山大学 里仁学院",
      major: "电子科学与技术",
      degree: "本科",
      period: "2012 - 2016"
    }
  ];

  const projects = [
    {
      id: 1,
      name: "卡拉水电站智能建设平台",
      highlights: ["参与开发及维护质量模块、个人办公模块、综合业务模块、园区子系统等业务开发工作", "根据项目中存在的性能问题进行优化调整，提高项目加载速度"],
      period: "2025.01 - 至今",
      tech: "Vue2 + 凤翎UI"
    },
    {
      id: 2,
      name: "决策支持系统",
      highlights: ["负责项目从0到1的搭建", "负责项目主要功能模块的开发", "跨项目迁移，将决策支持系统的功能模块迁移到卡拉水电站智能建设平台中"],
      period: "2025.06 - 2025.09",
      tech: "Vue3 + Element Plus"
    },
    {
      id: 3,
      name: "一道迈ERP系统",
      highlights: ["负责项目从0到1的搭建", "负责主要功能模块（产品、销售、财务、运营、仓库）的开发", "搭建 SSO 权限管理系统"],
      period: "2022.08 - 2024.03"
    },
    {
      id: 4,
      name: "AMX资产管理平台",
      highlights: ["作为项目 owner 负责需求评审、任务分配、功能开发等工作", "推动建设标准化业务低码流程在项目中落地，实现综合降本提效 35%以上"],
      period: "2022.01 - 2022.06",
      tech: "React + NodeJS + 墨子"
    },
    {
      id: 5,
      name: "墨子平台物料黑盒调试",
      highlights: ["作为 PM 和主要开发者，主导项目全过程", "物料开发者节省大量打包、部署、调试时间，提效 80%以上"],
      period: "2021.10 - 2022.01",
      tech: "React + NodeJS + 墨子"
    },
    {
      id: 6,
      name: "运营中台系统 & 调解系统",
      highlights: ["运营中台为面向运营的营销活动类平台", "调解系统在多地合作法院投入使用"],
      period: "2021.01 - 2021.09",
      tech: "React + NodeJS + 墨子"
    },
    {
      id: 7,
      name: "菜鸟裹裹寄件功能",
      highlights: ["负责埋点需求的承接，实现功能的开发和维护", "助力双十一营销活动"],
      period: "2020.07 - 2020.11",
      tech: "React + NodeJS + 埋点平台"
    },
    {
      id: 8,
      name: "可视天津 & 国庆安保 & 雪亮工程",
      highlights: ["作为 PM 及主要研发参与项目全过程", "项目涉及数据治理、AR&VR 全景展示、人员车辆轨迹、数据沙盘等功能"],
      period: "2019.05 - 2020.04",
      tech: "Vue + AR&VR + Echarts + 地图引擎"
    }
  ];

  const skills = [
    {
      id: 1,
      category: "前端技术",
      items: ["HTML5/CSS3", "JavaScript/TypeScript", "Vue 2/3", "React", "Node.js"]
    },
    {
      id: 2,
      category: "开发工具",
      items: ["AI 开发工具", "Webpack/Vite", "低代码平台", "Git"]
    },
    {
      id: 3,
      category: "其他技能",
      items: ["Python", "H5/PDA开发", "Echarts数据可视化", "项目管理"]
    }
  ];

  const certifications = [];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    const handleStorageChange = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      } else {
        setCurrentUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDownload = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    const link = document.createElement('a');
    link.href = '/杨青松web前端开发.pdf';
    link.download = '杨青松web前端开发.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    setShowAuthModal(false);
  };

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
            个人简历
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            前端开发工程师，专注于现代Web技术栈
          </p>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          {currentUser ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>下载简历</span>
            </motion.button>
          ) : (
            <div className="text-center">
              <div className="mb-4 p-6 bg-dark-700 rounded-lg border border-gray-600 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Lock className="w-6 h-6 text-primary-400" />
                  <h3 className="text-lg font-semibold text-white">需要登录才能下载</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  只有已注册用户才能下载简历。请先登录您的账户。
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthModal(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>立即登录</span>
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Personal Info */}
            <div className="glass-effect rounded-2xl p-6 mb-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-500 bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {personalInfo.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h2>
                <p className="text-primary-400 font-medium">{personalInfo.title}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{personalInfo.location}</span>
                </div>
              </div>

              {/* <div className="flex justify-center space-x-4 mt-6">
                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-dark-700 rounded-lg hover:bg-primary-600 transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-dark-700 rounded-lg hover:bg-primary-600 transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-dark-700 rounded-lg hover:bg-primary-600 transition-colors duration-300"
                >
                  <Globe className="w-5 h-5" />
                </motion.a>
              </div> */}
            </div>

            {/* Skills */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Code className="w-6 h-6" />
                <span>技能专长</span>
              </h3>
              <div className="space-y-6">
                {skills.map((skillGroup, index) => (
                  <div key={index}>
                    <h4 className="text-primary-400 font-medium mb-3">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-dark-700 text-gray-300 text-sm rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-8 bg-dark-800 rounded-lg p-1">
              {[
                { id: 'experience', label: '工作经历', icon: Building },
                { id: 'education', label: '教育背景', icon: BookOpen },
                { id: 'projects', label: '项目经验', icon: Code },
                // { id: 'certifications', label: '认证证书', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Content Sections */}
            <AnimatePresence mode="wait">
              {activeSection === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="timeline-item"
                    >
                      <div className="glass-effect rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                            <p className="text-primary-400 font-medium">{exp.company}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">{exp.description}</p>
                        <div className="mb-4">
                          {/* <h4 className="text-white font-medium mb-2">主要成就：</h4> */}
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="text-gray-300 text-sm flex items-start space-x-2">
                                <span className="text-primary-400 mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeSection === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="timeline-item"
                    >
                      <div className="glass-effect rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                            <p className="text-primary-400 font-medium">{edu.school}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{edu.period}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">{edu.description}</p>
                        <div>
                          <h4 className="text-white font-medium mb-2">专业：</h4>
                          <p className="text-gray-300">{edu.major}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeSection === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass-effect rounded-2xl p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                          {project.tech && (
                            <p className="text-primary-400 text-sm">{project.tech}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{project.period}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex} className="text-gray-300 text-sm flex items-start space-x-2">
                              <span className="text-primary-400 mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeSection === 'certifications' && (
                <motion.div
                  key="certifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass-effect rounded-2xl p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{cert.name}</h3>
                          <p className="text-primary-400 font-medium">{cert.issuer}</p>
                          <p className="text-gray-300 text-sm mt-2">{cert.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{cert.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Resume; 