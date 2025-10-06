import { NavLink } from "react-router-dom";

type NavLink = {
  label: string;
  path: string;
};

const navLinks = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Market",
    path: "/market",
  },
  {
    label: "Profile",
    path: "/profile",
  },
];

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 shadow-lg">
      <h1 className="text-2xl font-bold">Crypto Tracker</h1>

      <nav className="space-x-6">
        {navLinks.map((link: NavLink) => (
          <NavLink
            to={link.path}
            key={link.label}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 bg-gray-600/10 border border-blue-500 px-4 py-1.5 rounded-full"
                : "text-gray-600"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div>theme</div>
    </div>
  );
};
