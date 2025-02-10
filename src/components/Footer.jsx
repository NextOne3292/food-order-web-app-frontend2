import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6">
        {/* Top Section: Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Foodie</h2>
            <p className="text-sm text-gray-400">Delicious food at your doorstep</p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="/" className="hover:text-gray-400">Home</a>
            <a href="/restaurants" className="hover:text-gray-400">Restaurants</a>
            <a href="/menu" className="hover:text-gray-400">Menu</a>
            <a href="/contact" className="hover:text-gray-400">Contact</a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Bottom Section: Social Media & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white text-lg">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-lg">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-lg">
              <FaInstagram />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Foodie - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
