"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

export function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  console.log("Hero section rendering", { inView });

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const floatingBlobs = [
    { top: "10%", left: "-5%", size: "20rem", color: "bg-primary/15", delay: 0 },
    { top: "60%", right: "-10%", size: "24rem", color: "bg-accent/20", delay: 2 },
    { top: "40%", left: "30%", size: "16rem", color: "bg-secondary/10", delay: 4 },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen pt-24 md:pt-32 pb-20 overflow-hidden flex items-center"
    >
      {/* Animated background blobs */}
      {/* <div className="absolute inset-0 -z-10 overflow-hidden">
        {floatingBlobs.map((blob, index) => (
          <motion.div
            key={index}
            className={`absolute ${blob.color} rounded-full blur-3xl opacity-80`}
            style={{
              top: blob.top,
              left: blob.left,
              right: blob.right,
              width: blob.size,
              height: blob.size,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: blob.delay,
            }}
          />
        ))}
      </div> */}

      {/* Grid pattern overlay with animation */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.03] dark:opacity-[0.04]" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-block">
              <div className="flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full backdrop-blur-sm glass-effect animate-bounce-gentle">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
                <span className="text-sm font-medium">Launching Soon</span>
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight">
              <span className="block mb-2">Your Domain's</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient">
                Untapped Potential
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Turn your unused domain into a revenue stream or find the perfect
              subdomain for your next project. The marketplace for domain owners and creators.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium text-base relative overflow-hidden bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300">
                <span className="relative z-10">List Your Domain</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/80 to-secondary/80 animate-background-shine" 
                      style={{ backgroundSize: '200% 100%', mixBlendMode: 'overlay' }} />
              </Button>
              <Button size="lg" variant="outline" className="font-medium text-base border-primary/20 hover:border-primary/40 transition-all duration-300">
                Find a Subdomain
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium bg-gradient-to-br from-primary/10 to-accent/10"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">1,200+</span> domains
                already listed
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
            className="relative"
          >
            {/* Rotating circles decoration */}
            <div className="absolute -z-10 inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full border border-primary/10 animate-rotate-slow opacity-50" />
              <div className="absolute w-96 h-96 rounded-full border border-accent/10 animate-rotate-slow opacity-30" style={{ animationDirection: 'reverse' }} />
            </div>
            
            <div className="relative z-10 bg-background/50 dark:bg-card/50 backdrop-blur-md rounded-xl border border-accent/10 shadow-xl p-8 glass-effect transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-destructive" 
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-accent" 
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-primary" 
                    whileHover={{ scale: 1.2 }}
                  />
                </div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 text-xs font-medium">
                  yourname.example.com
                </div>
              </div>

              <div className="space-y-6">
                <motion.div 
                  className="bg-muted h-8 rounded-md w-3/4"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="bg-muted h-24 rounded-md"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-muted h-12 rounded-md"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  />
                  <motion.div 
                    className="bg-muted h-12 rounded-md"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity duration-300">
                  <span className="text-white font-medium">Claim this subdomain</span>
                </Button>
              </div>
            </div>

            {/* Decorative elements with motion */}
            <motion.div 
              className="absolute top-1/3 -right-12 -z-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-10 left-1/4 -z-10 w-40 h-40 bg-primary/15 rounded-full blur-xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;