"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Globe, DollarSign, Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Domain Marketplace",
    description:
      "List your domain and let others create subdomains under it. Control what subdomains are available.",
    gradient: "from-emerald-500/20 to-green-500/20",
    delay: 0
  },
  {
    icon: <DollarSign className="h-10 w-10" />,
    title: "Passive Income",
    description:
      "Earn recurring revenue from your unused domains by renting out subdomains to other users.",
    gradient: "from-primary/20 to-accent/20",
    delay: 0.1
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Secure Management",
    description:
      "Full control over DNS settings and subdomain access with advanced security features.",
    gradient: "from-secondary/20 to-primary/20",
    delay: 0.2
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Instant Setup",
    description:
      "Get your subdomain up and running in seconds with our automated provisioning system.",
    gradient: "from-accent/20 to-emerald-400/20",
    delay: 0.3
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Community Access",
    description:
      "Join specific domain communities and collaborate with like-minded creators.",
    gradient: "from-primary/20 to-secondary/20",
    delay: 0.4
  },
  {
    icon: <CheckCircle className="h-10 w-10" />,
    title: "Verified Domains",
    description:
      "All domains are verified and checked for reputation to ensure quality listings.",
    gradient: "from-green-500/20 to-primary/20",
    delay: 0.5
  },
];

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  console.log("Features section rendering", { inView });

  return (
    <section
      id="features"
      ref={ref}
      className="py-24 relative overflow-hidden"
    >
      {/* Abstract shapes with animation */}
      <motion.div 
        className="absolute left-0 top-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" 
        animate={{ 
          x: [0, 20, 0],
          opacity: [0.5, 0.7, 0.5] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute right-0 bottom-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" 
        animate={{ 
          x: [0, -20, 0],
          opacity: [0.4, 0.6, 0.4] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block mb-4">
            <div className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              Features
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-text-shimmer">
            Powerful Features for Domain Owners & Creators
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Everything you need to monetize your domains or find the perfect
            subdomain for your next project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: feature.delay,
                type: "spring",
                stiffness: 50
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-background/60 dark:bg-card/30 backdrop-blur-sm border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden glass-effect"
            >
              {/* Gradient background that shows on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
              />
              
              {/* Corner accent */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-6 p-3 bg-gradient-to-br from-background to-background/80 border border-primary/10 rounded-xl inline-block group-hover:-rotate-3 transition-transform duration-300 shadow-sm">
                  <motion.div 
                    className="text-primary" 
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;