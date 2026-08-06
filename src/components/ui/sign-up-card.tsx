'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight, User } from 'lucide-react';
import { cn } from "@/lib/utils"
import { signup } from '@/app/login/actions';
import { useFormStatus } from 'react-dom';

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={pending}
      className="w-full relative group/button mt-6"
    >
      <div className="absolute inset-0 bg-[#4A3728]/10 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative overflow-hidden bg-[#4A3728] text-[#FAF8F5] font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-[#8B5A2B]/30 to-white/0 -z-10"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
          style={{ opacity: pending ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
        
        <AnimatePresence mode="wait">
          {pending ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <div className="w-4 h-4 border-2 border-[#FAF8F5]/70 border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : (
            <motion.span
              key="button-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-1 text-sm font-medium"
            >
              {label}
              <ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export function SignUpCard({ errorMessage }: { errorMessage?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // For 3D card effect - increased rotation range for more pronounced 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAction = async (formData: FormData) => {
    try {
      await signup(formData);
    } catch (error) {
      // Next.js redirect might throw an error, we can ignore it
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center -mt-16">
      {/* Background gradient effect - matches the purple OnlyPipe style */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D2B48C]/40 via-[#8B5A2B]/20 to-[#FAF8F5]" />
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Top radial glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-[#D2B48C]/30 blur-[80px]" />
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-[#C19A6B]/30 blur-[60px]"
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-[#D2B48C]/30 blur-[60px]"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", delay: 1 }}
      />

      {/* Animated glow spots */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-[#8B5A2B]/5 rounded-full blur-[100px] animate-pulse opacity-40" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-[#8B5A2B]/5 rounded-full blur-[100px] animate-pulse delay-1000 opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm relative z-10"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ z: 10 }}
        >
          <div className="relative group">
            {/* Card glow effect */}
            <motion.div 
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
              animate={{
                boxShadow: [
                  "0 0 10px 2px rgba(139,90,43,0.05)",
                  "0 0 15px 5px rgba(139,90,43,0.08)",
                  "0 0 10px 2px rgba(139,90,43,0.05)"
                ],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
            />

              {/* Traveling light beam effect */}
              <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
                <motion.div className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-[#8B5A2B] to-transparent opacity-70" initial={{ filter: "blur(2px)" }} animate={{ left: ["-50%", "100%"], opacity: [0.3, 0.7, 0.3], filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] }} transition={{ left: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }, opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror" }, filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror" } }} />
                <motion.div className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-[#8B5A2B] to-transparent opacity-70" initial={{ filter: "blur(2px)" }} animate={{ top: ["-50%", "100%"], opacity: [0.3, 0.7, 0.3], filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] }} transition={{ top: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 0.6 }, opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 0.6 }, filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.6 } }} />
                <motion.div className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-[#8B5A2B] to-transparent opacity-70" initial={{ filter: "blur(2px)" }} animate={{ right: ["-50%", "100%"], opacity: [0.3, 0.7, 0.3], filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] }} transition={{ right: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.2 }, opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 1.2 }, filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.2 } }} />
                <motion.div className="absolute bottom-0 left-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-[#8B5A2B] to-transparent opacity-70" initial={{ filter: "blur(2px)" }} animate={{ bottom: ["-50%", "100%"], opacity: [0.3, 0.7, 0.3], filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] }} transition={{ bottom: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.8 }, opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 1.8 }, filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.8 } }} />
              </div>

              <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-[#8B5A2B]/10 via-[#8B5A2B]/7 to-white/3 opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
              
              {/* Glass card background */}
              <div className="relative bg-[#FAF8F5]/40 backdrop-blur-xl rounded-2xl p-6 border border-[#8B5A2B]/10 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(139,90,43,0.2) 0.5px, transparent 0.5px), linear-gradient(45deg, rgba(139,90,43,0.2) 0.5px, transparent 0.5px)`,
                    backgroundSize: '30px 30px'
                  }}
                />

                {/* Logo and header */}
                <div className="text-center space-y-1 mb-5 relative z-20">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="mx-auto w-10 h-10 rounded-full border border-[#8B5A2B]/20 flex items-center justify-center relative overflow-hidden bg-[#FAF8F5]/50 backdrop-blur-md"
                  >
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#4A3728] to-[#8B5A2B]">L</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5A2B]/10 to-transparent opacity-50 pointer-events-none" />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#4A3728] to-[#5C4033]"
                  >
                    Create an Account
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#5C4033]/70 text-xs"
                  >
                    Sign up to join Lyke India
                  </motion.p>
                </div>

                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-3 bg-red-100 border border-red-200 text-red-600 text-xs text-center rounded-md backdrop-blur-sm"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* Signup form */}
                <form action={handleAction} className="space-y-4 relative z-20">
                  <motion.div className="space-y-3">
                    
                    {/* Full Name input */}
                    <motion.div 
                      className={`relative ${focusedInput === "fullName" ? 'z-10' : ''}`}
                      whileFocus={{ scale: 1.02 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-[#8B5A2B]/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                      
                      <div className="relative flex items-center overflow-hidden rounded-lg bg-[#FAF8F5]/50 backdrop-blur-md">
                        <User className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                          focusedInput === "fullName" ? 'text-[#4A3728]' : 'text-[#8B5A2B]/60'
                        }`} />
                        
                        <Input
                          type="text"
                          name="full_name"
                          required
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          onFocus={() => setFocusedInput("fullName")}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full bg-[#8B5A2B]/5 border-transparent focus:border-[#8B5A2B]/30 text-[#4A3728] placeholder:text-[#8B5A2B]/50 h-10 transition-all duration-300 pl-10 pr-3 focus:bg-[#8B5A2B]/80"
                        />
                      </div>
                    </motion.div>

                    {/* Email input */}
                    <motion.div 
                      className={`relative ${focusedInput === "email" ? 'z-10' : ''}`}
                      whileFocus={{ scale: 1.02 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-[#8B5A2B]/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                      
                      <div className="relative flex items-center overflow-hidden rounded-lg bg-[#FAF8F5]/50 backdrop-blur-md">
                        <Mail className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                          focusedInput === "email" ? 'text-[#4A3728]' : 'text-[#8B5A2B]/60'
                        }`} />
                        
                        <Input
                          type="email"
                          name="email"
                          required
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedInput("email")}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full bg-[#8B5A2B]/5 border-transparent focus:border-[#8B5A2B]/30 text-[#4A3728] placeholder:text-[#8B5A2B]/50 h-10 transition-all duration-300 pl-10 pr-3 focus:bg-[#8B5A2B]/80"
                        />
                      </div>
                    </motion.div>

                    {/* Password input */}
                    <motion.div 
                      className={`relative ${focusedInput === "password" ? 'z-10' : ''}`}
                      whileFocus={{ scale: 1.02 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-[#8B5A2B]/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                      
                      <div className="relative flex items-center overflow-hidden rounded-lg bg-[#FAF8F5]/50 backdrop-blur-md">
                        <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                          focusedInput === "password" ? 'text-[#4A3728]' : 'text-[#8B5A2B]/60'
                        }`} />
                        
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedInput("password")}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full bg-[#8B5A2B]/5 border-transparent focus:border-[#8B5A2B]/30 text-[#4A3728] placeholder:text-[#8B5A2B]/50 h-10 transition-all duration-300 pl-10 pr-10 focus:bg-[#8B5A2B]/80"
                        />
                        
                        {/* Toggle password visibility */}
                        <div 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-3 cursor-pointer z-10 p-1"
                        >
                          {showPassword ? (
                            <Eye className="w-4 h-4 text-[#8B5A2B]/60 hover:text-[#4A3728] transition-colors duration-300" />
                          ) : (
                            <EyeClosed className="w-4 h-4 text-[#8B5A2B]/60 hover:text-[#4A3728] transition-colors duration-300" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Sign up button */}
                  <SubmitButton label="Sign Up" />

                  <div className="relative mt-2 mb-5 flex items-center">
                    <div className="flex-grow border-t border-[#8B5A2B]/10"></div>
                    <motion.span 
                      className="mx-3 text-xs text-[#8B5A2B]/60"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: [0.7, 0.9, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      or
                    </motion.span>
                    <div className="flex-grow border-t border-[#8B5A2B]/10"></div>
                  </div>

                  {/* Log in link */}
                  <motion.p 
                    className="text-center text-xs text-[#5C4033]/70 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Already have an account?{' '}
                    <Link href="/login" className="relative inline-block group/login">
                      <span className="relative z-10 text-[#4A3728] group-hover/login:text-[#8B5A2B]/90 transition-colors duration-300 font-medium">
                        Log in
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8B5A2B] group-hover/login:w-full transition-all duration-300" />
                    </Link>
                  </motion.p>
                </form>
              </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
