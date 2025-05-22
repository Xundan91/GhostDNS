"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function NavMenu() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Set active section based on scroll position
      const sections = ["features", "how-it-works", "pricing", "testimonials"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          return;
        }
      }
      
      setActiveSection("home");
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/70 dark:bg-background/80 backdrop-blur-lg border-b border-primary/10 py-2 shadow-sm"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-sm neo-brutalist flex items-center justify-center overflow-hidden group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 transform rotate-3 group-hover:rotate-0">
            <span className="text-primary-foreground font-bungee text-xl">G</span>
            <motion.div 
              className="absolute -bottom-3 -right-3 w-6 h-6 bg-accent rounded-full" 
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.span 
            className="text-2xl font-bungee tracking-tight text-gradient no-text-shadow"
            whileHover={{ 
              scale: 1.05, 
              rotate: [-1, 1, 0]
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            ghostDns
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-primary/20 hover:border-primary/40 transition-colors duration-300 hover:bg-primary/5"
            >
              Log In
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity duration-300"
            >
              Sign Up
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-primary/10 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
