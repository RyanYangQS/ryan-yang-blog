import { motion } from 'framer-motion';
import { Code, Database, Globe, Palette, Shield, Zap } from 'lucide-react';
import React from 'react';

const SkillsOverview = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "前端基础",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript"],
      color: "from-blue-500 to-cyan-500",
      description: "扎实的前端基础技术"
    },
    {
      icon: Zap,
      title: "框架生态",
      skills: ["React", "Vue", "Next.js", "Nuxt.js"],
      color: "from-purple-500 to-pink-500",
      description: "现代前端框架技术"
    },
    {
      icon: Database,
      title: "后端技术",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
      color: "from-green-500 to-emerald-500",
      description: "全栈开发能力"
    },
    {
      icon: Palette,
      title: "设计工具",
      skills: ["Figma", "Adobe XD", "Sketch", "Photoshop"],
      color: "from-orange-500 to-red-500",
      description: "UI/UX设计技能"
    },
    {
      icon: Globe,
      title: "部署运维",
      skills: ["Docker", "AWS", "Vercel", "Netlify"],
      color: "from-indigo-500 to-purple-500",
      description: "云服务与部署"
    },
    {
      icon: Shield,
      title: "开发工具",
      skills: ["Git", "Webpack", "Vite", "ESLint"],
      color: "from-yellow-500 to-orange-500",
      description: "工程化开发工具"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skillCategories.map((category, index) => {
        const Icon = category.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="skill-card group"
          >
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/50`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
              {category.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-6">
              {category.description}
            </p>

            {/* Skills */}
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-white font-medium">{skill}</span>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.1 + 0.2 }}
                    className={`w-3 h-3 bg-gradient-to-r ${category.color} rounded-full`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              className={`h-1 bg-gradient-to-r ${category.color} rounded-full mt-6`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillsOverview; 