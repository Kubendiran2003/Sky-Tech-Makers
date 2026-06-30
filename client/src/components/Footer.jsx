import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiMail, FiMapPin, FiPhone, FiGithub, FiYoutube, FiInstagram,
  FiZap, FiArrowRight, FiHeart,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const footerLinks = [
  { label: "Blogs", to: "/blogs" },
  { label: "Interview Q&A", to: "/questions" },
  { label: "Developer Tools", to: "/tools" },
  { label: "Leaderboard", to: "/leaderboard" },
  { label: "Join Us", to: "/register" },
];

const socials = [
  {
    icon: FiYoutube,
    href: "https://www.youtube.com/@SkyTechMakers",
    label: "YouTube",
    color: "hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/25",
  },
  {
    icon: FiInstagram,
    href: "https://www.instagram.com/skytechmakers/?hl=en",
    label: "Instagram",
    color: "hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/25",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/9198------10",
    label: "Whatsapp",
    color: "hover:text-green-400 hover:bg-green-500/10 hover:border-green-500/25",
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080b14] border-t border-white/6 overflow-hidden">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group mb-4 w-fit">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
                <FiZap className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">
                Sky Tech <span className="gradient-text">Makers</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Your ultimate hub for tech knowledge, coding challenges, interview prep, and developer resources.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border border-white/8 bg-white/4 text-slate-400 transition-all duration-200 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors duration-200"
                  >
                    <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <FiMapPin className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <FiMail className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:skytechmakers@gmail.com" className="hover:text-indigo-400 transition-colors">
                  skytechmakers@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <FiPhone className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>+91 98 ------ 10</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-4">Join thousands learning tech with us every day.</p>
            <Link
              to="/register"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300"
            >
              <FiZap className="w-3.5 h-3.5" />
              Start Learning Free
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Sky Tech Makers. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            Made with <FiHeart className="w-3 h-3 text-red-500 fill-current" /> in Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
