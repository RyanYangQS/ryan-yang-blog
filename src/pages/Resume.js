import { AnimatePresence, motion } from 'framer-motion';
import { Award, BookOpen, Building, Calendar, Code, Download, Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import React, { useState } from 'react';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('experience');

  const personalInfo = {
    name: "Ryan Yang",
    title: "前端开发工程师",
    email: "ryan.yang@example.com",
    phone: "+86 138-0000-0000",
    location: "北京，中国",
    github: "https://github.com/ryanyang",
    linkedin: "https://linkedin.com/in/ryanyang",
    website: "https://ryanyang.dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  };

  const experience = [
    {
      id: 1,
      company: "字节跳动",
      position: "高级前端开发工程师",
      period: "2022.03 - 至今",
      description: "负责抖音电商平台的前端开发，使用React、TypeScript等技术栈，参与大型项目的架构设计和性能优化。",
      achievements: [
        "优化页面加载速度，首屏时间减少40%",
        "设计并实现组件库，提升开发效率30%",
        "指导初级开发者，组织技术分享会"
      ],
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      company: "阿里巴巴",
      position: "前端开发工程师",
      period: "2020.07 - 2022.02",
      description: "参与淘宝移动端开发，负责商品详情页、购物车等核心功能模块的开发维护。",
      achievements: [
        "重构商品详情页，提升用户体验",
        "实现PWA功能，离线缓存商品信息",
        "参与双11大促活动页面开发"
      ],
      technologies: ["Vue", "JavaScript", "Webpack", "Node.js"]
    },
    {
      id: 3,
      company: "腾讯",
      position: "前端开发工程师",
      period: "2019.06 - 2020.06",
      description: "参与微信小程序开发，负责企业级应用的前端界面和交互逻辑实现。",
      achievements: [
        "开发多个企业级小程序",
        "优化小程序性能，减少内存占用",
        "参与小程序框架升级"
      ],
      technologies: ["微信小程序", "JavaScript", "CSS3", "HTML5"]
    }
  ];

  const education = [
    {
      id: 1,
      school: "北京大学",
      degree: "计算机科学与技术",
      period: "2015.09 - 2019.06",
      description: "主修计算机科学，辅修数学。参与多个学术项目，获得优秀毕业生称号。",
      achievements: [
        "GPA: 3.8/4.0",
        "获得国家奖学金",
        "参与ACM程序设计竞赛"
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      name: "个人博客系统",
      description: "基于React和Node.js构建的全栈博客系统，支持Markdown编辑、评论系统、用户管理等功能。",
      period: "2023.01 - 2023.03",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      link: "https://github.com/ryanyang/blog",
      features: [
        "响应式设计，支持移动端",
        "Markdown编辑器",
        "评论系统",
        "用户认证"
      ]
    },
    {
      id: 2,
      name: "电商管理系统",
      description: "企业级电商后台管理系统，包含商品管理、订单处理、用户管理、数据分析等模块。",
      period: "2022.06 - 2022.12",
      technologies: ["Vue", "TypeScript", "Element UI", "Node.js"],
      link: "https://github.com/ryanyang/admin",
      features: [
        "权限管理系统",
        "数据可视化",
        "批量操作",
        "实时通知"
      ]
    },
    {
      id: 3,
      name: "在线教育平台",
      description: "基于React Native开发的移动端教育应用，支持视频播放、在线测试、学习进度跟踪等功能。",
      period: "2021.09 - 2022.05",
      technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
      link: "https://github.com/ryanyang/education",
      features: [
        "跨平台支持",
        "离线学习",
        "学习数据分析",
        "社交功能"
      ]
    }
  ];

  const skills = [
    {
      category: "前端技术",
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue", "Next.js", "Nuxt.js"]
    },
    {
      category: "后端技术",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "GraphQL"]
    },
    {
      category: "开发工具",
      items: ["Git", "Webpack", "Vite", "Docker", "AWS", "Vercel"]
    },
    {
      category: "其他技能",
      items: ["微信小程序", "React Native", "PWA", "性能优化", "单元测试"]
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023.06",
      description: "云服务开发和部署认证"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      date: "2022.12",
      description: "Google Cloud平台开发认证"
    },
    {
      name: "Microsoft Certified: Azure Developer",
      issuer: "Microsoft",
      date: "2022.08",
      description: "Azure云平台开发认证"
    }
  ];

  const handleDownload = () => {
    // 这里可以实现PDF下载功能
    alert('简历下载功能开发中...');
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>下载简历</span>
          </motion.button>
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
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-500"
                />
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

              <div className="flex justify-center space-x-4 mt-6">
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
              </div>
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
                { id: 'certifications', label: '认证证书', icon: Award }
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
                          <h4 className="text-white font-medium mb-2">主要成就：</h4>
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
                      key={edu.id}
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
                          <h4 className="text-white font-medium mb-2">主要成就：</h4>
                          <ul className="space-y-1">
                            {edu.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="text-gray-300 text-sm flex items-start space-x-2">
                                <span className="text-primary-400 mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
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
                          <p className="text-gray-300">{project.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{project.period}</span>
                        </div>
                      </div>
                      <div className="mb-4">
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
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                      >
                        查看项目 →
                      </a>
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
    </div>
  );
};

export default Resume; 