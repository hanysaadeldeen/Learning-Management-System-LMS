import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap  text-center justify-between">
          {/* About Us */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
            <h5 className="text-2xl font-bold mb-6">About Us</h5>
            <p className="text-gray-400 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Praesentium natus quod eveniet aut perferendis distinctio iusto
              repudiandae, provident velit earum?
            </p>
            <div className="flex space-x-4 items-center justify-center">
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-pink-400 hover:text-pink-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-400">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-500">
                <FaDribbble className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
            <h5 className="text-2xl font-bold mb-6">Services</h5>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Graphic Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  App Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Web Development
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
            <h5 className="text-2xl font-bold mb-6">About</h5>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  History
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
            <h5 className="text-2xl font-bold mb-6">Support</h5>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Live Chat
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center bg-white text-lg py-6 text-gray-900">
        &copy; 2024 Hany Mohamed. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
