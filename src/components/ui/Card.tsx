import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
}) => {
  return (
    <motion.div
      className={`bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg ${className}`}
      whileHover={hover ? { y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.2)' } : {}}
      onClick={onClick}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default Card;