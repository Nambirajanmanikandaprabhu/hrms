import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Building2, Eye, EyeOff, Users, Shield, Award, Clock, Mail, Lock, CheckCircle, AlertCircle, Sparkles, TrendingUp, Globe, Zap, Star, ArrowRight } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState(null);
  const canvasRef = useRef(null);
  
  const { login, loading } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  const from = location.state?.from?.pathname || '/dashboard';
  const formData = watch();

  useEffect(() => {
    setMounted(true);
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4);
    }, 3500);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight;

      const particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }));

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.fill();
        });
        
        requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      clearInterval(slideInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const hrFeatures = [
    {
      icon: Users,
      title: "AI-Powered Workforce Analytics",
      description: "Leverage machine learning to predict employee performance, identify top talent, and optimize team dynamics with real-time insights.",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      stats: "98% accuracy"
    },
    {
      icon: TrendingUp,
      title: "Predictive Performance Management",
      description: "Advanced algorithms analyze patterns to forecast employee success, enabling proactive interventions and personalized development plans.",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      stats: "40% improvement"
    },
    {
      icon: Globe,
      title: "Global Compliance Automation",
      description: "Stay compliant across 50+ countries with automated regulatory updates, policy management, and real-time compliance monitoring.",
      gradient: "from-green-500 via-emerald-500 to-cyan-500",
      stats: "100% compliant"
    },
    {
      icon: Zap,
      title: "Instant Employee Engagement",
      description: "Real-time pulse surveys, sentiment analysis, and engagement scoring with automated action recommendations for leadership.",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      stats: "85% engagement"
    }
  ];

  const demoAccounts = [
    { 
      role: 'Chief Executive', 
      email: 'admin@company.com', 
      password: 'admin123', 
      icon: Shield, 
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      description: 'Full executive access',
      badge: 'Executive'
    },
    { 
      role: 'HR Director', 
      email: 'hr@company.com', 
      password: 'hr123', 
      icon: Users, 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      description: 'Strategic HR management',
      badge: 'Director'
    },
    { 
      role: 'Team Lead', 
      email: 'manager@company.com', 
      password: 'manager123', 
      icon: Building2, 
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      description: 'Department leadership',
      badge: 'Manager'
    },
    { 
      role: 'Staff Member', 
      email: 'employee@company.com', 
      password: 'emp123', 
      icon: Award, 
      color: 'bg-gradient-to-r from-purple-500 to-violet-500',
      description: 'Employee self-service',
      badge: 'Employee'
    },
  ];

  const fillDemoAccount = (account) => {
    setValue('email', account.email);
    setValue('password', account.password);
  };

  const onSubmit = async (data) => {
    if (loading) return;

    try {
      const response = await login(data);
      showSuccess('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      showError(error.message || 'Login failed. Please try again.');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"
          style={{
            left: mousePos.x / 20 + 'px',
            top: mousePos.y / 20 + 'px',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl bg-gradient-to-r from-purple-400 to-pink-500 animate-bounce" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-green-400 to-cyan-400 animate-pulse" 
             style={{ animationDelay: '3s', animationDuration: '6s' }} />
      </div>

      {/* Left Panel - Enhanced Features Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-pink-900/90 backdrop-blur-sm">
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(30deg, transparent 12%, rgba(255,255,255,0.1) 12%, rgba(255,255,255,0.1) 14%, transparent 14%, transparent 35%, rgba(255,255,255,0.1) 35%, rgba(255,255,255,0.1) 37%, transparent 37%, transparent 58%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0.1) 60%, transparent 60%, transparent 81%, rgba(255,255,255,0.1) 81%, rgba(255,255,255,0.1) 83%, transparent 83%),
                linear-gradient(150deg, transparent 12%, rgba(255,255,255,0.05) 12%, rgba(255,255,255,0.05) 14%, transparent 14%, transparent 35%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.05) 37%, transparent 37%, transparent 58%, rgba(255,255,255,0.05) 58%, rgba(255,255,255,0.05) 60%, transparent 60%, transparent 81%, rgba(255,255,255,0.05) 81%, rgba(255,255,255,0.05) 83%, transparent 83%)
              `,
              backgroundSize: '80px 140px'
            }} />
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-3xl">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  NexaHR Enterprise
                </h1>
                <p className="text-cyan-200 text-sm font-medium">Next-Generation Workforce Platform</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <h2 className="text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                  Revolutionize
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Human Capital
                </span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Harness the power of AI-driven analytics, predictive insights, 
                and intelligent automation to transform your organization's potential.
              </p>
            </div>

          
            
          </div>

          {/* Enhanced Feature Carousel */}
          <div className="relative h-64 overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
            <div 
              className="flex transition-transform duration-1000 ease-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {hrFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="min-w-full p-8 flex flex-col justify-center">
                    <div className="flex items-start gap-6">
                      <div className={`p-5 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-2xl`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold">{feature.title}</h3>
                          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-xs font-bold px-3 py-1 rounded-full text-white">
                            {feature.stats}
                          </span>
                        </div>
                        <p className="text-blue-100 leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-2 text-cyan-300 font-medium">
                          <span className="text-sm">Learn more</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Enhanced Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
              {hrFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-500 rounded-full ${
                    currentSlide === index 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-400 w-8 h-3' 
                      : 'bg-white/30 hover:bg-white/50 w-3 h-3'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                Fortune 500
              </div>
              <div className="text-sm text-blue-200">Companies Trust Us</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                99.99%
              </div>
              <div className="text-sm text-blue-200">Platform Uptime</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                AI-Powered
              </div>
              <div className="text-sm text-blue-200">Intelligence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Enhanced Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Mobile Background for smaller screens */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-pink-900/90" />
        
        <div className="w-full max-w-lg relative z-10">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur opacity-50" />
                <div className="relative bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-3xl">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">NexaHR Enterprise</h1>
                <p className="text-cyan-200 text-sm">Workforce Platform</p>
              </div>
            </div>
          </div>

          {/* Enhanced Login Card */}
          <div className="relative group">
            {/* Animated Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 animate-pulse" />
            
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-3">
                  Welcome Back
                </h2>
                <p className="text-white/70 text-lg">Access your enterprise dashboard</p>
              </div>

              {/* Enhanced Login Form */}
              <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="relative group">
                  <label className="block text-white/90 text-sm font-semibold mb-3 transition-colors group-focus-within:text-cyan-300">
                    Corporate Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 transition-colors ${focusedField === 'email' ? 'text-cyan-400' : 'text-white/40'}`} />
                    </div>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your corporate email"
                      className={`w-full pl-12 pr-12 py-4 bg-white/5 border rounded-2xl text-white placeholder-white/40 
                        backdrop-blur-sm transition-all duration-300 focus:outline-none text-lg
                        ${errors.email 
                          ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                          : focusedField === 'email' 
                            ? 'border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 shadow-lg shadow-cyan-400/10' 
                            : 'border-white/20 hover:border-white/30'
                        }`}
                    />
                    {formData.email && !errors.email && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-400 animate-pulse" />
                      </div>
                    )}
                    {focusedField === 'email' && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 -z-10 blur-xl" />
                    )}
                  </div>
                  {errors.email && (
                    <div className="mt-2 flex items-center gap-2 text-red-400 text-sm animate-slideIn">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <label className="block text-white/90 text-sm font-semibold mb-3 transition-colors group-focus-within:text-purple-300">
                    Secure Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 transition-colors ${focusedField === 'password' ? 'text-purple-400' : 'text-white/40'}`} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your secure password"
                      className={`w-full pl-12 pr-16 py-4 bg-white/5 border rounded-2xl text-white placeholder-white/40 
                        backdrop-blur-sm transition-all duration-300 focus:outline-none text-lg
                        ${errors.password 
                          ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                          : focusedField === 'password' 
                            ? 'border-purple-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 shadow-lg shadow-purple-400/10' 
                            : 'border-white/20 hover:border-white/30'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-white/10 rounded-r-2xl transition-colors group"
                    >
                      {showPassword ? 
                        <EyeOff className="h-6 w-6 text-white/40 group-hover:text-white/80 transition-colors" /> : 
                        <Eye className="h-6 w-6 text-white/40 group-hover:text-white/80 transition-colors" />
                      }
                    </button>
                    {focusedField === 'password' && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 blur-xl" />
                    )}
                  </div>
                  {errors.password && (
                    <div className="mt-2 flex items-center gap-2 text-red-400 text-sm animate-slideIn">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('remember')}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110
                      ${formData.remember 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent shadow-lg shadow-cyan-500/30' 
                        : 'border-white/30 group-hover:border-white/50 group-hover:bg-white/5'
                      }`}>
                      {formData.remember && (
                        <svg className="w-4 h-4 text-white animate-checkmark" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-3 text-white/80 group-hover:text-white transition-colors">
                      Keep me signed in
                    </span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group overflow-hidden rounded-2xl p-[2px] focus:outline-none disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl animate-gradient-x" />
                  <div className="relative bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 
                    px-8 py-5 rounded-2xl transition-all duration-300">
                    <span className="text-white font-bold text-lg flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <div className="relative">
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <div className="absolute inset-0 w-6 h-6 border-2 border-transparent border-t-cyan-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                          </div>
                          Authenticating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-6 w-6 animate-pulse" />
                          Access Dashboard
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </div>
                </button>
              </form>

              {/* Enhanced Demo Accounts */}
              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm text-white/70 font-medium rounded-full border border-white/20">
                      Try demo accounts
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {demoAccounts.map((account, index) => {
                    const Icon = account.icon;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => fillDemoAccount(account)}
                        className={`group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 hover:shadow-lg ${account.color} hover:scale-[1.02]`}
                      >
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-3 rounded-xl ${account.color} shadow-lg`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{account.role}</div>
                              <div className="text-xs text-white/80">{account.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                              {account.badge}
                            </span>
                            <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-10 text-center text-sm text-white/60">
                <p>Need help? <Link to="/support" className="text-cyan-400 hover:underline">Contact support</Link></p>
                <p className="mt-2">Don't have an account? <Link to="/register" className="text-cyan-400 hover:underline">Sign up</Link></p>
                <p className="mt-2">© 2024 NexaHR Enterprise. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;