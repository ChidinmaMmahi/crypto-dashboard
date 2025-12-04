import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { IoSunnyOutline } from "react-icons/io5";
import { ThemeToggle } from "./themeToggle";
type NavItem = {
  label: string;
  path: string;
};

const navLinks: NavItem[] = [
  { label: "Dashboard", path: "/" },
  { label: "Market", path: "/market" },
  { label: "Profile", path: "/profile" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-menu") && !target.closest(".menu-btn")) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="flex justify-between items-center px-4 sm:px-8 shadow-lg fixed top-0 left-0 right-0 h-20 z-50 bg-gray-100 dark:bg-gray-900">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        CoinLytics
      </h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 items-center">
        {navLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.label}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 bg-blue-100 border border-blue-600 px-4 py-1.5 rounded-full"
                : "text-gray-700 hover:text-blue-600 transition-colors"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Theme placeholder */}
      {/* <div className="hidden md:block bg-gray-200 hover:bg-gray-300 cursor-pointer p-2 rounded-full text-yellow-700">
        <IoSunnyOutline size={24} />
      </div> */}

      <ThemeToggle />
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="menu-btn md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="mobile-menu fixed top-20 right-0 w-56 bg-white border-l border-gray-200 shadow-xl rounded-bl-xl animate-slideDown z-50">
          <nav className="flex flex-col py-3 text-sm">
            {navLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.label}
                onClick={() => setMenuOpen(false)} // close when clicked
                className={({ isActive }) =>
                  `px-5 py-2.5  transition-colors ${
                    isActive
                      ? "text-blue-600 font-medium bg-gray-100"
                      : "text-gray-500 hover:text-blue-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            <div className="px-5 text-gray-700 flex justify-end">
              <IoSunnyOutline size={20} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
