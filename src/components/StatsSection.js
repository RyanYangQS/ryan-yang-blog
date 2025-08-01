import { motion } from 'framer-motion';
import { Code, Star, TrendingUp, Users } from 'lucide-react';
import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      icon: Code,
      number: "50+",
      label: "技术文章",
      description: "分享前端开发经验"
    },
    {
      icon: Users,
      number: "1000+",
      label: "读者关注",
      description: "技术社区影响力"
    },
    {
      icon: Star,
      number: "20+",
      label: "开源项目",
      description: "GitHub贡献"
    },
    {
      icon: TrendingUp,
      number: "5+",
      label: "年开发经验",
      description: "专业成长历程"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-dark-800/30 to-dark-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            个人成就数据
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            通过持续学习和实践，在技术道路上不断进步
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-2xl p-8 text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/50"
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-gradient mb-2"
                >
                  {stat.number}
                </motion.div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-gray-300 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8">
              技术成长轨迹
            </h3>
            <div className="space-y-6">
              {[
                { skill: "前端基础", progress: 95 },
                { skill: "React生态", progress: 90 },
                { skill: "Vue生态", progress: 85 },
                { skill: "Node.js", progress: 80 },
                { skill: "DevOps", progress: 75 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <span className="text-white font-medium min-w-[100px] text-right">
                    {item.skill}
                  </span>
                  <div className="flex-1 bg-dark-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    </motion.div>
                  </div>
                  <span className="text-primary-400 font-bold min-w-[40px]">
                    {item.progress}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection; 