import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import kubendiranImg from "../assets/kubendiran.png";
import rajkiranImg from "../assets/rajkiran.jpg";
import sivasakthiImg from "../assets/sivasakthi.jpg";
import prabavathiImg from "../assets/prabavathi.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { TestimonialsSection } from "@/components/ui/testimonial-v2";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import {
  ArrowRight,
  Book,
  Code,
  PenTool as Tool,
  Users,
  Target,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  Globe,
  Zap,
  Shield,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Coffee,
  Terminal,
  Cpu,
  Layers,
  Database,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();
  const controls = useAnimation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "About Website",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);

  const subjectOptions = [
    "About Website",
    "Blogs",
    "Interview Questions and Answer",
    "Tools",
    "Coding Leaderboard",
    "Daily Challenge",
    "Others",
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/contact`, formData);
      toast.success(data.msg || "Message sent successfully!");
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "About Website", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [text] = useTypewriter({
    words: ["Welcome to Sky Tech Makers", "Make Your Tech to the Sky"],
    loop: true,
    delaySpeed: 2500,
    deleteSpeed: 10,
    typeSpeed: 50,
  });



  const stats = [
    { number: "120+", label: "Active Developers", icon: Users },
    { number: "380+", label: "Tech Articles", icon: Book },
    { number: "1.6K+", label: "Interview Questions", icon: Code },
    { number: "48+", label: "Developer Tools", icon: Tool },
  ];

  const features = [
    {
      icon: Book,
      title: "Premium Tech Blogs",
      description:
        "In-depth articles on cutting-edge technologies, frameworks, and industry best practices written by senior engineers from top companies.",
      color: "from-blue-500 to-blue-600",
      link: "/blogs",
    },
    {
      icon: Code,
      title: "Interview Mastery",
      description:
        "Comprehensive collection of technical interview questions from FAANG companies, categorized by difficulty, topic, and company.",
      color: "from-purple-500 to-purple-600",
      link: "/questions",
    },
    {
      icon: Tool,
      title: "Developer Arsenal",
      description:
        "Curated collection of productivity tools, code generators, and utilities to supercharge your development workflow.",
      color: "from-green-500 to-green-600",
      link: "/tools",
    },
    {
      icon: Zap,
      title: "Quick Learning",
      description:
        "Bite-sized tutorials and quick reference guides for rapid skill acquisition and just-in-time learning.",
      color: "from-yellow-500 to-orange-500",
      link: "/",
    },
    {
      icon: Shield,
      title: "Security Hub",
      description:
        "Master cybersecurity fundamentals, secure coding practices, and vulnerability assessment techniques.",
      color: "from-red-500 to-pink-500",
      link: "/",
    },
    {
      icon: Users,
      title: "Elite Community",
      description:
        "Connect with top-tier developers, participate in code reviews, and build your professional network.",
      color: "from-indigo-500 to-purple-500",
      link: "/",
    },
  ];

  const achievements = [
    { icon: CheckCircle, text: "Trusted by 560+ developers worldwide" },
    { icon: TrendingUp, text: "95% interview success rate for our users" },
    { icon: Award, text: "Featured in top tech publications" },
    { icon: Lightbulb, text: "50+ companies hire our community members" },
  ];



  const team = [
    {
      name: "Rajkiran P",
      role: "Founder & CEO (Java Full Stack Developer)",
      description:
        "Founder and CEO of Sky Tech Makers. A Java Full Stack Developer dedicated to building a strong community and delivering quality tech education in Tamil. Passionate about empowering aspiring engineers, he designs structured courses and mentors developers to master enterprise software design. With 5+ years of experience, he focuses on scaling learning platforms and bridging the gap to industry demands.",
      image: rajkiranImg,
      flip: false,
    },
    {
      name: "Sivasakthi S",
      role: "Backend Developer (Java)",
      description:
        "Specializes in server-side logic, API development, and Java backend architectures. Focuses on building robust, high-performance database access layers and optimized server integrations. With a strong foundation in server design and concurrent systems computation, Siva designs schema integration endpoints that secure data transfer and speed. She is committed to sharing backend best practices and server development basics with the next generation of engineers.",
      image: sivasakthiImg,
      flip: true,
    },
    {
      name: "Kubendiran P",
      role: "Full Stack Developer (MERN)",
      description:
        "Specializes in full-stack development, MERN application logic, and user flow architectures. Focuses on building responsive, high-performance web applications and optimized interface configurations. With a strong foundation in modern state management and real-time socket connections, He designs responsive interfaces that secure seamless user interaction and speed. He is committed to sharing full stack best practices and web development basics with the next generation of engineers.",
      image: kubendiranImg,
      flip: false,
    },
    {
      name: "Prabavathi S",
      role: "Software Engineer (Oracle SQL)",
      description:
        "Specializes in database design, data integration, and Oracle SQL. Focuses on building robust data pipelines and writing optimized database queries. With a strong foundation in database management systems and query performance tuning, She designs schema models that secure data integrity and speed. She is committed to sharing DBMS best practices and database administration basics with the next generation of engineers.",
      image: prabavathiImg,
      flip: true,
    },
  ];





  return (
    <div className="bg-[#050508] min-h-screen text-slate-100 relative overflow-hidden">

      {/* Hero Section */}
      <section className="pt-20 pb-20 relative overflow-hidden z-10">
        {/* Cosmic Parallax Background */}
        <CosmicParallaxBg head="" text="" className="absolute top-0 left-0 right-0 h-[830px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-sm font-medium mb-20">
              <Zap className="h-4 w-4 text-indigo-400" />
              Join 560+ developers accelerating their careers
            </div>

            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-20 leading-tight">
              <span className="bg-gradient-to-t from-gray-500 to-white bg-clip-text text-transparent">
                {text}
              </span>
              <Cursor cursorStyle="|" />
            </h1>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-4 justify-center items-center mb-10">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="group inline-flex items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
              >
                {user ? "Go to Dashboard" : "Start Learning Free"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/blogs"
                className="inline-flex items-center px-8 py-4 border-2 border-white/10 text-slate-300 rounded-xl font-semibold hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300"
              >
                Explore Blogs
                <Book className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#10121f]/40 border border-white/5 p-5 rounded-2xl text-center shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-4">
                    <stat.icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[#f4f6f8] border-y border-slate-200 relative overflow-hidden z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
              <Users className="h-4 w-4 mr-2 text-indigo-400" />
              Our Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Meet Our <span className="gradient-text-blue">Team</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              The passionate minds behind{" "}
              <span className="font-semibold text-indigo-600">
                Sky Tech Makers
              </span>
              .
            </p>
          </motion.div>

          <div className="flex justify-center items-center relative max-w-4xl mx-auto">
            <CircularTestimonials
              testimonials={team.map(member => ({
                quote: member.description,
                name: member.name,
                designation: member.role,
                src: member.image,
              }))}
              autoplay={true}
              colors={{
                name: "#0f172a",
                designation: "#4f46e5",
                testimony: "#475569",
                arrowBackground: "#ffffff",
                arrowForeground: "#1e293b",
                arrowHoverBackground: "#6366f1",
              }}
              fontSizes={{
                name: "28px",
                designation: "18px",
                quote: "16px",
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-b border-slate-200 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
              <Layers className="h-4 w-4 mr-2 text-indigo-400" />
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything You Need to <span className="gradient-text-blue">Excel</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From interview preparation to advanced learning resources, we've
              got your entire tech journey covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-slate-50 border border-slate-200/60 rounded-2xl p-8 shadow-sm transition-all duration-300 hover:border-indigo-500/20 hover:bg-white hover:shadow-xl hover:-translate-y-1.5"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-500 transition-colors group-hover:gap-1.5 gap-1 transition-all duration-200"
                >
                  Explore Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#f4f6f8] border-b border-slate-200 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
                  <Target className="h-4 w-4 mr-2 text-indigo-400" />
                  Our Mission
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Empowering Developers to Reach New Heights
                </h2>

                <p className="text-base text-slate-600 mb-8 leading-relaxed">
                  We believe every developer deserves access to world-class
                  learning resources and a supportive community. Our platform
                  bridges the gap between learning and landing your dream job.
                </p>

                <div className="space-y-4 mb-8">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <achievement.icon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{achievement.text}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:opacity-90 shadow-lg transition-all"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    alt="Developers collaborating"
                    className="w-full h-[400px] object-cover rounded-2xl border border-slate-200/80 shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200/80 p-6 rounded-xl shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500/10 p-2.5 rounded-lg border border-indigo-500/20">
                      <Coffee className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        24/7 Learning
                      </div>
                      <div className="text-xs text-slate-500">
                        Always Available
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="bg-white border-b border-slate-200 relative z-10">
        <TestimonialsSection />
      </div>





      {/* Contact Section */}
      <section className="py-24 bg-[#f4f6f8] border-t border-slate-200 relative overflow-hidden z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
              <Mail className="h-4 w-4 mr-2 text-indigo-400" />
              Contact Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get in Touch <span className="gradient-text-blue">With Us</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about our courses, blogs, or community? Drop us a line and we'll get back to you shortly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto items-stretch">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Let's build something together</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Join our learning ecosystem. Whether you are a student wanting to learn or a developer looking to contribute, we are happy to connect.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-xl shadow-sm text-indigo-600 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email Address</h4>
                    <a href="mailto:support@skytechmakers.com" className="text-slate-800 font-semibold hover:text-indigo-600 transition-colors">
                      contact.skytechmakers@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-xl shadow-sm text-indigo-600 flex-shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Official Channel</h4>
                    <a href="https://youtube.com/@SkyTechMakers" target="_blank" rel="noopener noreferrer" className="text-slate-800 font-semibold hover:text-indigo-600 transition-colors">
                      https://www.youtube.com/@SkyTechMakers
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-xl shadow-sm text-indigo-600 flex-shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Community Scope</h4>
                    <span className="text-slate-800 font-semibold">Global Tamil Learning Network</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 border-t border-slate-200/80 pt-6">
                Response time: Typically within 24 hours.
              </div>
            </motion.div>

            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white border border-slate-200/80 shadow-2xl p-8 rounded-3xl flex flex-col justify-center"
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. We've received your message and our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold tracking-wide transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative" ref={selectRef}>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">Related To</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-left cursor-pointer"
                      >
                        <span>{formData.subject}</span>
                        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isSelectOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isSelectOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                          >
                            {subjectOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, subject: option }));
                                  setIsSelectOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-slate-50 cursor-pointer ${formData.subject === option
                                  ? "bg-indigo-50/60 text-indigo-600 font-semibold"
                                  : "text-slate-700"
                                  }`}
                              >
                                {option}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Hi, I would like to query about..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
