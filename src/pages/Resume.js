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
    title: "高级前端开发工程师",
    email: "13067915779@163.com",
    phone: "13067915779",
    location: "浙江杭州",
    github: "https://github.com/ryanyang", // 可保留原有
    linkedin: "https://linkedin.com/in/ryanyang", // 可保留原有
    website: "https://ryanyang.dev", // 可保留原有
    avatar: `${process.env.PUBLIC_URL}/logo-ryan.png`,
    fallbackAvatar: `${process.env.PUBLIC_URL}/Ryan3.png`
  };

  const experience = [
    {
      id: 1,
      company: "华东勘测设计研究院（中软）",
      position: "前端开发工程师",
      period: "2025.01 - 至今",
      description: "智能水电调度平台：重构数据可视化核心模块，优化实时数据渲染性能，使大屏响应速度提升40%。\n移动端H5工程管控系统：独立完成跨设备兼容方案，采用响应式设计+资源动态加载，在低端安卓设备首屏加载速度优化至1.2s内。",
      achievements: [],
      technologies: ["React", "TypeScript", "H5", "可视化"]
    },
    {
      id: 2,
      company: "智研社（个人工作室）",
      position: "技术顾问",
      period: "2024.06 - 2024.12",
      description: "搭建React+TS技术基座，设计组件开发规范，主导3人前端团队组建，支撑工作室承接电商、教育类SaaS项目开发。",
      achievements: [],
      technologies: ["React", "TypeScript", "SaaS"]
    },
    {
      id: 3,
      company: "浙江中吾科技",
      position: "前端负责人",
      period: "2022.08 - 2024.03",
      description: "一道迈ERP系统（React+wujie微前端）：主导系统从0搭建，设计模块化架构，开发产品/销售/仓储等核心模块，支撑日均10万级订单处理。\n自研业务组件库（50+组件），减少重复开发工时30%。\n工业PDA解决方案：开发扫码入库、物流追踪等H5功能，简化工人操作流程，错误率下降65%。",
      achievements: [],
      technologies: ["React", "微前端", "H5"]
    },
    {
      id: 4,
      company: "挖财网络",
      position: "高级前端开发",
      period: "2020.11 - 2022.06",
      description: "墨子低代码调试系统：设计动态物料热更新方案，开发者调试效率提升80%，成为平台核心工具。\nAMX资产管理系统：推动低代码流程标准化，交付效率提升35%，培养3名新人快速上岗。",
      achievements: [],
      technologies: ["Vue", "低代码"]
    },
    {
      id: 5,
      company: "海康威视",
      position: "前端开发工程师",
      period: "2016.12 - 2020.06",
      description: "公安多维融合平台（Vue2+GIS）：集成AR/VR实现犯罪热点沙盘推演，支撑4省市公安系统决策。\n国家级雪亮工程：开发人员轨迹追踪模块，处理亿级定位数据，项目交付速度领先团队30%。",
      achievements: [],
      technologies: ["Vue", "GIS", "AR/VR"]
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
      name: "智能水电调度平台",
      highlights: ["重构数据可视化核心模块，优化实时数据渲染性能，使大屏响应速度提升40%"],
      period: "2025.01 - 至今"
    },
    {
      id: 2,
      name: "移动端H5工程管控系统",
      highlights: ["独立完成跨设备兼容方案，采用响应式设计+资源动态加载，在低端安卓设备首屏加载速度优化至1.2s内"],
      period: "2024.06 - 2024.12"
    },
    {
      id: 3,
      name: "一道迈ERP系统",
      highlights: ["主导系统从0搭建，设计模块化架构，开发产品/销售/仓储等核心模块，支撑日均10万级订单处理"],
      period: "2022.08 - 2024.03"
    },
    {
      id: 4,
      name: "工业PDA解决方案",
      highlights: ["开发扫码入库、物流追踪等H5功能，简化工人操作流程，错误率下降65%"],
      period: "2020.11 - 2022.06"
    },
    {
      id: 5,
      name: "墨子低代码调试系统",
      highlights: ["设计动态物料热更新方案，开发者调试效率提升80%，成为平台核心工具"],
      period: "2016.12 - 2020.06"
    },
    {
      id: 6,
      name: "AMX资产管理系统",
      highlights: ["推动低代码流程标准化，交付效率提升35%，培养3名新人快速上岗"],
      period: "2024.06 - 2024.12"
    },
    {
      id: 7,
      name: "公安多维融合平台",
      highlights: ["集成AR/VR实现犯罪热点沙盘推演，支撑4省市公安系统决策"],
      period: "2020.11 - 2022.06"
    },
    {
      id: 8,
      name: "国家级雪亮工程",
      highlights: ["开发人员轨迹追踪模块，处理亿级定位数据，项目交付速度领先团队30%"],
      period: "2016.12 - 2020.06"
    }
  ];

  const skills = [
    {
      id: 1,
      category: "前端技术",
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue", "Next.js", "wujie微前端"]
    },
    {
      id: 2,
      category: "后端技术",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "GraphQL"]
    },
    {
      id: 3,
      category: "开发工具",
      items: ["Git", "Webpack", "Vite", "Docker", "Aliyun", "Vercel"]
    },
    {
      id: 4,
      category: "其他技能",
      items: ["微信小程序", "React Native", "PWA", "性能优化", "单元测试"]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023.06",
      description: "云服务开发和部署认证"
    },
    {
      id: 2,
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      date: "2022.12",
      description: "Google Cloud平台开发认证"
    },
    {
      id: 3,
      name: "Microsoft Certified: Azure Developer",
      issuer: "Microsoft",
      date: "2022.08",
      description: "Azure云平台开发认证"
    }
  ];

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
                <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-500 overflow-hidden bg-dark-700 flex items-center justify-center">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Avatar load error:', e.target.src);
                      if (e.target.src !== personalInfo.fallbackAvatar) {
                        e.target.src = personalInfo.fallbackAvatar;
                      } else {
                        // 如果备用头像也失败，显示文字头像
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <span class="text-white text-2xl font-bold">
                            ${personalInfo.name.charAt(0).toUpperCase()}
                          </span>
                        `;
                      }
                    }}
                    onLoad={(e) => {
                      console.log('Avatar loaded successfully:', e.target.src);
                    }}
                  />
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
                          <p className="text-gray-300">{project.highlights}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{project.period}</span>
                        </div>
                      </div>
                      {/* <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">主要功能：</h4>
                        <ul className="space-y-1">
                          {project.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-gray-300 text-sm flex items-start space-x-2">
                              <span className="text-primary-400 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div> */}
                      {/* <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                      >
                        查看项目 →
                      </a> */}
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