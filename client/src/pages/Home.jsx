import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import kubendiranImg from "../assets/kubendiran.jpg";
import rajkiranImg from "../assets/rajkiran.jpeg";
import prabavathiImg from "../assets/prabavathi.jpeg";
import { useTypewriter, Cursor } from "react-simple-typewriter";
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
  Mail,
  Globe,
  Zap,
  Shield,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Coffee,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();
  const controls = useAnimation();

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentMember, setCurrentMember] = useState(0);

  const [text] = useTypewriter({
    words: ["Welcome to Sky Tech Makers", "Make Your Tech to the Sky"],
    loop: true,
    delaySpeed: 2500,
    deleteSpeed: 10,
    typeSpeed: 50,
  });

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Developer at Google",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content:
        "Sky Tech Makers transformed my career. The interview prep and coding challenges helped me land my dream job at Google. The community support is incredible!",
      rating: 5,
      company: "Google",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Full Stack Engineer at Microsoft",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content:
        "The tech blogs here are gold mines of knowledge. I've learned cutting-edge technologies and best practices that made me stand out in interviews.",
      rating: 5,
      company: "Microsoft",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Frontend Developer at Netflix",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content:
        "The developer tools section is a game-changer. It saved me countless hours and the community here is always ready to help solve complex problems.",
      rating: 5,
      company: "Netflix",
    },
    {
      id: 4,
      name: "David Kim",
      role: "DevOps Engineer at Amazon",
      avatar:
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content:
        "Sky Tech Makers is my secret weapon for staying ahead in tech. The interview questions are spot-on and helped me ace multiple FAANG interviews.",
      rating: 5,
      company: "Amazon",
    },
    {
      id: 5,
      name: "Jessica Wang",
      role: "Mobile Developer at Spotify",
      avatar:
        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content:
        "This platform is like having a personal mentor available 24/7. The quality of content and community engagement is unmatched in the industry.",
      rating: 5,
      company: "Spotify",
    },
  ];

  const stats = [
    { number: "15K+", label: "Active Developers", icon: Users },
    { number: "800+", label: "Tech Articles", icon: Book },
    { number: "2K+", label: "Interview Questions", icon: Code },
    { number: "100+", label: "Developer Tools", icon: Tool },
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
    { icon: CheckCircle, text: "Trusted by 15,000+ developers worldwide" },
    { icon: TrendingUp, text: "95% interview success rate for our users" },
    { icon: Award, text: "Featured in top tech publications" },
    { icon: Lightbulb, text: "500+ companies hire our community members" },
  ];

  const courses = [
    {
      level: "Beginner",
      title: "Frontend Development in Tamil",
      description:
        "Learn HTML, CSS, JavaScript and React from scratch in Tamil. Perfect for aspiring web developers.",
      duration: "10hrs Duration",
      likes: "25k Likes",
      topics: "12+ Topics",
      project: "Portfolio Project",
      uploadDate: "Uploaded on Jan 10, 2024",
      color: "bg-[#E0F7FA] border-[#B2EBF2]",
      badgeColor: "bg-white",
      image: "https://img.icons8.com/color/96/000000/html-5--v1.png",
      video:
        "https://l.instagram.com/?u=https%3A%2F%2Fwww.youtube.com%2F%40SkyTechMakers%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAaeyFZQEvJRlYkSSThFZTqBdav9xbLVl_jjVjrbSbYNvQOMnw-A9ZF6mCBshqA_aem_mR9v5bL0usEq6mZZRiVHOg&e=AT0QIdnOFeKcji4oIPmjND2kuABbLcfiTZN6N0-Q7ZZ7ZyAMTxPSDWM-wsDiDPxsYFHby1Mtay8wTXHmvBg0YdoSnvKO2ZSAsGql1Q",
    },
    {
      level: "Beginner",
      title: "Java Full Course in Tamil",
      description:
        "Master Java fundamentals, OOPs concepts, and real-world applications with hands-on coding.",
      duration: "8.5hrs Duration",
      likes: "5k Likes",
      topics: "15+ Topics",
      project: "Student Info Project",
      uploadDate: "Uploaded on Mar 15, 2024",
      color: "bg-[#FFF3E0] border-[#FFE0B2]",
      badgeColor: "bg-white",
      image: "https://img.icons8.com/color/96/java-coffee-cup-logo.png",
      video:
        "https://l.instagram.com/?u=https%3A%2F%2Fwww.youtube.com%2F%40SkyTechMakers%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAaeyFZQEvJRlYkSSThFZTqBdav9xbLVl_jjVjrbSbYNvQOMnw-A9ZF6mCBshqA_aem_mR9v5bL0usEq6mZZRiVHOg&e=AT0QIdnOFeKcji4oIPmjND2kuABbLcfiTZN6N0-Q7ZZ7ZyAMTxPSDWM-wsDiDPxsYFHby1Mtay8wTXHmvBg0YdoSnvKO2ZSAsGql1Q",
    },
    {
      level: "Beginner",
      title: "MERN Stack Development in Tamil",
      description:
        "Build full-stack web apps using MongoDB, Express, React, and Node.js - explained in Tamil.",
      duration: "12hrs Duration",
      likes: "18k Likes",
      topics: "20+ Topics",
      project: "Blog App Project",
      uploadDate: "Uploaded on May 5, 2024",
      color: "bg-[#E8F5E9] border-[#C8E6C9]",
      badgeColor: "bg-white",
      image:
        "https://www.pngkey.com/png/detail/142-1425281_built-with-bootstrap-mern-stack-logo-png.png",
      video:
        "https://l.instagram.com/?u=https%3A%2F%2Fwww.youtube.com%2F%40SkyTechMakers%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAaeyFZQEvJRlYkSSThFZTqBdav9xbLVl_jjVjrbSbYNvQOMnw-A9ZF6mCBshqA_aem_mR9v5bL0usEq6mZZRiVHOg&e=AT0QIdnOFeKcji4oIPmjND2kuABbLcfiTZN6N0-Q7ZZ7ZyAMTxPSDWM-wsDiDPxsYFHby1Mtay8wTXHmvBg0YdoSnvKO2ZSAsGql1Q",
    },
  ];

  const team = [
    {
      name: "Rajkiran P",
      role: "Founder & CEO",
      description:
        "Founder and visionary leader of Sky Tech Makers. Focused on building a strong tech community and delivering high-quality tech education in Tamil.",
      image: rajkiranImg,
      flip: false,
    },
    {
      name: "Siva Sakthi S",
      role: "Backend Developer",
      description:
        "Specializes in server-side logic and API development. Ensures the platform's backend is fast, scalable, and secure.",
      image: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
      flip: true,
    },
    {
      name: "Kubendiran P",
      role: "Full Stack Developer",
      description:
        "Expert in both frontend and backend development using the MERN stack. Builds seamless, full-featured web applications and maintains platform stability.",
      image: kubendiranImg,
      flip: false,
    },
    {
      name: "Prabavathi S",
      role: "Content Creator",
      description:
        "Creates high-quality educational content, tutorials, and tech blogs. Helps learners understand complex topics in a simple and engaging way.",
      image: prabavathiImg,
      flip: true,
    },
  ];

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-scroll team carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMember((prev) => (prev + 1) % team.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [team.length]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-14 pb-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <Zap className="h-4 w-4 mr-2" />
              Join 15,000+ developers accelerating their careers
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {text}
              </span>
              <Cursor cursorStyle="|" />
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Master technical interviews, learn from industry experts, and join
              an elite community of developers who land jobs at top tech
              companies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {user ? "Go to Dashboard" : "Start Learning Free"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/blogs"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Explore Blogs
                <Book className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md mb-4">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:translate-x-1"
                >
                  Explore Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                  <Target className="h-4 w-4 mr-2" />
                  Our Mission
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Empowering Developers to Reach New Heights
                </h2>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
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
                      <achievement.icon className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700">{achievement.text}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Coffee className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        24/7 Learning
                      </div>
                      <div className="text-sm text-gray-600">
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
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories from Our Community
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Join thousands of developers who transformed their careers with
              Sky Tech Makers.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/20"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-yellow-400 fill-current"
                      />
                    )
                  )}
                </div>

                <blockquote className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed font-medium">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-white/20"
                    />
                    <div>
                      <div className="font-semibold text-white text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-blue-300">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-blue-300 mb-1">Now at</div>
                    <div className="font-semibold text-white">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevTestimonial}
              className="hidden lg:flex absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="hidden lg:flex absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-white scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Section */}
      <section className="container mt-16 mb-28 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center leading-snug mb-4">
          Our Featured Courses
        </h2>
        <p className="text-lg text-center max-w-4xl mx-auto text-gray-600">
          Explore high-quality, beginner-friendly tech tutorials in Tamil. Learn
          at your pace from real-world projects and hands-on explanations.
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-6">
          {courses.map((course, index) => (
            <li
              key={index}
              className=" rounded-xl border max-w-xs w-full shadow hover:shadow-lg transition duration-300"
            >
              <div
                className={`${course.color} border p-4 rounded-lg h-80 flex flex-col justify-between`}
              >
                <div>
                  <p className="flex justify-between items-center">
                    <span
                      className={`text-sm bg-green-300 px-3 py-1 rounded-full ${course.badgeColor} w-fit`}
                    >
                      {course.level}
                    </span>
                    <img
                      src={course.image}
                      alt="course"
                      className="w-8 h-8 rounded-full object-contain"
                    />
                  </p>
                  <h2 className="mt-4 text-lg font-semibold text-black">
                    {course.title}
                  </h2>
                  <p className="text-gray-800 mt-2 text-sm">
                    {course.description}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                    <li className="border p-2 rounded-xl bg-gray-50 border-gray-200">
                      {course.duration} ⏱
                    </li>
                    <li className="border p-2 rounded-xl bg-gray-50 border-gray-200">
                      {course.likes} ❤️
                    </li>
                    <li className="border p-2 rounded-xl bg-gray-50 border-gray-200">
                      {course.topics} 📚
                    </li>
                    <li className="border p-2 rounded-xl bg-gray-50 border-gray-200">
                      {course.project} 👨🏻‍💻
                    </li>
                    <li className="border p-2 rounded-xl bg-gray-50 border-gray-200">
                      {course.uploadDate} 🗓️
                    </li>
                  </ul>
                </div>
                <div className="mt-12 flex justify-center">
                  <a
                    href={course.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-black text-black rounded-lg text-sm font-semibold hover:bg-black hover:text-white transition"
                  >
                    Explore Video
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Tech Career?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
                Join our elite community of developers and get access to premium
                content, exclusive tools, and networking opportunities that will
                accelerate your growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/register"
                  className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Start Your Journey Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-500 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-8 text-sm text-gray-400">
                Trusted by 15,000+ developers worldwide
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-20 bg-white text-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate minds behind{" "}
              <span className="font-semibold text-blue-500">
                Sky Tech Makers
              </span>
              .
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <motion.div
              key={currentMember}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className={`flex flex-col ${
                team[currentMember].flip ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-10 bg-gradient-to-br from-blue-50 via-purple-50 to-white shadow-xl p-8 md:p-12 rounded-2xl border border-blue-100`}
            >
              <img
                src={team[currentMember].image}
                alt={team[currentMember].name}
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-lg"
              />
              <div>
                <h3 className="text-2xl text-blue-700 font-bold">
                  {team[currentMember].name}
                </h3>
                <p className="text-sm text-purple-800 font-medium">
                  {team[currentMember].role}
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  {team[currentMember].description}
                </p>
              </div>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMember(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMember
                      ? "bg-blue-500 scale-125"
                      : "bg-blue-300 hover:bg-blue-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
