"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    number: "01",
    title: "Register Your Domain",
    description:
      "Add your domain to ghostDns with a few simple verification steps.",
    emoji: "🚀",
    color: "from-green-300 to-emerald-500",
  },
  {
    number: "02",
    title: "Set Availability Rules",
    description:
      "Define which subdomains are available and set your pricing structure.",
    emoji: "⚙️",
    color: "from-emerald-300 to-teal-500",
  },
  {
    number: "03",
    title: "Accept Requests",
    description:
      "Review and approve subdomain registration requests from users.",
    emoji: "✅",
    color: "from-teal-300 to-cyan-500",
  },
  {
    number: "04",
    title: "Earn Passive Income",
    description:
      "Get paid automatically when users renew their subdomain subscriptions.",
    emoji: "💰",
    color: "from-cyan-300 to-emerald-500",
  },
];

interface StepCardProps {
  step: {
    number: string;
    title: string;
    description: string;
    emoji: string;
    color: string;
  };
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

const StepCard = ({ step, index, isActive, onClick }: StepCardProps) => {
  return (
    <motion.div
      onClick={() => onClick(index)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1.05 : 1,
        rotate: isActive ? [-1, 1] : 0,
      }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 20
        },
        rotate: {
          duration: 0.3,
          type: "tween", // Changed from spring to tween for better keyframe handling
          ease: "easeInOut"
        }
      }}
      className={`neo-brutalist cursor-pointer p-1 ${isActive ? 'z-10' : 'z-0'}`}
    >
      <div className={`h-full bg-gradient-to-br ${step.color} p-6 rounded-sm relative overflow-hidden`}>
        {/* Large emoji in the background */}
        <div className="absolute -right-5 -bottom-5 text-8xl opacity-20">
          {step.emoji}
        </div>
        
        {/* Step number with funky styling */}
        <div className="text-6xl font-bungee mb-4 text-white mix-blend-overlay transform -rotate-3">
          {step.number}
        </div>
        
        <h3 className="text-2xl font-righteous mb-2 text-white">
          {step.title}
        </h3>
        
        <p className="text-white/90 font-medium relative z-10">
          {step.description}
        </p>
        
        {/* Decorative elements */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-60"></div>
        <div className="absolute bottom-10 right-10 w-6 h-6 border-2 border-white rounded-full opacity-60"></div>
      </div>
    </motion.div>
  );
};

export function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    // Auto-rotate active step every 3 seconds
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  console.log("How it works section rendering", { inView, activeStep });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 relative overflow-hidden bg-background"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        
        {/* GenZ style decorative elements */}
        <motion.div 
          className="absolute top-20 right-10 h-40 w-40 rounded-full border-4 border-primary opacity-20"
          animate={{
            scale: [1, 1.2],
            rotate: 360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 h-20 w-20 rounded-full border-4 border-accent opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            rotate: -360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            scale: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bungee mb-6 text-gradient">
              How It Works
            </h2>
            <div className="h-1 w-32 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground text-lg">
              Our streamlined process makes it easy to monetize your domains
              or find the perfect subdomain.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              step={step} 
              index={index} 
              isActive={activeStep === index}
              onClick={setActiveStep}
            />
          ))}
        </div>
        
        {/* Mobile step indicator */}
        <div className="flex justify-center mt-8 gap-2 md:hidden">
          {steps.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full ${activeStep === index ? 'bg-primary' : 'bg-primary/30'}`}
              aria-label={`View step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;