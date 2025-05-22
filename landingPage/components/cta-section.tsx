"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  console.log("CTA section rendering", { inView });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="bg-gradient-to-br from-primary/90 via-secondary/90 to-accent/80 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden border border-white/10 shadow-xl"
        >
          {/* Animated abstract shapes */}
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-10" 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          {/* Decorative circles */}
          <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-16 h-16 border border-white/20 rounded-full" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold font-montserrat mb-6 leading-tight"
            >
              Ready to <span className="text-white/90 border-b-2 border-white/30 pb-1">Unlock</span> Your Domain's Potential?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            >
              Join thousands of domain owners and creators who are already using
              our platform to monetize domains and find the perfect subdomain.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-medium text-base px-8 py-6 shadow-xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                Find a Subdomain
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-medium text-base px-8 py-6 shadow-lg hover:shadow-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                List Your Domain
              </Button>
            </motion.div>
            
            {/* Small info note at bottom */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white/70 text-sm mt-8"
            >
              No credit card required • Free plan available • Instant setup
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;