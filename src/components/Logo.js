import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    xxl: 'text-4xl',
    xxxl: 'text-5xl'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`font-bold ${sizeClasses[size]} ${className}`}
    >
      <span className="bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent font-bubblegum-sans font-bold text-2xl">
        Ryan
      </span>
      <span className="text-gray-300 ml-1 font-comic-neue font-medium text-lg">Yang</span>
    </motion.div>
  );
};

export default Logo;
