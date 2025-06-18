import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiYoutube,
  FiInstagram,
} from "react-icons/fi";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-dark text-white py-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Sky Tech Makers</h3>
            <p className="text-gray-300">
              Your hub for tech knowledge and resources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-gray-300">
              <li>
                <Link to="/blogs" className="hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/questions" className="hover:text-white">
                  Interview Q&A
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-white">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <FiMapPin /> Tamil Nadu, India
              </li>
              <li className="flex items-center gap-2">
                <FiMail /> skytechmakers@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FiPhone /> +91 98765 43210
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4 text-gray-300 text-xl">
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FiGithub />
              </a>
              <a
                href="https://l.instagram.com/?u=https%3A%2F%2Fwww.youtube.com%2F%40SkyTechMakers%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAaeyFZQEvJRlYkSSThFZTqBdav9xbLVl_jjVjrbSbYNvQOMnw-A9ZF6mCBshqA_aem_mR9v5bL0usEq6mZZRiVHOg&e=AT0QIdnOFeKcji4oIPmjND2kuABbLcfiTZN6N0-Q7ZZ7ZyAMTxPSDWM-wsDiDPxsYFHby1Mtay8wTXHmvBg0YdoSnvKO2ZSAsGql1Q"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FiYoutube />
              </a>
              <a
                href="https://www.youtube.com/redirect?event=channel_header&redir_token=QUFFLUhqbnlMcDVHYUxBMmhvTmF2ZlIzakZwOWFoUFZTd3xBQ3Jtc0tsQ2sxcFEzcEx3RFZkSVNhMDV4Tk9iV2FCMFRHejlHMjdocXo1TGVTV0c4MUtiMlFKREo0VFV6X0JWR2RzLUZ1cS1fRXpIZHREWjNnUUFWc3NuQmNDQUJMN1J2S1YyUnRUYmxNc1BJalVCckxjUE5ZMA&q=https%3A%2F%2Fwww.instagram.com%2Fskytechmakers%2F%3Fhl%3Den"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FiInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Sky Tech Makers. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
